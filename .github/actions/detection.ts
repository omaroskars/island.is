import { ActionsListWorkflowRunsForRepoResponseData } from '@octokit/types'

const getSuccessWorkflowsForBranch = (
  response: ActionsListWorkflowRunsForRepoResponseData,
) => {
  return response.workflow_runs
    .map((wr) => ({
      run_number: wr.run_number,
      sha: wr.head_sha,
      branch: wr.head_branch,
    }))
    .sort((a, b) => b.run_number - a.run_number)
}

const pickFirstMatchingSuccess = (
  shas: string[],
  runsBranch: { run_number: number; sha: string }[],
) => {
  for (const sha of shas) {
    const lastGoodRun = runsBranch.filter((runs) => runs.sha === sha)
    if (lastGoodRun.length > 0) {
      return lastGoodRun[0]
    }
  }
}

export interface WorkflowQueries {
  getData(branch: string): Promise<ActionsListWorkflowRunsForRepoResponseData>
}

export const findLastGoodBuild = async (
  shas: string[],
  branch,
  base,
  workflowQueries: WorkflowQueries,
) => {
  const getGoodBuildOnBranch = async (branch) => {
    const successWorkflows = await workflowQueries.getData(branch)
    let successOnBranch = getSuccessWorkflowsForBranch(successWorkflows)

    return pickFirstMatchingSuccess(shas, successOnBranch)
  }
  // First we try to find the last successful workflow build on our branch
  // Then try to find the last successful workflow build on our target branch
  // Failing that, and in case base != main, we try main
  const branchTargets = [branch, base]
  if (base != 'main') {
    branchTargets.push('main')
  }
  // Lastly, consider no branch, as the best candidate might be on a branch that
  // is between branch and base.
  // If this keeps being a problem, lets consider dropping the branch filter and
  // simply consider all builds and walk down the list of shas.
  branchTargets.push('')
  for (const branchTarget of branchTargets) {
    const goodBuild = await getGoodBuildOnBranch(branchTarget)
    if (goodBuild) {
      return goodBuild
    }
  }
  return {}
}
