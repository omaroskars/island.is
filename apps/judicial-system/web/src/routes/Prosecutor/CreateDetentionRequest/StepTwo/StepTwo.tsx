import React, { useEffect, useState, useRef } from 'react'
import {
  Text,
  GridContainer,
  GridRow,
  GridColumn,
  Box,
  DatePicker,
  Input,
  Checkbox,
  Tooltip,
} from '@island.is/island-ui/core'
import {
  Case,
  CaseCustodyProvisions,
  CaseCustodyRestrictions,
  UpdateCase,
} from '@island.is/judicial-system/types'
import { isNextDisabled } from '../../../../utils/stepHelper'
import {
  validate,
  Validation,
} from '@island.is/judicial-system-web/src/utils/validate'
import isValid from 'date-fns/isValid'
import parseISO from 'date-fns/parseISO'
import formatISO from 'date-fns/formatISO'
import isNull from 'lodash/isNull'
import { FormFooter } from '../../../../shared-components/FormFooter'
import { formatDate } from '@island.is/judicial-system/formatters'
import {
  parseArray,
  parseString,
  parseTime,
} from '@island.is/judicial-system-web/src/utils/formatters'
import * as Constants from '../../../../utils/constants'
import { TIME_FORMAT } from '@island.is/judicial-system/formatters'
import { PageLayout } from '@island.is/judicial-system-web/src/shared-components/PageLayout/PageLayout'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import {
  CaseQuery,
  UpdateCaseMutation,
} from '@island.is/judicial-system-web/src/graphql'
import {
  ProsecutorSubsections,
  Sections,
} from '@island.is/judicial-system-web/src/types'

