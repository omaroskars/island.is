import React, { FC, useState } from 'react'
import { FieldBaseProps, getValueViaPath, ValidAnswers } from '@island.is/application/core'
import BoxChart, { BoxChartKey } from '../components/BoxChart'
import { Box, Text } from '@island.is/island-ui/core'
import { RadioController } from '@island.is/shared/form-fields'
import { useLocale } from '@island.is/localization'
import { m, mm } from '../../lib/messages'

const RequestRights: FC<FieldBaseProps> = ({ error, field, application }) => {
  const { formatMessage } = useLocale()
  const currentAnswer = getValueViaPath(
    application.answers,
    field.id,
    undefined,
  ) as ValidAnswers
  const [statefulAnswer, setStatefulAnswer] = useState<ValidAnswers>(
    currentAnswer,
  )

  const numberOfBoxes = statefulAnswer === 'no' ? 6 : 7

  const boxChartKeys: BoxChartKey[] = [
    {
      label: () => ({ ...m.yourRightsInMonths, values: { months: '6' } }),
      bulletStyle: 'blue',
    },
  ]
  if (statefulAnswer === 'yes') {
    boxChartKeys.push({
      label: m.requestRightsMonths,
      bulletStyle: 'greenWithLines',
    })
  }
  return (
    <Box marginY={3} key={field.id}>
      <Box paddingY={3} marginBottom={3}>
        <RadioController
          id={field.id}
          defaultValue={
            statefulAnswer !== undefined ? [statefulAnswer] : undefined
          }
          options={[
            { label: formatMessage(m.requestRightsYes), value: 'yes' },
            { label: formatMessage(m.requestRightsNo), value: 'no' },
          ]}
          onSelect={(newAnswer) => setStatefulAnswer(newAnswer as ValidAnswers)}
          largeButtons
        />
      </Box>
      {error && (
        <Box color="red400" padding={2}>
          <Text color="red400">{formatMessage(mm.errors.requiredAnswer)}</Text>
        </Box>
      )}
      <BoxChart
        application={application}
        boxes={numberOfBoxes}
        calculateBoxStyle={(index) => {
          if (index === 6) {
            if (statefulAnswer === 'yes') {
              return 'greenWithLines'
            }
            return 'grayWithLines'
          }
          return 'blue'
        }}
        keys={boxChartKeys as BoxChartKey[]}
      />
    </Box>
  )
}

export default RequestRights
