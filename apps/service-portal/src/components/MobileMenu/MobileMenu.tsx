import {
  Box,
  Button,
  GridColumn,
  GridRow,
  Stack,
  Text,
} from '@island.is/island-ui/core'
import { Locale, useLocale, useNamespaces } from '@island.is/localization'
import { ISLAND_IS_URL } from '@island.is/service-portal/constants'
import { ServicePortalPath } from '@island.is/service-portal/core'
import React, { FC, useRef } from 'react'
import useNavigation from '../../hooks/useNavigation/useNavigation'
import { ActionType } from '../../store/actions'
import { useStore } from '../../store/stateProvider'
import ModuleNavigation from '../Sidebar/ModuleNavigation'
import * as styles from './MobileMenu.treat'
import useAuth from '../../hooks/useAuth/useAuth'

const MobileMenu: FC<{}> = () => {
  const ref = useRef(null)
  const [{ mobileMenuState }, dispatch] = useStore()
  const { lang, formatMessage } = useLocale()
  const navigation = useNavigation()
  const { changeLanguage } = useNamespaces()
  const { signOutUser } = useAuth()

  const handleLangClick = (value: Locale) => changeLanguage(value)
  const handleLogoutClick = () => signOutUser()

  const handleLinkClick = () =>
    dispatch({
      type: ActionType.SetMobileMenuState,
      payload: 'closed',
    })

  if (mobileMenuState === 'closed') return null

  return (
    <Box
      position="fixed"
      right={0}
      bottom={0}
      left={0}
      background="white"
      className={styles.wrapper}
      ref={ref}
    >
      <Box paddingX={3}>
        <GridRow>
          <GridColumn span="4/6">
            <a href={ISLAND_IS_URL}>
              <Button variant="utility" fluid>
                {formatMessage({
                  id: 'service.portal:go-to-island-is',
                  defaultMessage: 'Fara á ytrivef island.is',
                })}
              </Button>
            </a>
          </GridColumn>
          <GridColumn span="2/6">
            <Button
              variant="utility"
              fluid
              onClick={handleLangClick.bind(null, lang === 'is' ? 'en' : 'is')}
            >
              {lang === 'is' ? 'EN' : 'IS'}
            </Button>
          </GridColumn>
        </GridRow>
      </Box>
      {navigation.map((rootItem, rootIndex) => (
        <Box
          background={rootIndex === 0 ? 'white' : 'blueberry100'}
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
                    onItemClick={handleLinkClick}
                  />
                ),
            )}
            {rootIndex === 0 && (
              <Box>
                <Button
                  onClick={handleLogoutClick}
                  fluid
                  icon="logOut"
                  iconType="outline"
                >
                  {formatMessage({
                    id: 'global:logout',
                    defaultMessage: 'Útskrá',
                  })}
                </Button>
              </Box>
            )}
          </Stack>
          {rootIndex === 1 && (
            <Text variant="small" color="blueberry600" marginTop={3}>
              {formatMessage({
                id: 'service.portal:incoming-services-footer',
                defaultMessage: `
                  Þessi virkni er enn í boði á eldri Mínum síðum.
                  Unnið er að því að færa þessar þjónustur.
                `,
              })}
            </Text>
          )}
        </Box>
      ))}
    </Box>
  )
}

export default MobileMenu
