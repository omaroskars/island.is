import React, { useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Modal from '../../../../shared-components/Modal/Modal'
import {
  Text,
  GridRow,
  GridColumn,
  Input,
  Box,
  Select,
  DatePicker,
  GridContainer,
  RadioButton,
} from '@island.is/island-ui/core'
import { validate } from '../../../../utils/validate'
import { isNextDisabled } from '../../../../utils/stepHelper'
import isValid from 'date-fns/isValid'
import parseISO from 'date-fns/parseISO'
import formatISO from 'date-fns/formatISO'
import isNull from 'lodash/isNull'
import { FormFooter } from '../../../../shared-components/FormFooter'
import { useParams } from 'react-router-dom'
import * as Constants from '../../../../utils/constants'
import { TIME_FORMAT } from '@island.is/judicial-system/formatters'
import { formatDate } from '@island.is/judicial-system/formatters'
import {
  parseString,
  parseTime,
} from '@island.is/judicial-system-web/src/utils/formatters'
import { PageLayout } from '@island.is/judicial-system-web/src/shared-components/PageLayout/PageLayout'
import {
  Case,
  UpdateCase,
  CaseState,
  NotificationType,
  CaseGender,
} from '@island.is/judicial-system/types'
import { gql, useMutation, useQuery } from '@apollo/client'
import {
  CaseQuery,
  SendNotificationMutation,
  UpdateCaseMutation,
} from '@island.is/judicial-system-web/src/graphql'
import {
  ProsecutorSubsections,
  ReactSelectOption,
  Sections,
} from '@island.is/judicial-system-web/src/types'
import { ValueType } from 'react-select/src/types'
import * as styles from './StepOne.treat'

export const CreateCaseMutation = gql`
  mutation CreateCaseMutation($input: CreateCaseInput!) {
    createCase(input: $input) {
      id
      created
      modified
      state
      policeCaseNumber
      accusedNationalId
      accusedName
      accusedAddress
      accusedGender
      requestedDefenderName
      requestedDefenderEmail
      court
      arrestDate
      requestedCourtDate
      requestedCustodyEndDate
      lawsBroken
      custodyProvisions
      requestedCustodyRestrictions
      caseFacts
      witnessAccounts
      investigationProgress
      legalArguments
      comments
      prosecutor {
        name
        title
      }
      courtCaseNumber
      courtDate
      courtRoom
      defenderName
      defenderEmail
      courtStartTime
      courtEndTime
      courtAttendees
      policeDemands
      accusedPlea
      litigationPresentations
      ruling
      rejecting
      custodyEndDate
      custodyRestrictions
      accusedAppealDecision
      accusedAppealAnnouncement
      prosecutorAppealDecision
      prosecutorAppealAnnouncement
      judge {
        name
        title
      }
    }
  }
`

export const StepOne: React.FC = () => {
  const history = useHistory()
  const [workingCase, setWorkingCase] = useState<Case>()
  const [isStepIllegal, setIsStepIllegal] = useState<boolean>(true)

  const [
    policeCaseNumberErrorMessage,
    setPoliceCaseNumberErrorMessage,
  ] = useState<string>('')
  const [nationalIdErrorMessage, setNationalIdErrorMessage] = useState<string>(
    '',
  )
  const [accusedNameErrorMessage, setAccusedNameErrorMessage] = useState<
    string
  >('')
  const [accusedAddressErrorMessage, setAccusedAddressErrorMessage] = useState<
    string
  >('')
  const [
    requestedDefenderEmailErrorMessage,
    setRequestedDefenderEmailErrorMessage,
  ] = useState<string>('')
  const [arrestDateErrorMessage, setArrestDateErrorMessage] = useState<string>(
    '',
  )
  const [arrestTimeErrorMessage, setArrestTimeErrorMessage] = useState<string>(
    '',
  )
  const [
    requestedCourtTimeErrorMessage,
    setRequestedCourtTimeErrorMessage,
  ] = useState<string>('')
  const [modalVisible, setModalVisible] = useState(false)

  const { id } = useParams<{ id: string }>()

  const policeCaseNumberRef = useRef<HTMLInputElement>(null)
  const accusedNationalIdRef = useRef<HTMLInputElement>(null)
  const defenderEmailRef = useRef<HTMLInputElement>(null)
  const arrestTimeRef = useRef<HTMLInputElement>(null)
  const requestedCourtTimeRef = useRef<HTMLInputElement>(null)
  const { data, loading } = useQuery(CaseQuery, {
    variables: { input: { id: id } },
    fetchPolicy: 'no-cache',
  })

  const resCase = data?.case

  const courts = [
    {
      label: 'Héraðsdómur Reykjavíkur',
      value: 0,
    },
    {
      label: 'Héraðsdómur Vesturlands',
      value: 1,
    },
    {
      label: 'Héraðsdómur Vestfjarða',
      value: 2,
    },
    {
      label: 'Héraðsdómur Norðurlands vestra',
      value: 3,
    },
    {
      label: 'Héraðsdómur Norðurlands eystra',
      value: 4,
    },
    {
      label: 'Héraðsdómur Austurlands',
      value: 5,
    },
    {
      label: 'Héraðsdómur Reykjaness',
      value: 6,
    },
  ]

  const defaultCourt = courts.filter(
    (court) => court.label === workingCase?.court,
  )

  const [createCaseMutation] = useMutation(CreateCaseMutation)

  const createCaseIfPossible = async () => {
    const isPossibleToSave =
      workingCase?.id === '' &&
      policeCaseNumberRef.current?.value !== '' &&
      accusedNationalIdRef.current?.value !== ''

    if (isPossibleToSave) {
      const { data } = await createCaseMutation({
        variables: {
          input: {
            policeCaseNumber: policeCaseNumberRef.current?.value,
            accusedNationalId: accusedNationalIdRef.current?.value.replace(
              '-',
              '',
            ),
            court: workingCase?.court,
            accusedName: workingCase?.accusedName,
            accusedAddress: workingCase?.accusedAddress,
            requestedDefenderName: workingCase?.requestedDefenderName,
            requestedDefenderEmail: workingCase?.requestedDefenderEmail,
            accusedGender: workingCase?.accusedGender,
            arrestDate: workingCase?.arrestDate,
            requestedCourtDate: workingCase?.requestedCourtDate,
          },
        },
      })

      const resCase: Case = data?.createCase

      if (resCase) {
        history.replace(`${Constants.SINGLE_REQUEST_BASE_ROUTE}/${resCase.id}`)

        setWorkingCase({
          ...workingCase,
          id: resCase.id,
          accusedNationalId:
            accusedNationalIdRef.current?.value.replace('-', '') || '',
          policeCaseNumber: policeCaseNumberRef.current?.value || '',
          created: resCase.created,
          modified: resCase.modified,
          state: resCase.state,
        })
      }
    }
  }

  const [updateCaseMutation] = useMutation(UpdateCaseMutation)

  const updateCase = async (id: string, updateCase: UpdateCase) => {
    // Only update if id has been set
    if (!id) {
      return null
    }
    const { data } = await updateCaseMutation({
      variables: { input: { id, ...updateCase } },
    })

    const resCase = data?.updateCase

    if (resCase) {
      // Do smoething with the result. In particular, we want th modified timestamp passed between
      // the client and the backend so that we can handle multiple simultanious updates.
    }

    return resCase
  }

  const [
    sendNotificationMutation,
    { loading: isSendingNotification },
  ] = useMutation(SendNotificationMutation)

  const sendNotification = async (id: string) => {
    const { data } = await sendNotificationMutation({
      variables: {
        input: {
          caseId: id,
          type: NotificationType.HEADS_UP,
        },
      },
    })

    return data?.sendNotification?.notificationSent
  }

  useEffect(() => {
    document.title = 'Grunnupplýsingar - Réttarvörslugátt'
  }, [])

  // Run this if id is in url, i.e. if user is opening an existing request.
  useEffect(() => {
    if (id && !workingCase && resCase) {
      setWorkingCase(resCase)
    } else if (!id && !workingCase) {
      setWorkingCase({
        id: '',
        created: '',
        modified: '',
        state: CaseState.DRAFT,
        policeCaseNumber: '',
        accusedNationalId: '',
        accusedName: '',
        accusedAddress: '',
        requestedDefenderName: '',
        requestedDefenderEmail: '',
        accusedGender: undefined,
        court: 'Héraðsdómur Reykjavíkur',
        arrestDate: undefined,
        requestedCourtDate: undefined,
      })
    }
  }, [id, workingCase, setWorkingCase, resCase])

  /**
   * Run this to validate form after each change
   *
   * This can't be done in the render function because the time refs will always be null
   * until the user clicks the time inputs and then the continue button becomes enabled.
   *  */
  useEffect(() => {
    if (workingCase) {
      setIsStepIllegal(
        isNextDisabled([
          {
            value: workingCase.policeCaseNumber,
            validations: ['empty', 'police-casenumber-format'],
          },
          {
            value: workingCase.accusedNationalId || '',
            validations: ['empty', 'national-id'],
          },
          { value: workingCase.accusedName || '', validations: ['empty'] },
          { value: workingCase.accusedAddress || '', validations: ['empty'] },
          {
            value: workingCase.requestedDefenderEmail || '',
            validations: ['email-format'],
          },
          { value: workingCase.arrestDate || '', validations: ['empty'] },
          {
            value: arrestTimeRef.current?.value || '',
            validations: ['empty', 'time-format'],
          },
          {
            value: workingCase.requestedCourtDate || '',
            validations: ['empty'],
          },
          {
            value: requestedCourtTimeRef.current?.value || '',
            validations: ['empty', 'time-format'],
          },
        ]),
      )
    } else {
      setIsStepIllegal(true)
    }
  }, [
    workingCase,
    setIsStepIllegal,
    arrestTimeRef.current?.value,
    requestedCourtTimeRef.current?.value,
  ])

  return (
    <PageLayout
      activeSection={Sections.PROSECUTOR}
      activeSubSection={ProsecutorSubsections.CREATE_DETENTION_REQUEST_STEP_ONE}
      isLoading={loading}
    >
      {workingCase ? (
        <>
          <Box marginBottom={10}>
            <Text as="h1" variant="h1">
              Krafa um gæsluvarðhald
            </Text>
          </Box>
          <Box component="section" marginBottom={7}>
            <Box marginBottom={2}>
              <Text as="h3" variant="h3">
                LÖKE málsnúmer
              </Text>
            </Box>
            <Input
              data-testid="policeCaseNumber"
              name="policeCaseNumber"
              label="Slá inn LÖKE málsnúmer"
              placeholder="007-2020-X"
              defaultValue={workingCase?.policeCaseNumber}
              ref={policeCaseNumberRef}
              errorMessage={policeCaseNumberErrorMessage}
              hasError={policeCaseNumberErrorMessage !== ''}
              onBlur={(evt) => {
                const validateField = validate(evt.target.value, 'empty')
                const validateFieldFormat = validate(
                  evt.target.value,
                  'police-casenumber-format',
                )

                setWorkingCase({
                  ...workingCase,
                  policeCaseNumber: evt.target.value,
                })

                if (validateField.isValid && validateFieldFormat.isValid) {
                  if (workingCase.policeCaseNumber !== evt.target.value) {
                    if (workingCase.id !== '') {
                      updateCase(
                        workingCase.id,
                        parseString('policeCaseNumber', evt.target.value),
                      )
                    } else {
                      createCaseIfPossible()
                    }
                  }
                } else {
                  setPoliceCaseNumberErrorMessage(
                    validateField.errorMessage ||
                      validateFieldFormat.errorMessage,
                  )
                }
              }}
              onFocus={() => setPoliceCaseNumberErrorMessage('')}
              required
            />
          </Box>
          <Box component="section" marginBottom={3}>
            <Box marginBottom={2}>
              <Text as="h3" variant="h3">
                Sakborningur
              </Text>
            </Box>
            <Box marginBottom={3}>
              <Input
                data-testid="nationalId"
                name="nationalId"
                label="Kennitala"
                placeholder="Kennitala"
                defaultValue={workingCase.accusedNationalId}
                ref={accusedNationalIdRef}
                errorMessage={nationalIdErrorMessage}
                hasError={nationalIdErrorMessage !== ''}
                onBlur={(evt) => {
                  const validateField = validate(evt.target.value, 'empty')
                  const validateFieldFormat = validate(
                    evt.target.value,
                    'national-id',
                  )

                  setWorkingCase({
                    ...workingCase,
                    accusedNationalId: evt.target.value,
                  })

                  if (validateField.isValid && validateFieldFormat.isValid) {
                    if (workingCase.accusedNationalId !== evt.target.value) {
                      if (workingCase.id !== '') {
                        updateCase(
                          workingCase.id,
                          parseString(
                            'accusedNationalId',
                            evt.target.value.replace('-', ''),
                          ),
                        )
                      } else {
                        createCaseIfPossible()
                      }
                    }
                  } else {
                    setNationalIdErrorMessage(
                      validateField.errorMessage ||
                        validateFieldFormat.errorMessage,
                    )
                  }
                }}
                onFocus={() => setNationalIdErrorMessage('')}
                required
              />
            </Box>
            <Box marginBottom={3}>
              <Input
                data-testid="accusedName"
                name="accusedName"
                label="Fullt nafn"
                placeholder="Fullt nafn"
                defaultValue={workingCase.accusedName}
                errorMessage={accusedNameErrorMessage}
                hasError={accusedNameErrorMessage !== ''}
                onBlur={(evt) => {
                  const validateField = validate(evt.target.value, 'empty')

                  setWorkingCase({
                    ...workingCase,
                    accusedName: evt.target.value,
                  })

                  if (validateField.isValid) {
                    if (
                      workingCase.accusedName !== evt.target.value &&
                      workingCase.id !== ''
                    ) {
                      updateCase(
                        workingCase.id,
                        parseString('accusedName', evt.target.value),
                      )
                    }
                  } else {
                    setAccusedNameErrorMessage(validateField.errorMessage)
                  }
                }}
                onFocus={() => setAccusedNameErrorMessage('')}
                required
              />
            </Box>
            <Box marginBottom={3}>
              <Input
                data-testid="accusedAddress"
                name="accusedAddress"
                label="Lögheimili/dvalarstaður"
                placeholder="Lögheimili eða dvalarstaður"
                defaultValue={workingCase.accusedAddress}
                errorMessage={accusedAddressErrorMessage}
                hasError={accusedAddressErrorMessage !== ''}
                onBlur={(evt) => {
                  const validateField = validate(evt.target.value, 'empty')

                  setWorkingCase({
                    ...workingCase,
                    accusedAddress: evt.target.value,
                  })

                  if (validateField.isValid) {
                    if (
                      workingCase.accusedAddress !== evt.target.value &&
                      workingCase.id !== ''
                    ) {
                      updateCase(
                        workingCase.id,
                        parseString('accusedAddress', evt.target.value),
                      )
                    }
                  } else {
                    setAccusedAddressErrorMessage(validateField.errorMessage)
                  }
                }}
                onFocus={() => setAccusedAddressErrorMessage('')}
                required
              />
            </Box>
          </Box>
          <Box component="section" marginBottom={7}>
            <Box marginBottom={2}>
              <Text as="h3" variant="h3">
                Kyn{' '}
                <Text as="span" color="red600" fontWeight="semiBold">
                  *
                </Text>
              </Text>
            </Box>
            <GridContainer>
              <GridRow>
                <GridColumn className={styles.genderColumn}>
                  <RadioButton
                    name="accused-gender"
                    id="genderMale"
                    label="Karl"
                    checked={workingCase.accusedGender === CaseGender.MALE}
                    onChange={() => {
                      setWorkingCase({
                        ...workingCase,
                        accusedGender: CaseGender.MALE,
                      })

                      if (workingCase.id) {
                        updateCase(
                          workingCase.id,
                          parseString('accusedGender', CaseGender.MALE),
                        )
                      }
                    }}
                    large
                  />
                </GridColumn>
                <GridColumn className={styles.genderColumn}>
                  <RadioButton
                    name="accused-gender"
                    id="genderFemale"
                    label="Kona"
                    checked={workingCase.accusedGender === CaseGender.FEMALE}
                    onChange={() => {
                      setWorkingCase({
                        ...workingCase,
                        accusedGender: CaseGender.FEMALE,
                      })

                      if (workingCase.id) {
                        updateCase(
                          workingCase.id,
                          parseString('accusedGender', CaseGender.FEMALE),
                        )
                      }
                    }}
                    large
                  />
                </GridColumn>
                <GridColumn className={styles.genderColumn}>
                  <RadioButton
                    name="accused-gender"
                    id="genderOther"
                    label="Annað"
                    checked={workingCase.accusedGender === CaseGender.OTHER}
                    onChange={() => {
                      setWorkingCase({
                        ...workingCase,
                        accusedGender: CaseGender.OTHER,
                      })

                      if (workingCase.id) {
                        updateCase(
                          workingCase.id,
                          parseString('accusedGender', CaseGender.OTHER),
                        )
                      }
                    }}
                    large
                  />
                </GridColumn>
              </GridRow>
            </GridContainer>
          </Box>
          <Box component="section" marginBottom={7}>
            <Box marginBottom={2}>
              <Text as="h3" variant="h3">
                Verjandi
              </Text>
            </Box>
            <Box marginBottom={3}>
              <Input
                name="requestedDefenderName"
                label="Nafn verjanda"
                placeholder="Fullt nafn"
                defaultValue={workingCase.requestedDefenderName}
                onBlur={(evt) => {
                  if (workingCase.requestedDefenderName !== evt.target.value) {
                    setWorkingCase({
                      ...workingCase,
                      requestedDefenderName: evt.target.value,
                    })

                    updateCase(
                      workingCase.id,
                      parseString('requestedDefenderName', evt.target.value),
                    )
                  }
                }}
              />
            </Box>
            <Input
              name="requestedDefenderEmail"
              label="Netfang verjanda"
              placeholder="Netfang"
              ref={defenderEmailRef}
              defaultValue={workingCase.requestedDefenderEmail}
              errorMessage={requestedDefenderEmailErrorMessage}
              hasError={requestedDefenderEmailErrorMessage !== ''}
              onBlur={(evt) => {
                const validateField = validate(evt.target.value, 'email-format')

                setWorkingCase({
                  ...workingCase,
                  requestedDefenderEmail: evt.target.value,
                })

                if (validateField.isValid) {
                  if (
                    workingCase.requestedDefenderEmail !== evt.target.value &&
                    workingCase.id !== ''
                  ) {
                    updateCase(
                      workingCase.id,
                      parseString('requestedDefenderEmail', evt.target.value),
                    )
                  }
                } else {
                  setRequestedDefenderEmailErrorMessage(
                    validateField.errorMessage,
                  )
                }
              }}
              onFocus={() => setRequestedDefenderEmailErrorMessage('')}
            />
          </Box>
          <Box component="section" marginBottom={7}>
            <Box marginBottom={2}>
              <Text as="h3" variant="h3">
                Dómstóll
              </Text>
            </Box>
            <Select
              name="court"
              label="Veldu dómstól"
              defaultValue={{
                label:
                  defaultCourt.length > 0
                    ? defaultCourt[0].label
                    : courts[0].label,
                value:
                  defaultCourt.length > 0
                    ? defaultCourt[0].value
                    : courts[0].value,
              }}
              options={courts}
              onChange={(selectedOption: ValueType<ReactSelectOption>) => {
                setWorkingCase({
                  ...workingCase,
                  court: (selectedOption as ReactSelectOption).label,
                })
                updateCase(
                  workingCase.id,
                  parseString(
                    'court',
                    (selectedOption as ReactSelectOption).label,
                  ),
                )
              }}
            />
          </Box>
          <Box component="section" marginBottom={7}>
            <Box marginBottom={2}>
              <Text as="h3" variant="h3">
                Tími handtöku
              </Text>
            </Box>
            <GridRow>
              <GridColumn span="5/8">
                <DatePicker
                  label="Veldu dagsetningu"
                  placeholderText="Veldu dagsetningu"
                  locale="is"
                  errorMessage={arrestDateErrorMessage}
                  hasError={arrestDateErrorMessage !== ''}
                  selected={
                    workingCase.arrestDate
                      ? new Date(workingCase.arrestDate)
                      : null
                  }
                  handleChange={(date) => {
                    const formattedDate = formatISO(date, {
                      representation: workingCase.arrestDate?.includes('T')
                        ? 'complete'
                        : 'date',
                    })

                    setWorkingCase({
                      ...workingCase,
                      arrestDate: formattedDate,
                    })

                    updateCase(
                      workingCase.id,
                      parseString('arrestDate', formattedDate),
                    )
                  }}
                  handleCloseCalendar={(date: Date | null) => {
                    if (isNull(date) || !isValid(date)) {
                      setArrestDateErrorMessage('Reitur má ekki vera tómur')
                    }
                  }}
                  handleOpenCalendar={() => setArrestDateErrorMessage('')}
                  required
                />
              </GridColumn>
              <GridColumn span="3/8">
                <Input
                  data-testid="arrestTime"
                  name="arrestTime"
                  label="Tímasetning"
                  placeholder="Settu inn tíma"
                  disabled={!workingCase.arrestDate}
                  errorMessage={arrestTimeErrorMessage}
                  hasError={arrestTimeErrorMessage !== ''}
                  defaultValue={
                    workingCase.arrestDate?.includes('T')
                      ? formatDate(workingCase.arrestDate, TIME_FORMAT)
                      : undefined
                  }
                  ref={arrestTimeRef}
                  onBlur={(evt) => {
                    if (workingCase.arrestDate) {
                      const validateTimeEmpty = validate(
                        evt.target.value,
                        'empty',
                      )
                      const validateTimeFormat = validate(
                        evt.target.value,
                        'time-format',
                      )
                      const arrestDateMinutes = parseTime(
                        workingCase.arrestDate,
                        evt.target.value,
                      )

                      setWorkingCase({
                        ...workingCase,
                        arrestDate: arrestDateMinutes,
                      })

                      if (
                        validateTimeEmpty.isValid &&
                        validateTimeFormat.isValid
                      ) {
                        updateCase(
                          workingCase.id,
                          parseString('arrestDate', arrestDateMinutes),
                        )
                      } else {
                        setArrestTimeErrorMessage(
                          validateTimeEmpty.errorMessage ||
                            validateTimeFormat.errorMessage,
                        )
                      }
                    }
                  }}
                  onFocus={() => setArrestTimeErrorMessage('')}
                  required
                />
              </GridColumn>
            </GridRow>
          </Box>
          <Box component="section" marginBottom={7}>
            <Box marginBottom={2}>
              <Text as="h3" variant="h3">
                Ósk um fyrirtökudag og tíma
              </Text>
            </Box>
            <GridRow>
              <GridColumn span="5/8">
                <DatePicker
                  label="Veldu dagsetningu"
                  placeholderText="Veldu dagsetningu"
                  locale="is"
                  minDate={new Date()}
                  selected={
                    workingCase.requestedCourtDate
                      ? parseISO(workingCase.requestedCourtDate.toString())
                      : null
                  }
                  handleChange={(date) => {
                    const formattedDate = formatISO(date, {
                      representation: workingCase.requestedCourtDate?.includes(
                        'T',
                      )
                        ? 'complete'
                        : 'date',
                    })

                    setWorkingCase({
                      ...workingCase,
                      requestedCourtDate: formattedDate,
                    })

                    updateCase(
                      workingCase.id,
                      parseString('requestedCourtDate', formattedDate),
                    )
                  }}
                  required
                />
              </GridColumn>
              <GridColumn span="3/8">
                <Input
                  data-testid="requestedCourtDate"
                  name="requestedCourtDate"
                  label="Ósk um tíma"
                  placeholder="Settu inn tíma dags"
                  errorMessage={requestedCourtTimeErrorMessage}
                  hasError={requestedCourtTimeErrorMessage !== ''}
                  defaultValue={
                    workingCase.requestedCourtDate?.includes('T')
                      ? formatDate(workingCase.requestedCourtDate, TIME_FORMAT)
                      : undefined
                  }
                  disabled={!workingCase.requestedCourtDate}
                  ref={requestedCourtTimeRef}
                  onBlur={(evt) => {
                    if (workingCase.requestedCourtDate) {
                      const requestedCourtDateMinutes = parseTime(
                        workingCase.requestedCourtDate,
                        evt.target.value,
                      )
                      const validateTimeEmpty = validate(
                        evt.target.value,
                        'empty',
                      )
                      const validateTimeFormat = validate(
                        evt.target.value,
                        'time-format',
                      )

                      setWorkingCase({
                        ...workingCase,
                        requestedCourtDate: requestedCourtDateMinutes,
                      })

                      if (
                        validateTimeEmpty.isValid &&
                        validateTimeFormat.isValid
                      ) {
                        updateCase(
                          workingCase.id,
                          parseString(
                            'requestedCourtDate',
                            requestedCourtDateMinutes,
                          ),
                        )
                      } else {
                        setRequestedCourtTimeErrorMessage(
                          validateTimeEmpty.errorMessage ||
                            validateTimeFormat.errorMessage,
                        )
                      }
                    }
                  }}
                  onFocus={() => setRequestedCourtTimeErrorMessage('')}
                  required
                />
              </GridColumn>
            </GridRow>
          </Box>
          <FormFooter
            onNextButtonClick={() => setModalVisible(true)}
            nextIsDisabled={isStepIllegal}
          />
          {modalVisible && (
            <Modal
              title="Viltu senda tilkynningu?"
              text="Með því að senda tilkynningu á dómara á vakt um að krafa um gæsluvarðhald sé í vinnslu flýtir það fyrir málsmeðferð og allir aðilar eru upplýstir um stöðu mála."
              primaryButtonText="Senda tilkynningu"
              secondaryButtonText="Halda áfram með kröfu"
              handleClose={() => setModalVisible(false)}
              handleSecondaryButtonClick={() =>
                history.push(
                  `${Constants.STEP_TWO_ROUTE}/${workingCase.id ?? id}`,
                )
              }
              handlePrimaryButtonClick={async () => {
                await sendNotification(workingCase.id)

                history.push(
                  `${Constants.STEP_TWO_ROUTE}/${workingCase.id ?? id}`,
                )
              }}
              isPrimaryButtonLoading={isSendingNotification}
            />
          )}
        </>
      ) : null}
    </PageLayout>
  )
}

export default StepOne
