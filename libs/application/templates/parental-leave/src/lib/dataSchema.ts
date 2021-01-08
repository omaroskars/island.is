import * as z from 'zod'
import isValid from 'date-fns/isValid'
import parseISO from 'date-fns/parseISO'
import * as kennitala from 'kennitala'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

import { NO, YES } from '../constants'

const PersonalAllowance = z
  .object({
    usage: z
      .string()
      .refine((x) => parseFloat(x) >= 0 && parseFloat(x) <= 100)
      .optional(),
    useAsMuchAsPossible: z.enum([YES, NO]).optional(),
  })
  .optional()

const Period = z.object({
  startDate: z.string().refine((d) => !isValid(parseISO(d)), 'error message?'),
  endDate: z.string().refine((d) => isValid(parseISO(d))),
  ratio: z.string().refine((val) => !isNaN(Number(val)) && parseInt(val) > 0 && parseInt(val) <= 100)
})
// .refine((rest) => {
//   console.log('-rest', rest);
//   if (rest.startDate) {
//     return !isValid(parseISO(rest.startDate))
//   }

//   return true
// }, 'yo error')

export const dataSchema = z.object({
  approveExternalData: z.boolean().refine((v) => v),
  applicant: z.object({
    email: z.string().email(),
    phoneNumber: z.string().refine((p) => {
      const phoneNumber = parsePhoneNumberFromString(p, 'IS')
      return phoneNumber && phoneNumber.isValid()
    }, 'Símanúmerið þarf að vera gilt.'),
  }),
  personalAllowance: PersonalAllowance,
  personalAllowanceFromSpouse: PersonalAllowance,
  payments: z.object({
    bank: z.string().nonempty(),
    pensionFund: z.string(),
    privatePensionFund: z.enum(['frjalsi', '']).optional(),
    privatePensionFundPercentage: z.enum(['2', '4', '']).optional(),
  }),
  shareInformationWithOtherParent: z.enum([YES, NO]),
  usePrivatePensionFund: z.enum([YES, NO]),
  periods: z.array(Period).nonempty(),
  employer: z.object({
    isSelfEmployed: z.enum([YES, NO]),
    email: z.string().email().nonempty(),
  }),
  requestRights: z.object({
    isRequestingRights: z.enum([YES, NO]),
    requestDays: z.number().optional(),
  }),
  giveRights: z.object({
    isGivingRights: z.enum([YES, NO]),
    giveDays: z.number().optional(),
  }),
  singlePeriod: z.enum([YES, NO]),
  firstPeriodStart: z.enum(['dateOfBirth', 'specificDate']),
  confirmLeaveDuration: z.enum(['duration', 'specificDate']),
  otherParent: z.enum(['spouse', NO, 'manual']).optional(),
  otherParentName: z.string().optional(),
  otherParentId: z
    .string()
    .optional()
    .refine(
      (n) => n && kennitala.isValid(n) && kennitala.isPerson(n),
      'Kennitala þarf að vera gild',
    ),
  otherParentRightOfAccess: z.enum([YES, NO]).optional(),
  usePersonalAllowance: z.enum([YES, NO]),
  usePersonalAllowanceFromSpouse: z.enum([YES, NO]),
})
export type SchemaFormValues = z.infer<typeof dataSchema>
