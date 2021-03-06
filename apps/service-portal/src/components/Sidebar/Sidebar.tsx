import React, { FC } from 'react'
import { Box, Stack, Text } from '@island.is/island-ui/core'
import * as styles from './Sidebar.treat'
import ModuleNavigation from './ModuleNavigation'
import useNavigation from '../../hooks/useNavigation/useNavigation'
import { useLocale } from '@island.is/localization'
import { ServicePortalPath } from '@island.is/service-portal/core'

export const Sidebar: FC<{}> = () => {
  const { formatMessage } = useLocale()
  const navigation = useNavigation()

  return (
    <aside className={styles.sidebar}>
      {navigation.map((rootItem, rootIndex) => (
        <Box
          marginBottom={3}
          background={rootIndex === 0 ? 'blue100' : 'blueberry100'}
          borderRadius="large"
          key={rootIndex}
          padding={4}
        >
          <Stack space={3}>
            {rootItem.children?.map(
              (navRoot, index) =>
                navRoot.path !== ServicePortalPath.MinarSidurRoot && (
                  <ModuleNavigation
                    key={index}
                    nav={navRoot}
                    variant={rootIndex === 0 ? 'blue' : 'blueberry'}
                  />
                ),
            )}
          </Stack>
          {rootIndex === 1 && (
            <Text variant="small" color="blueberry600" marginTop={3}>
              {formatMessage({
                id: 'service.portal:incoming-services-footer',
                defaultMessage: `Þessi virkni er í boði á minarsidur.island.is en verður flutt hingað innan tíðar.`,
              })}
            </Text>
          )}
        </Box>
      ))}
    </aside>
  )
}

export default Sidebar
