import React from 'react'
import { Box, Button } from '@island.is/island-ui/core'
import { useHistory } from 'react-router-dom'

interface Props {
  nextUrl?: string
  nextIsDisabled?: boolean
  nextIsLoading?: boolean
  nextButtonText?: string
  onNextButtonClick?: () => void
  previousIsDisabled?: boolean
}

const FormFooter: React.FC<Props> = (props: Props) => {
  const history = useHistory()

  return (
    <Box display="flex" justifyContent="spaceBetween" alignItems="flexStart">
      <Button
        variant="ghost"
        disabled={props.previousIsDisabled}
        onClick={() => {
          history.goBack()
        }}
      >
        Til baka
      </Button>
      <Button
        data-testid="continueButton"
        icon="arrowForward"
        disabled={props.nextIsDisabled}
        loading={props.nextIsLoading}
        onClick={() => {
          if (props.onNextButtonClick) {
            props.onNextButtonClick()
          } else if (props.nextUrl) {
            history.push(props.nextUrl)
          }
        }}
      >
        {props.nextButtonText ?? 'Halda áfram'}
      </Button>
    </Box>
  )
}

export default FormFooter
