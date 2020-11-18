import {
  Box,
  GridColumn,
  GridRow,
  Input,
  RadioButton,
  Text,
} from '@island.is/island-ui/core'
import React, { useEffect, useState } from 'react'
import { FormFooter } from '../../../../shared-components/FormFooter'
import {
  Case,
  CaseAppealDecision,
  UpdateCase,
} from '@island.is/judicial-system/types'
import * as Constants from '../../../../utils/constants'
import { parseString } from '../../../../utils/formatters'
import { constructConclusion } from '../../../../utils/stepHelper'
import { PageLayout } from '@island.is/judicial-system-web/src/shared-components/PageLayout/PageLayout'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import {
  CaseQuery,
  UpdateCaseMutation,
} from '@island.is/judicial-system-web/src/graphql'
import {
  JudgeSubsections,
  Sections,
} from '@island.is/judicial-system-web/src/types'

export const RulingStepTwo: React.FC = () => {
  const [workingCase, setWorkingCase] = useState<Case>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { id } = useParams<{ id: string }>()
  const [updateCaseMutation] = useMutation(UpdateCaseMutation)
  const { data } = useQuery(CaseQuery, {
    variables: { input: { id: id } },
    fetchPolicy: 'no-cache',
  })
  const resCase = data?.case

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

  useEffect(() => {
    document.title = 'Úrskurðarorð - Réttarvörslugátt'
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

  return (
    <PageLayout
      activeSection={Sections.JUDGE}
      activeSubSection={JudgeSubsections.RULING_STEP_TWO}
      isLoading={isLoading}
    >
      {workingCase ? (
        <>
          <Box marginBottom={10}>
            <Text as="h1" variant="h1">
              Úrskurður og kæra
            </Text>
          </Box>
          <Box component="section" marginBottom={7}>
            <Text variant="h2">{`Mál nr. ${workingCase.courtCaseNumber}`}</Text>
            <Text fontWeight="semiBold">{`LÖKE málsnr. ${workingCase.policeCaseNumber}`}</Text>
          </Box>
          <Box component="section" marginBottom={8}>
            <Box marginBottom={10}>
              <Box marginBottom={2}>
                <Text as="h4" variant="h4">
                  Úrskurðarorð
                </Text>
              </Box>
              <Box marginBottom={3}>
                <Text>{constructConclusion(workingCase)}</Text>
              </Box>
              <Text variant="h4" fontWeight="light">
                Úrskurðarorðið er lesið í heyranda hljóði fyrir viðstadda.
              </Text>
            </Box>
          </Box>
          <Box component="section" marginBottom={8}>
            <Box marginBottom={2}>
              <Text as="h3" variant="h3">
                Ákvörðun um kæru
              </Text>
            </Box>
            <Box marginBottom={3}>
              <Text variant="h4" fontWeight="light">
                Dómari leiðbeinir málsaðilum um rétt þeirra til að kæra úrskurð
                þennan til Landsréttar innan þriggja sólarhringa.
              </Text>
            </Box>
            <Box marginBottom={3}>
              <Box marginBottom={2}>
                <Text as="h4" variant="h4">
                  Kærði{' '}
                  <Text as="span" color="red400" fontWeight="semiBold">
                    *
                  </Text>
                </Text>
              </Box>
              <Box marginBottom={3}>
                <GridRow>
                  <GridColumn span="3/7">
                    <RadioButton
                      name="accused-appeal-decition"
                      id="accused-appeal"
                      label="Kærði kærir úrskurðinn"
                      value={CaseAppealDecision.APPEAL}
                      checked={
                        workingCase.accusedAppealDecision ===
                        CaseAppealDecision.APPEAL
                      }
                      onChange={() => {
                        setWorkingCase({
                          ...workingCase,
                          accusedAppealDecision: CaseAppealDecision.APPEAL,
                        })

                        updateCase(
                          workingCase.id,
                          parseString(
                            'accusedAppealDecision',
                            CaseAppealDecision.APPEAL,
                          ),
                        )
                      }}
                      large
                    />
                  </GridColumn>
                  <GridColumn span="3/7">
                    <RadioButton
                      name="accused-appeal-decition"
                      id="accused-accept"
                      label="Kærði unir úrskurðinum"
                      value={CaseAppealDecision.ACCEPT}
                      checked={
                        workingCase.accusedAppealDecision ===
                        CaseAppealDecision.ACCEPT
                      }
                      onChange={() => {
                        setWorkingCase({
                          ...workingCase,
                          accusedAppealDecision: CaseAppealDecision.ACCEPT,
                        })

                        updateCase(
                          workingCase.id,
                          parseString(
                            'accusedAppealDecision',
                            CaseAppealDecision.ACCEPT,
                          ),
                        )
                      }}
                      large
                    />
                  </GridColumn>
                </GridRow>
              </Box>
              <Box marginBottom={4}>
                <GridRow>
                  <GridColumn span="4/7">
                    <RadioButton
                      name="accused-appeal-decition"
                      id="accused-postpone"
                      label="Kærði tekur sér lögboðinn frest"
                      value={CaseAppealDecision.POSTPONE}
                      checked={
                        workingCase.accusedAppealDecision ===
                        CaseAppealDecision.POSTPONE
                      }
                      onChange={() => {
                        setWorkingCase({
                          ...workingCase,
                          accusedAppealDecision: CaseAppealDecision.POSTPONE,
                        })

                        updateCase(
                          workingCase.id,
                          parseString(
                            'accusedAppealDecision',
                            CaseAppealDecision.POSTPONE,
                          ),
                        )
                      }}
                      large
                    />
                  </GridColumn>
                </GridRow>
              </Box>
              <Input
                name="accusedAppealAnnouncement"
                data-testid="accusedAppealAnnouncement"
                label="Yfirlýsing um kæru kærða"
                defaultValue={workingCase.accusedAppealAnnouncement}
                disabled={
                  workingCase.accusedAppealDecision !==
                  CaseAppealDecision.APPEAL
                }
                placeholder="Í hvaða skyni er kært?"
                onBlur={(evt) => {
                  setWorkingCase({
                    ...workingCase,
                    accusedAppealAnnouncement: evt.target.value,
                  })

                  updateCase(
                    workingCase.id,
                    parseString('accusedAppealAnnouncement', evt.target.value),
                  )
                }}
                textarea
                rows={7}
              />
            </Box>
            <Box marginBottom={2}>
              <Text as="h4" variant="h4">
                Sækjandi{' '}
                <Text as="span" color="red400" fontWeight="semiBold">
                  *
                </Text>
              </Text>
            </Box>
            <Box marginBottom={3}>
              <GridRow>
                <GridColumn span="3/7">
                  <RadioButton
                    name="prosecutor-appeal-decition"
                    id="prosecutor-appeal"
                    label="Sækjandi kærir úrskurðinn"
                    value={CaseAppealDecision.APPEAL}
                    checked={
                      workingCase.prosecutorAppealDecision ===
                      CaseAppealDecision.APPEAL
                    }
                    onChange={() => {
                      setWorkingCase({
                        ...workingCase,
                        prosecutorAppealDecision: CaseAppealDecision.APPEAL,
                      })

                      updateCase(
                        workingCase.id,
                        parseString(
                          'prosecutorAppealDecision',
                          CaseAppealDecision.APPEAL,
                        ),
                      )
                    }}
                    large
                  />
                </GridColumn>
                <GridColumn>
                  <RadioButton
                    name="prosecutor-appeal-decition"
                    id="prosecutor-accept"
                    label="Sækjandi unir úrskurðinum"
                    value={CaseAppealDecision.ACCEPT}
                    checked={
                      workingCase.prosecutorAppealDecision ===
                      CaseAppealDecision.ACCEPT
                    }
                    onChange={() => {
                      setWorkingCase({
                        ...workingCase,
                        prosecutorAppealDecision: CaseAppealDecision.ACCEPT,
                      })

                      updateCase(
                        workingCase.id,
                        parseString(
                          'prosecutorAppealDecision',
                          CaseAppealDecision.ACCEPT,
                        ),
                      )
                    }}
                    large
                  />
                </GridColumn>
              </GridRow>
            </Box>
            <Box marginBottom={4}>
              <GridRow>
                <GridColumn span="4/7">
                  <RadioButton
                    name="prosecutor-appeal-decition"
                    id="prosecutor-postpone"
                    label="Sækjandi tekur sér lögboðinn frest"
                    value={CaseAppealDecision.POSTPONE}
                    checked={
                      workingCase.prosecutorAppealDecision ===
                      CaseAppealDecision.POSTPONE
                    }
                    onChange={() => {
                      setWorkingCase({
                        ...workingCase,
                        prosecutorAppealDecision: CaseAppealDecision.POSTPONE,
                      })

                      updateCase(
                        workingCase.id,
                        parseString(
                          'prosecutorAppealDecision',
                          CaseAppealDecision.POSTPONE,
                        ),
                      )
                    }}
                    large
                  />
                </GridColumn>
              </GridRow>
            </Box>
            <Box marginBottom={1}>
              <Input
                name="prosecutorAppealAnnouncement"
                data-testid="prosecutorAppealAnnouncement"
                label="Yfirlýsing um kæru sækjanda"
                defaultValue={workingCase.prosecutorAppealAnnouncement}
                disabled={
                  workingCase.prosecutorAppealDecision !==
                  CaseAppealDecision.APPEAL
                }
                placeholder="Í hvaða skyni er kært?"
                onBlur={(evt) => {
                  setWorkingCase({
                    ...workingCase,
                    prosecutorAppealAnnouncement: evt.target.value,
                  })

                  updateCase(
                    workingCase.id,
                    parseString(
                      'prosecutorAppealAnnouncement',
                      evt.target.value,
                    ),
                  )
                }}
                textarea
                rows={7}
              />
            </Box>
            <Text variant="h4" fontWeight="light">
              Dómari bendir kærða/umboðsaðila á að honum sé heimilt að bera
              atriði er lúta að framkvæmd gæsluvarðhaldsins undir dómara.
            </Text>
          </Box>
          <FormFooter
            nextUrl={`${Constants.CONFIRMATION_ROUTE}/${id}`}
            nextIsDisabled={
              !workingCase.accusedAppealDecision ||
              !workingCase.prosecutorAppealDecision
            }
          />
        </>
      ) : null}
    </PageLayout>
  )
}

export default RulingStepTwo
