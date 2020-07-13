import { FormNode, FormLeaf } from '../types/FormTree'
import { Form, FormItemTypes, Section, SubSection } from '../types/Form'
import { Question } from '../types/Fields'

const isValidScreen = (node: FormNode): boolean => {
  if (!node.children) {
    // only Field has no children attribute
    return true
  }
  switch (node.type) {
    case FormItemTypes.MULTI_FIELD: {
      return true
    }

    case FormItemTypes.REPEATER: {
      return true
    }
    default: {
      return false
    }
  }
}

export const getFormNodeLeaves = (
  node: FormNode,
  onlyQuestions = false,
): FormLeaf[] => {
  const { children } = node
  if (isValidScreen(node)) {
    if (onlyQuestions && 'isQuestion' in node && node.isQuestion) {
      return [node as FormLeaf]
    } else if (!onlyQuestions) {
      return [node as FormLeaf]
    }
  }

  let leafs: FormLeaf[] = []
  let newLeafs: FormLeaf[] = []
  if (children) {
    for (let i = 0; i < children.length; i++) {
      newLeafs = getFormNodeLeaves(children[i])
      if (newLeafs.length) {
        leafs = [...leafs, ...newLeafs]
      }
    }
  }
  return leafs
}

export const getFormLeaves = (form: Form): FormLeaf[] => {
  return getFormNodeLeaves(form)
}

export const getQuestionsForFormNode = (
  node: FormNode,
): { [key: string]: Question } => {
  const questions = getFormNodeLeaves(node, true) as Question[]
  const questionMap = {}
  questions.forEach((question) => {
    questionMap[question.id] = question
  })
  return questionMap
}

export function getSectionsInForm(form: Form): Section[] {
  const sections: Section[] = []
  form.children.forEach((child) => {
    if (child.type === FormItemTypes.SECTION) {
      sections.push(child as Section)
    }
  })
  return sections
}
export function getSubSectionsInSection(section: Section): SubSection[] {
  const subSections: SubSection[] = []
  section.children.forEach((child) => {
    if (child.type === FormItemTypes.SUB_SECTION) {
      subSections.push(child as SubSection)
    }
  })
  return subSections
}

export function findSectionIndexForScreen(
  form: Form,
  screen: FormLeaf,
): number {
  const sections = getSectionsInForm(form)
  if (!sections.length) {
    return -1
  }
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i]
    const screensInSection = getFormNodeLeaves(section)
    if (screensInSection.find(({ id }) => id === screen.id) !== undefined) {
      return i
    }
  }
  return -1
}

export function findSubSectionIndexForScreen(
  section: Section,
  screen: FormLeaf,
): number {
  const subSections = getSubSectionsInSection(section)
  if (!subSections.length) {
    return -1
  }
  for (let i = 0; i < subSections.length; i++) {
    const subSection = subSections[i]
    const screensInSection = getFormNodeLeaves(subSection)
    if (screensInSection.find(({ id }) => id === screen.id) !== undefined) {
      return i
    }
  }
  return -1
}
