import React, { FC } from 'react'
import BoxChart, { BoxChartKey } from '../components/BoxChart'
import { Box, Text } from '@island.is/island-ui/core'
import { Application, getValueViaPath } from '@island.is/application/core'
import { m } from '../../lib/messages'
import { useLocale } from '@island.is/localization'
import { allowance } from '../parentalLeaveUtils'

interface YourRightsBoxChartProps {
  application: Application
  showDisclaimer?: boolean
}

const YourRightsBoxChart: FC<YourRightsBoxChartProps> = ({
  application,
  showDisclaimer = false,
}) => {
  console.log('-YourRightsBoxChart');
  const { formatMessage } = useLocale()
  const requestRightsAnswer = getValueViaPath(
    application.answers,
    'requestRights',
    undefined,
  )
  const giveRightsAnswer = getValueViaPath(
    application.answers,
    'giveRights',
    undefined,
  )

  const boxChartKeys =
    requestRightsAnswer === 'yes'
      ? [
          {
            label: () => ({ ...m.yourRightsInMonths, values: { months: allowance.default.toString() } }),
            bulletStyle: 'blue',
          },
          {
            label: m.requestRightsMonths,
            bulletStyle: 'greenWithLines',
          },
        ]
      : [
          {
            label: () => ({
              ...m.yourRightsInMonths,
              values: { months: giveRightsAnswer === 'yes' ? allowance.min.toString() : allowance.default.toString() },
            }),
            bulletStyle: 'blue',
          },
        ]

  const numberOfBoxes =
    requestRightsAnswer === 'yes' ? allowance.max : giveRightsAnswer === 'yes' ? allowance.min : allowance.default

  return (
    <Box marginY={3} key={'YourRightsBoxChart'}>
      <BoxChart
        application={application}
        titleLabel={() => ({
          ...m.monthsTotal,
          values: { months: numberOfBoxes },
        })}
        boxes={numberOfBoxes}
        calculateBoxStyle={(index) => {
          if (index === 6) {
            return 'greenWithLines'
          }
          return 'blue'
        }}
        keys={boxChartKeys as BoxChartKey[]}
      />
      {showDisclaimer && (
        <Box marginTop={5}>
          <Text> {formatMessage(m.rightsTotalSmallPrint)}</Text>
        </Box>
      )}
    </Box>
  )
}

export default YourRightsBoxChart
