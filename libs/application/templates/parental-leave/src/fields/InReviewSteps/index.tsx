import React, { FC, useState } from 'react'
import { useMutation } from '@apollo/client'
import { useLocale } from '@island.is/localization'

import { FieldBaseProps, MessageFormatter } from '@island.is/application/core'
import {
  Box,
  Button,
  DialogPrompt,
  Text,
  toast,
} from '@island.is/island-ui/core'
import ReviewSection, { reviewSectionState } from './ReviewSection'
import ReadOnlyReview from '../Review/ReadOnlyReview'

import { mm } from '../../lib/messages'

import { SUBMIT_APPLICATION } from '@island.is/application/graphql'

function handleError(error: string, formatMessage: MessageFormatter): void {
  toast.error(
    formatMessage(
      {
        id: 'application.system:submit.error',
        defaultMessage: 'Eitthvað fór úrskeiðis: {error}',
        description: 'Error message on submit',
      },
      { error },
    ),
  )
}

type stateMapEntry = { [key: string]: reviewSectionState }
type statesMap = {
  otherParent: stateMapEntry
  employer: stateMapEntry
  vinnumalastofnun: stateMapEntry
}
const statesMap: statesMap = {
  otherParent: {
    otherParentApproval: reviewSectionState.inProgress,
    otherParentRequiresAction: reviewSectionState.requiresAction,
    employerApproval: reviewSectionState.complete,
    vinnumalastofnunApproval: reviewSectionState.complete,
  },
  employer: {
    employerApproval: reviewSectionState.inProgress,
    employerRequiresAction: reviewSectionState.requiresAction,
    vinnumalastofnunApproval: reviewSectionState.complete,
  },
  vinnumalastofnun: {
    vinnumalastofnunApproval: reviewSectionState.inProgress,
    vinnumalastofnunRequiresAction: reviewSectionState.requiresAction,
    approved: reviewSectionState.complete,
  },
}

const InReviewSteps: FC<FieldBaseProps> = ({ application }) => {
  const [submitApplication, { loading: loadingSubmit }] = useMutation(
    SUBMIT_APPLICATION,
    {
      onError: (e) => handleError(e.message, formatMessage),
    },
  )

  const { formatMessage } = useLocale()
  const [screenState, setScreenState] = useState<'steps' | 'viewApplication'>(
    'steps',
  )

  return (
    <Box marginBottom={10}>
      <Box display="flex" justifyContent="spaceBetween">
        <Text>
          {(screenState === 'steps' && formatMessage(mm.reviewScreen.desc)) ||
            formatMessage(mm.reviewScreen.descReview)}
        </Text>
        <Box>
          <Box display="inlineBlock" marginLeft={1} marginRight={2}>
            <Button
              colorScheme="default"
              iconType="filled"
              onClick={() =>
                setScreenState(
                  (screenState === 'steps' && 'viewApplication') || 'steps',
                )
              }
              size="small"
              type="button"
              variant="text"
            >
              {(screenState === 'steps' &&
                formatMessage(mm.reviewScreen.buttonsView)) ||
                formatMessage(mm.reviewScreen.buttonsViewProgress)}
            </Button>
          </Box>
          <Box display="inlineBlock">
            <DialogPrompt
              baseId="editApplicationDialog"
              title={formatMessage(mm.reviewScreen.editApplicationModalTitle)}
              description={formatMessage(
                mm.reviewScreen.editApplicationModalDesc,
              )}
              ariaLabel={formatMessage(
                mm.reviewScreen.editApplicationModalAria,
              )}
              disclosureElement={
                <Button
                  colorScheme="default"
                  iconType="filled"
                  size="small"
                  type="button"
                  variant="text"
                  icon="pencil"
                >
                  {formatMessage(mm.reviewScreen.buttonsEdit)}
                </Button>
              }
              onConfirm={async () => {
                const response = await submitApplication({
                  variables: {
                    input: {
                      id: application.id,
                      event: { state: 'draft' },
                      answers: application.answers,
                    },
                  },
                })
              }}
              buttonTextConfirm={formatMessage(
                mm.reviewScreen.editApplicationModalConfirmButton,
              )}
              buttonTextCancel={formatMessage(
                mm.reviewScreen.editApplicationModalCancelButton,
              )}
            />
          </Box>
        </Box>
      </Box>

      {(screenState === 'steps' && (
        <Box marginTop={7} marginBottom={8}>
          <ReviewSection
            application={application}
            index={1}
            state={statesMap['otherParent'][application.state]}
            title={formatMessage(mm.reviewScreen.otherParentTitle)}
            description={formatMessage(mm.reviewScreen.otherParentDesc)}
          />
          <ReviewSection
            application={application}
            index={2}
            state={statesMap['employer'][application.state]}
            title={formatMessage(mm.reviewScreen.employerTitle)}
            description={formatMessage(mm.reviewScreen.employerDesc)}
          />
          <ReviewSection
            application={application}
            index={3}
            state={statesMap['vinnumalastofnun'][application.state]}
            title={formatMessage(mm.reviewScreen.deptTitle)}
            description={formatMessage(mm.reviewScreen.deptDesc)}
          />
        </Box>
      )) || (
        <Box marginTop={7} marginBottom={8}>
          <ReadOnlyReview application={application} />
        </Box>
      )}
    </Box>
  )
}

export default InReviewSteps
