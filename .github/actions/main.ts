import { Octokit } from '@octokit/action'
import { findLastGoodBuild, WorkflowQueries } from './detection'

const octokit = new Octokit()
// const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/')
const workflow_file_name = 'push.yml'
class GitHubWorkflowQueries implements WorkflowQueries {
  async getData(branch: string) {
    return (
      await octokit.request(
        'GET /repos/:owner/:repo/actions/workflows/:workflow_file_name/runs',
        {
          owner,
          repo,
          branch,
          workflow_file_name,
          status: 'success' as 'completed' | 'status' | 'conclusion', // fix for missing value in the enum it seems
        },
      )
    ).data
  }
}

var readline = require('readline')
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
})

const shas: string[] = []

rl.on('line', function (line) {
  shas.push(line)
})

rl.on('close', async function () {
  const result = await findLastGoodBuild(
    shas,
    process.env.BRANCH || process.env.GIT_BRANCH,
    process.env.BASE_BRANCH || 'main',
    new GitHubWorkflowQueries(),
  )
  console.log(JSON.stringify(result))
})
