import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  BreadcrumbsDeprecated as Breadcrumbs,
  Box,
  Tag,
} from '@island.is/island-ui/core'
import { ServicePortalNavigationItem } from '@island.is/service-portal/core'
import useNavigation from '../../hooks/useNavigation/useNavigation'
import { useLocale } from '@island.is/localization'

const reduce = (
  f: (
    acc: ServicePortalNavigationItem[],
    n: ServicePortalNavigationItem,
  ) => ServicePortalNavigationItem[],
  tree: ServicePortalNavigationItem,
  acc: ServicePortalNavigationItem[],
): ServicePortalNavigationItem[] => {
  const { children } = tree
  const newAcc = f(acc, tree)

  if (!children) return newAcc
  return children.reduce((iAcc, n) => reduce(f, n, iAcc), newAcc)
}

const ContentBreadcrumbs: FC<{}> = () => {
  const navigation = useNavigation()
  const location = useLocation()
  const { formatMessage } = useLocale()
  const items: ServicePortalNavigationItem[] = reduce(
    (acc, n) => {
      if (n.path && location.pathname.includes(n.path)) return [...acc, n]
      else return acc
    },
    {
      name: 'root',
      children: navigation,
    },
    [] as ServicePortalNavigationItem[],
  )

  if (items.length < 2) return null

  return (
    <Box paddingTop={[0, 3]} paddingBottom={[2, 3]}>
      <Breadcrumbs color="purple400" separatorColor="purple400">
        {items.map((item, index) =>
          item.path !== undefined ? (
            index === items.length - 1 ? (
              <Tag key={index} variant="purple" outlined>
                {formatMessage(item.name)}
              </Tag>
            ) : (
              <Link key={index} to={item.path}>
                {formatMessage(item.name)}
              </Link>
            )
          ) : null,
        )}
      </Breadcrumbs>
    </Box>
  )
}

export default ContentBreadcrumbs
