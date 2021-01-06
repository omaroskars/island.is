import React, { FC, useState } from 'react'
import {
  FieldBaseProps,
  formatText,
  getValueViaPath,
  ValidAnswers,
} from '@island.is/application/core'
import BoxChart, { BoxChartKey } from '../components/BoxChart'
import { Box, Text } from '@island.is/island-ui/core'
import { useLocale } from '@island.is/localization'
import { RadioController } from '@island.is/shared/form-fields'
import { m, mm } from '../../lib/messages'
import { allowance } from '../parentalLeaveUtils'

const GiveRights: FC<FieldBaseProps> = ({ error, field, application }) => {
  const currentAnswer = getValueViaPath(
    application.answers,
    field.id,
    undefined,
  ) as ValidAnswers
  const [statefulAnswer, setStatefulAnswer] = useState<ValidAnswers>(
    currentAnswer,
  )

  const { formatMessage } = useLocale()

  const boxChartKeys =
    statefulAnswer === 'yes'
      ? [
          {
            label: () => ({ ...m.yourRightsInMonths, values: { months: allowance.min.toString() } }),
            bulletStyle: 'blue',
          },
          {
            label: m.giveRightsMonths,
            bulletStyle: 'greenWithLines',
          },
        ]
      : [
          {
            label: () => ({ ...m.yourRightsInMonths, values: { months: allowance.default.toString() } }),
            bulletStyle: 'blue',
          },
        ]

  return (
    <Box marginY={3} key={field.id}>
      <Box paddingY={3} marginBottom={3}>
        <RadioController
          id={field.id}
          defaultValue={
            statefulAnswer !== undefined ? [statefulAnswer] : undefined
          }
          options={[
            {
              label: formatText(m.giveRightsYes, application, formatMessage),
              value: 'yes',
            },
            {
              label: formatText(m.giveRightsNo, application, formatMessage),
              value: 'no',
            },
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
        boxes={6}
        calculateBoxStyle={(index) => {
          if (index === 5) {
            if (statefulAnswer === 'yes') {
              return 'greenWithLines'
            } else if (statefulAnswer === undefined) return 'grayWithLines'
          }
          return 'blue'
        }}
        keys={boxChartKeys as BoxChartKey[]}
      />
    </Box>
  )
}

export default GiveRights