export const StepTwo: React.FC = () => {
  const [workingCase, setWorkingCase] = useState<Case>()
  const [isStepIllegal, setIsStepIllegal] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const requestedCustodyEndTimeRef = useRef<HTMLInputElement>(null)
  const { id } = useParams<{ id: string }>()

  const [
    requestedCustodyEndDateErrorMessage,
    setRequestedCustodyEndDateErrorMessage,
  ] = useState<string>('')
  const [
    requestedCustodyEndTimeErrorMessage,
    setRequestedCustodyEndTimeErrorMessage,
  ] = useState<string>('')
  const [lawsBrokenErrorMessage, setLawsBrokenErrorMessage] = useState<string>(
    '',
  )
  const [caseFactsErrorMessage, setCaseFactsErrorMessage] = useState<string>('')
  const [legalArgumentsErrorMessage, setLegalArgumentsErrorMessage] = useState<
    string
  >('')

  const [, setCheckboxOne] = useState<boolean>()
  const [, setCheckboxTwo] = useState<boolean>()
  const [, setCheckboxThree] = useState<boolean>()
  const [, setCheckboxFour] = useState<boolean>()
  const [, setCheckboxFive] = useState<boolean>()
  const [, setCheckboxSix] = useState<boolean>()
  const [, setRestrictionCheckboxOne] = useState<boolean>()
  const [, setRestrictionCheckboxTwo] = useState<boolean>()
  const [, setRestrictionCheckboxThree] = useState<boolean>()
  const [, setRestrictionCheckboxFour] = useState<boolean>()

  const { data } = useQuery(CaseQuery, {
    variables: { input: { id: id } },
    fetchPolicy: 'no-cache',
  })

  const resCase = data?.case

  const caseCustodyProvisions = [
    {
      brokenLaw: 'a-lið 1. mgr. 95. gr.',
      value: CaseCustodyProvisions._95_1_A,
      setCheckbox: setCheckboxOne,
      explination:
        'Að ætla megi að sakborningur muni torvelda rannsókn málsins, svo sem með því að afmá merki eftir brot, skjóta undan munum ellegar hafa áhrif á samseka eða vitni.',
    },
    {
      brokenLaw: 'b-lið 1. mgr. 95. gr.',
      value: CaseCustodyProvisions._95_1_B,
      setCheckbox: setCheckboxTwo,
      explination:
        'Að ætla megi að hann muni reyna að komast úr landi eða leynast ellegar koma sér með öðrum hætti undan málsókn eða fullnustu refsingar.',
    },
    {
      brokenLaw: 'c-lið 1. mgr. 95. gr.',
      value: CaseCustodyProvisions._95_1_C,
      setCheckbox: setCheckboxThree,
      explination:
        'Að ætla megi að hann muni halda áfram brotum meðan máli hans er ekki lokið eða rökstuddur grunur leiki á að hann hafi rofið í verulegum atriðum skilyrði sem honum hafa verið sett í skilorðsbundnum dómi.',
    },
    {
      brokenLaw: 'd-lið 1. mgr. 95. gr.',
      value: CaseCustodyProvisions._95_1_D,
      setCheckbox: setCheckboxFour,
      explination:
        'Að telja megi gæsluvarðhald nauðsynlegt til að verja aðra fyrir árásum sakbornings ellegar hann sjálfan fyrir árásum eða áhrifum annarra manna.',
    },
    {
      brokenLaw: '2. mgr. 95. gr.',
      value: CaseCustodyProvisions._95_2,
      setCheckbox: setCheckboxFive,
      explination:
        'Einnig má úrskurða sakborning í gæsluvarðhald þótt skilyrði a–d-liðar 1. mgr. séu ekki fyrir hendi ef sterkur grunur leikur á að hann hafi framið afbrot sem að lögum getur varðað 10 ára fangelsi, enda sé brotið þess eðlis að ætla megi varðhald nauðsynlegt með tilliti til almannahagsmuna.',
    },
    {
      brokenLaw: 'b-lið 1. mgr. 99. gr.',
      value: CaseCustodyProvisions._99_1_B,
      setCheckbox: setCheckboxSix,
      explination:
        'Gæslufangar skulu aðeins látnir vera í einrúmi samkvæmt úrskurði dómara en þó skulu þeir ekki gegn vilja sínum hafðir með öðrum föngum.',
    },
  ]

  const restrictions = [
    {
      restriction: 'B - Einangrun',
      value: CaseCustodyRestrictions.ISOLATION,
      setCheckbox: setRestrictionCheckboxOne,
      explination:
        'Gæslufangar skulu aðeins látnir vera í einrúmi samkvæmt úrskurði dómara en þó skulu þeir ekki gegn vilja sínum hafðir með öðrum föngum.',
    },
    {
      restriction: 'C - Heimsóknarbann',
      value: CaseCustodyRestrictions.VISITAION,
      setCheckbox: setRestrictionCheckboxTwo,
      explination:
        'Gæslufangar eiga rétt á heimsóknum. Þó getur sá sem rannsókn stýrir bannað heimsóknir ef nauðsyn ber til í þágu hennar en skylt er að verða við óskum gæslufanga um að hafa samband við verjanda og ræða við hann einslega, sbr. 1. mgr. 36. gr., og rétt að verða við óskum hans um að hafa samband við lækni eða prest, ef þess er kostur.',
    },
    {
      restriction: 'D - Bréfskoðun, símabann',
      value: CaseCustodyRestrictions.COMMUNICATION,
      setCheckbox: setRestrictionCheckboxThree,
      explination:
        'Gæslufangar mega nota síma eða önnur fjarskiptatæki og senda og taka við bréfum og öðrum skjölum. Þó getur sá sem rannsókn stýrir bannað notkun síma eða annarra fjarskiptatækja og látið athuga efni bréfa eða annarra skjala og kyrrsett þau ef nauðsyn ber til í þágu hennar en gera skal sendanda viðvart um kyrrsetningu, ef því er að skipta.',
    },
    {
      restriction: 'E - Fjölmiðlabann',
      value: CaseCustodyRestrictions.MEDIA,
      setCheckbox: setRestrictionCheckboxFour,
      explination:
        'Gæslufangar mega lesa dagblöð og bækur, svo og fylgjast með hljóðvarpi og sjónvarpi. Þó getur sá sem rannsókn stýrir takmarkað aðgang gæslufanga að fjölmiðlum ef nauðsyn ber til í þágu rannsóknar.',
    },
  ]

  useEffect(() => {
    document.title = 'Málsatvik og lagarök - Réttarvörslugátt'
  }, [])

  useEffect(() => {
    const getCurrentCase = async () => {
      setIsLoading(true)
      setWorkingCase(resCase)
      setIsLoading(false)
    }
    if (id && !workingCase && resCase) {
      getCurrentCase()
    }
  }, [id, setIsLoading, workingCase, setWorkingCase, resCase])

  useEffect(() => {
    const requiredFields: { value: string; validations: Validation[] }[] = [
      {
        value: workingCase?.requestedCustodyEndDate || '',
        validations: ['empty'],
      },
      {
        value: requestedCustodyEndTimeRef.current?.value || '',
        validations: ['empty', 'time-format'],
      },
      { value: workingCase?.lawsBroken || '', validations: ['empty'] },
      { value: workingCase?.caseFacts || '', validations: ['empty'] },
      { value: workingCase?.legalArguments || '', validations: ['empty'] },
    ]

    if (workingCase) {
      setIsStepIllegal(isNextDisabled(requiredFields))
    }
  }, [workingCase, setIsStepIllegal, requestedCustodyEndTimeRef.current?.value])

  const [updateCaseMutation] = useMutation(UpdateCaseMutation)

  const updateCase = async (id: string, updateCase: UpdateCase) => {
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

  return (
    <PageLayout
      activeSection={Sections.PROSECUTOR}
      activeSubSection={ProsecutorSubsections.CREATE_DETENTION_REQUEST_STEP_TWO}
      isLoading={isLoading}
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
                Dómkröfur
              </Text>
            </Box>
            <GridRow>
              <GridColumn span="5/8">
                <DatePicker
                  label="Gæsluvarðhald til"
                  placeholderText="Veldu dagsetningu"
                  selected={
                    workingCase.requestedCustodyEndDate
                      ? parseISO(
                          workingCase.requestedCustodyEndDate?.toString(),
                        )
                      : null
                  }
                  locale="is"
                  minDate={new Date()}
                  hasError={requestedCustodyEndDateErrorMessage !== ''}
                  errorMessage={requestedCustodyEndDateErrorMessage}
                  handleChange={(date) => {
                    const formattedDate = formatISO(date, {
                      representation: workingCase.requestedCustodyEndDate?.includes(
                        'T',
                      )
                        ? 'complete'
                        : 'date',
                    })
                    setWorkingCase({
                      ...workingCase,
                      requestedCustodyEndDate: formattedDate,
                    })

                    updateCase(
                      id,
                      JSON.parse(`{
                          "requestedCustodyEndDate": "${formattedDate}",
                          "custodyEndDate": "${formattedDate}"
                        }`),
                    )
                  }}
                  handleCloseCalendar={(date: Date | null) => {
                    if (isNull(date) || !isValid(date)) {
                      setRequestedCustodyEndDateErrorMessage(
                        'Reitur má ekki vera tómur',
                      )
                    }
                  }}
                  handleOpenCalendar={() =>
                    setRequestedCustodyEndDateErrorMessage('')
                  }
                  required
                />
              </GridColumn>
              <GridColumn span="3/8">
                <Input
                  data-testid="requestedCustodyEndTime"
                  name="requestedCustodyEndTime"
                  label="Tímasetning"
                  placeholder="Settu inn tíma"
                  ref={requestedCustodyEndTimeRef}
                  defaultValue={
                    workingCase.requestedCustodyEndDate?.includes('T')
                      ? formatDate(
                          workingCase.requestedCustodyEndDate,
                          TIME_FORMAT,
                        )
                      : undefined
                  }
                  disabled={!workingCase?.requestedCustodyEndDate}
                  errorMessage={requestedCustodyEndTimeErrorMessage}
                  hasError={requestedCustodyEndTimeErrorMessage !== ''}
                  onBlur={async (evt) => {
                    if (workingCase.requestedCustodyEndDate) {
                      const validateTimeEmpty = validate(
                        evt.target.value,
                        'empty',
                      )
                      const validateTimeFormat = validate(
                        evt.target.value,
                        'time-format',
                      )
                      const requestedCustodyEndDateMinutes = parseTime(
                        workingCase.requestedCustodyEndDate,
                        evt.target.value,
                      )

                      setWorkingCase({
                        ...workingCase,
                        requestedCustodyEndDate: requestedCustodyEndDateMinutes,
                        custodyEndDate: requestedCustodyEndDateMinutes,
                      })

                      if (
                        validateTimeEmpty.isValid &&
                        validateTimeFormat.isValid
                      ) {
                        await updateCase(
                          workingCase.id,
                          JSON.parse(`{
                              "requestedCustodyEndDate": "${requestedCustodyEndDateMinutes}",
                              "custodyEndDate": "${requestedCustodyEndDateMinutes}"
                            }`),
                        )
                      } else {
                        setRequestedCustodyEndTimeErrorMessage(
                          validateTimeEmpty.errorMessage ||
                            validateTimeFormat.errorMessage,
                        )
                      }
                    }
                  }}
                  onFocus={() => setRequestedCustodyEndTimeErrorMessage('')}
                  required
                />
              </GridColumn>
            </GridRow>
          </Box>
          <Box component="section" marginBottom={7}>
            <Box marginBottom={2}>
              <Text as="h3" variant="h3">
                Lagaákvæði sem brot varða við
              </Text>
            </Box>
            <Input
              data-testid="lawsBroken"
              name="lawsBroken"
              label="Lagaákvæði sem ætluð brot kærða þykja varða við"
              placeholder="Skrá inn þau lagaákvæði sem brotið varðar við, til dæmis 1. mgr. 244 gr. almennra hegningarlaga nr. 19/1940..."
              defaultValue={workingCase?.lawsBroken}
              errorMessage={lawsBrokenErrorMessage}
              hasError={lawsBrokenErrorMessage !== ''}
              onBlur={(evt) => {
                setWorkingCase({ ...workingCase, lawsBroken: evt.target.value })

                const validateField = validate(evt.target.value, 'empty')
                if (validateField.isValid) {
                  updateCase(
                    workingCase.id,
                    parseString('lawsBroken', evt.target.value),
                  )
                } else {
                  setLawsBrokenErrorMessage(validateField.errorMessage)
                }
              }}
              onFocus={() => setLawsBrokenErrorMessage('')}
              required
              textarea
              rows={7}
            />
          </Box>
          <Box component="section" marginBottom={7}>
            <Box marginBottom={2}>
              <Text as="h3" variant="h3">
                Lagaákvæði sem krafan er byggð á{' '}
                <Text as="span" color={'red400'} fontWeight="semiBold">
                  *
                </Text>
              </Text>
            </Box>
            <GridContainer>
              <GridRow>
                {caseCustodyProvisions.map((provision, index) => {
                  return (
                    <GridColumn span="3/7" key={index}>
                      <Box marginBottom={3}>
                        <Checkbox
                          name={provision.brokenLaw}
                          label={provision.brokenLaw}
                          value={provision.value}
                          checked={
                            workingCase.custodyProvisions &&
                            workingCase.custodyProvisions.indexOf(
                              provision.value,
                            ) > -1
                          }
                          tooltip={provision.explination}
                          onChange={({ target }) => {
                            // Create a copy of the state
                            const copyOfState = Object.assign(workingCase, {})

                            const provisionIsSelected =
                              copyOfState.custodyProvisions &&
                              copyOfState.custodyProvisions.indexOf(
                                target.value as CaseCustodyProvisions,
                              ) > -1

                            // Toggle the checkbox on or off
                            provision.setCheckbox(!provisionIsSelected)

                            // If the user is checking the box, add the broken law to the state
                            if (!provisionIsSelected) {
                              if (copyOfState.custodyProvisions === null) {
                                copyOfState.custodyProvisions = []
                              }

                              copyOfState.custodyProvisions &&
                                copyOfState.custodyProvisions.push(
                                  target.value as CaseCustodyProvisions,
                                )
                            }
                            // If the user is unchecking the box, remove the broken law from the state
                            else {
                              const provisions = copyOfState.custodyProvisions
                              if (provisions) {
                                provisions.splice(
                                  provisions.indexOf(
                                    target.value as CaseCustodyProvisions,
                                  ),
                                  1,
                                )
                              }
                            }

                            // Set the updated state as the state
                            setWorkingCase(copyOfState)

                            if (copyOfState.custodyProvisions) {
                              // Save case
                              updateCase(
                                workingCase.id,
                                parseArray(
                                  'custodyProvisions',
                                  copyOfState.custodyProvisions,
                                ),
                              )
                            }
                          }}
                          large
                        />
                      </Box>
                    </GridColumn>
                  )
                })}
              </GridRow>
            </GridContainer>
          </Box>
          <Box component="section" marginBottom={7}>
            <Box marginBottom={2}>
              <Text as="h3" variant="h3">
                Takmarkanir á gæslu
              </Text>
              <Text fontWeight="regular">
                Ef ekkert er valið, er gæsla án takmarkana
              </Text>
            </Box>
            <GridContainer>
              <GridRow>
                {restrictions.map((restriction, index) => (
                  <GridColumn span="3/7" key={index}>
                    <Box marginBottom={3}>
                      <Checkbox
                        name={restriction.restriction}
                        label={restriction.restriction}
                        value={restriction.value}
                        checked={
                          workingCase.requestedCustodyRestrictions &&
                          workingCase.requestedCustodyRestrictions.indexOf(
                            restriction.value,
                          ) > -1
                        }
                        tooltip={restriction.explination}
                        onChange={async ({ target }) => {
                          // Create a copy of the state
                          const copyOfState = Object.assign(workingCase, {})

                          const restrictionIsSelected =
                            copyOfState.requestedCustodyRestrictions &&
                            copyOfState.requestedCustodyRestrictions.indexOf(
                              target.value as CaseCustodyRestrictions,
                            ) > -1

                          // Toggle the checkbox on or off
                          restriction.setCheckbox(!restrictionIsSelected)

                          if (
                            copyOfState.requestedCustodyRestrictions === null
                          ) {
                            copyOfState.requestedCustodyRestrictions = []
                          }

                          // If the user is checking the box, add the restriction to the state
                          if (!restrictionIsSelected) {
                            copyOfState.requestedCustodyRestrictions &&
                              copyOfState.requestedCustodyRestrictions.push(
                                target.value as CaseCustodyRestrictions,
                              )
                          }
                          // If the user is unchecking the box, remove the restriction from the state
                          else {
                            copyOfState.requestedCustodyRestrictions &&
                              copyOfState.requestedCustodyRestrictions.splice(
                                copyOfState.requestedCustodyRestrictions.indexOf(
                                  target.value as CaseCustodyRestrictions,
                                ),
                                1,
                              )
                          }

                          // Set the updated state as the state
                          setWorkingCase(copyOfState)

                          // Save case
                          if (copyOfState.requestedCustodyRestrictions) {
                            await updateCase(
                              workingCase.id,
                              parseArray(
                                'requestedCustodyRestrictions',
                                copyOfState.requestedCustodyRestrictions,
                              ),
                            )
                          }

                          setWorkingCase({
                            ...workingCase,
                            requestedCustodyRestrictions:
                              copyOfState.requestedCustodyRestrictions,
                          })
                        }}
                        large
                      />
                    </Box>
                  </GridColumn>
                ))}
              </GridRow>
            </GridContainer>
          </Box>
          <Box component="section" marginBottom={7}>
            <Box marginBottom={2}>
              <Text as="h3" variant="h3">
                Greinargerð um málsatvik og lagarök
              </Text>
            </Box>
            <Box marginBottom={3}>
              <Input
                data-testid="caseFacts"
                name="caseFacts"
                label="Málsatvik"
                placeholder="Hvað hefur átt sér stað hingað til? Hver er framburður sakborninga og vitna? Hver er staða rannsóknar og næstu skref?"
                errorMessage={caseFactsErrorMessage}
                hasError={caseFactsErrorMessage !== ''}
                defaultValue={workingCase?.caseFacts}
                onBlur={(evt) => {
                  setWorkingCase({
                    ...workingCase,
                    caseFacts: evt.target.value,
                  })

                  const validateField = validate(evt.target.value, 'empty')
                  if (validateField.isValid) {
                    updateCase(
                      workingCase.id,
                      parseString('caseFacts', evt.target.value),
                    )
                  } else {
                    setCaseFactsErrorMessage(validateField.errorMessage)
                  }
                }}
                onFocus={() => setCaseFactsErrorMessage('')}
                required
                rows={16}
                textarea
              />
            </Box>
            <Box marginBottom={7}>
              <Input
                data-testid="legalArguments"
                name="legalArguments"
                label="Lagarök"
                placeholder="Hver eru lagarökin fyrir kröfu um gæsluvarðhald?"
                defaultValue={workingCase?.legalArguments}
                errorMessage={legalArgumentsErrorMessage}
                hasError={legalArgumentsErrorMessage !== ''}
                onBlur={(evt) => {
                  setWorkingCase({
                    ...workingCase,
                    legalArguments: evt.target.value,
                  })

                  const validateField = validate(evt.target.value, 'empty')
                  if (validateField.isValid) {
                    updateCase(
                      workingCase.id,
                      parseString('legalArguments', evt.target.value),
                    )
                  } else {
                    setLegalArgumentsErrorMessage(validateField.errorMessage)
                  }
                }}
                onFocus={() => setLegalArgumentsErrorMessage('')}
                required
                textarea
                rows={16}
              />
            </Box>
            <Box component="section" marginBottom={7}>
              <Box marginBottom={2}>
                <Text as="h3" variant="h3">
                  Skilaboð til dómara{' '}
                  <Tooltip
                    placement="right"
                    as="span"
                    text="Hér er hægt að skrá athugasemdir eða skilaboð til dómara sem verður ekki vistað sem hluti af kröfunni. Til dæmis aðrar upplýsingar en koma fram í kröfunni og/eða upplýsingar um ástand sakbornings"
                  />
                </Text>
              </Box>
              <Box marginBottom={3}>
                <Input
                  name="comments"
                  label="Skilaboð til dómara"
                  placeholder="Er eitthvað sem þú vilt koma á framfæri við dómara sem tengist kröfunni eða ástandi sakbornings?"
                  defaultValue={workingCase?.comments}
                  onBlur={(evt) => {
                    setWorkingCase({
                      ...workingCase,
                      comments: evt.target.value,
                    })

                    updateCase(
                      workingCase.id,
                      parseString('comments', evt.target.value),
                    )
                  }}
                  textarea
                  rows={7}
                />
              </Box>
            </Box>
          </Box>
          <FormFooter
            nextUrl={`${Constants.STEP_THREE_ROUTE}/${id}`}
            nextIsDisabled={
              isStepIllegal || workingCase.custodyProvisions?.length === 0
            }
          />
        </>
      ) : null}
    </PageLayout>
  )
}

export default StepTwo
