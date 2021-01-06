import { Application, DataProviderResult, getValueViaPath, ValidAnswers } from '@island.is/application/core'
import { theme } from '@island.is/island-ui/theme'
import { NationalRegistryFamilyMember } from '@island.is/api/schema'

import { TimelinePeriod } from './components/Timeline'
import { Period } from '../types'
import { ParentalLeave, PregnancyStatus } from '../dataProviders/APIDataTypes'
import { YES } from '../constants'

export function getExpectedDateOfBirth(
  application: Application,
): string | undefined {
  const pregnancyStatusResult = application.externalData
    .pregnancyStatus as DataProviderResult

  if (pregnancyStatusResult.status === 'success') {
    const pregnancyStatus = pregnancyStatusResult.data as PregnancyStatus
    if (pregnancyStatus.pregnancyDueDate)
      return pregnancyStatus.pregnancyDueDate
  }
  // applicant is not a mother giving birth
  const parentalLeavesResult = application.externalData
    .parentalLeaves as DataProviderResult
  if (parentalLeavesResult.status === 'success') {
    const parentalLeaves = parentalLeavesResult.data as ParentalLeave[]
    if (parentalLeaves.length) {
      if (parentalLeaves.length === 1) {
        return parentalLeaves[0].expectedDateOfBirth
      }
      // here we have multiple parental leaves... must store the selected application id or something
    }
  }

  return undefined
}

export function getNameAndIdOfSpouse(
  familyMembers?: NationalRegistryFamilyMember[],
): [string?, string?] {
  const spouse = familyMembers?.find(
    (member) => member.familyRelation === 'spouse',
  )
  if (!spouse) {
    return [undefined, undefined]
  }
  return [spouse.fullName, spouse.nationalId]
}

export function getEstimatedMonthlyPay(application: Application): number {
  // TODO read this value from external data when APIs have arrived
  return 384000
}

export function formatPeriods(
  periods?: Period[],
  otherParentPeriods?: Period[],
): TimelinePeriod[] {
  const timelinePeriods: TimelinePeriod[] = []
  periods?.forEach((period, index) => {
    if (period.startDate && period.endDate) {
      timelinePeriods.push({
        startDate: period.startDate,
        endDate: period.endDate,
        canDelete: true,
        title: `Period ${index + 1} - ${period.ratio ?? 100}%`,
      })
    }
  })
  otherParentPeriods?.forEach((period) => {
    timelinePeriods.push({
      startDate: period.startDate,
      endDate: period.endDate,
      canDelete: false,
      color: theme.color.red200,
      title: `Other parent ${period.ratio ?? 100}%`,
    })
  })
  return timelinePeriods
}

/*
 *  Takes in a number (ex: 119000) and
 *  returns a formated ISK value "119.000 kr."
 */
export const formatIsk = (value: number): string =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' kr.'

// TODO: convert to days and merge with Noam's PR
export const allowance = {
  max: 7,
  min: 5,
  default: 6,
}

export const getAvailableRights = (application: Application) => {
  const useFullPersonalAllowance = getValueViaPath(application.answers, 'usePersonalAllowance') as ValidAnswers === YES
  const useFullPersonalAllowanceFromSpouse = getValueViaPath(application.answers, 'usePersonalAllowanceFromSpouse') as ValidAnswers === YES

  if (useFullPersonalAllowance) {
    return 6;
  } else if (!useFullPersonalAllowance) {

  }

  return 6;
}

export const getUsedRights = () => {

}
