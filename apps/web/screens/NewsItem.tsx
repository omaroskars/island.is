/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {
  Text,
  Breadcrumbs,
  BreadCrumbItem,
  Box,
  GridRow,
  GridColumn,
  Stack,
  GridContainer,
} from '@island.is/island-ui/core'
import { Image, Slice as SliceType } from '@island.is/island-ui/contentful'
import { Screen } from '@island.is/web/types'
import { useI18n } from '@island.is/web/i18n'
import { useDateUtils } from '@island.is/web/i18n/useDateUtils'
import {
  GET_NAMESPACE_QUERY,
  GET_SINGLE_NEWS_ITEM_QUERY,
} from '@island.is/web/screens/queries'
import { withMainLayout } from '@island.is/web/layouts/main'
import useContentfulId from '@island.is/web/hooks/useContentfulId'
import {
  ContentLanguage,
  GetSingleNewsItemQuery,
  QueryGetSingleNewsArgs,
  QueryGetNamespaceArgs,
  GetNamespaceQuery,
} from '@island.is/web/graphql/schema'
import {
  SidebarBox,
  Sticky,
  HeadWithSocialSharing,
  Main,
  RichText,
} from '@island.is/web/components'
import { useNamespace } from '@island.is/web/hooks'
import { LinkType, useLinkResolver } from '../hooks/useLinkResolver'
import NextLink from 'next/link'

interface NewsItemProps {
  newsItem: GetSingleNewsItemQuery['getSingleNews']
  namespace: GetNamespaceQuery['getNamespace']
}

const NewsItem: Screen<NewsItemProps> = ({ newsItem, namespace }) => {
  useContentfulId(newsItem?.id)
  const { t } = useI18n()
  const { linkResolver } = useLinkResolver()
  const { format } = useDateUtils()
  const n = useNamespace(namespace)

  const metaTitle = `${newsItem.title} | Ísland.is`

  const breadCrumbs: BreadCrumbItem[] = [
    {
      title: 'Ísland.is',
      typename: 'homepage',
      href: '/',
    },
    {
      title: t.newsAndAnnouncements,
      typename: 'newsoverview',
      href: '/',
    },
  ]
  const breadCrumbTags: BreadCrumbItem[] =
    !!newsItem.genericTags.length &&
    newsItem.genericTags.map(({ id, title }) => {
      return {
        isTag: true,
        title: title,
        typename: 'newsoverview',
        slug: [`?tag=${id}`],
      }
    })

  return (
    <>
      <HeadWithSocialSharing
        title={metaTitle}
        description={newsItem.intro}
        imageUrl={newsItem.image?.url}
        imageWidth={newsItem.image?.width.toString()}
        imageHeight={newsItem.image?.height.toString()}
      />
      <GridContainer>
        <Box paddingTop={[2, 2, 10]} paddingBottom={[0, 0, 10]}>
          <GridRow>
            <GridColumn span={['12/12', '12/12', '8/12', '8/12', '9/12']}>
              <Main>
                <GridRow>
                  <GridColumn
                    offset={['0', '0', '0', '0', '1/9']}
                    span={['9/9', '9/9', '9/9', '9/9', '7/9']}
                  >
                    <Breadcrumbs
                      items={
                        breadCrumbTags
                          ? breadCrumbs.concat(breadCrumbTags)
                          : breadCrumbs
                      }
                      renderLink={(link, { typename, slug }) => {
                        return (
                          <NextLink
                            {...linkResolver(typename as LinkType, slug)}
                            passHref
                          >
                            {link}
                          </NextLink>
                        )
                      }}
                    />

                    <Text variant="h1" as="h1" paddingTop={1} paddingBottom={2}>
                      {newsItem.title}
                    </Text>
                    <Text variant="intro" as="p" paddingBottom={2}>
                      {newsItem.intro}
                    </Text>
                    {Boolean(newsItem.image) && (
                      <Box paddingY={2}>
                        <Image
                          {...newsItem.image}
                          url={newsItem.image.url + '?w=774&fm=webp&q=80'}
                          thumbnail={newsItem.image.url + '?w=50&fm=webp&q=80'}
                        />
                      </Box>
                    )}
                    <Box paddingBottom={4} width="full">
                      <RichText
                        body={newsItem.content as SliceType[]}
                        config={{ defaultPadding: [2, 2, 4] }}
                      />
                    </Box>
                  </GridColumn>
                </GridRow>
              </Main>
            </GridColumn>
            <GridColumn span={['12/12', '12/12', '4/12', '4/12', '3/12']}>
              <Sticky>
                <SidebarBox>
                  <Stack space={3}>
                    {Boolean(newsItem.author) && (
                      <Stack space={1}>
                        <Text variant="eyebrow" as="p" color="blue400">
                          {n('author', 'Höfundur')}
                        </Text>
                        <Text variant="h5" as="p">
                          {newsItem.author.name}
                        </Text>
                      </Stack>
                    )}
                    {Boolean(newsItem.date) && (
                      <Stack space={1}>
                        <Text variant="eyebrow" as="p" color="blue400">
                          {n('published', 'Birt')}
                        </Text>
                        <Text variant="h5" as="p">
                          {format(new Date(newsItem.date), 'do MMMM yyyy')}
                        </Text>
                      </Stack>
                    )}
                  </Stack>
                </SidebarBox>
              </Sticky>
            </GridColumn>
          </GridRow>
        </Box>
      </GridContainer>
    </>
  )
}

NewsItem.getInitialProps = async ({ apolloClient, locale, query }) => {
  const [
    {
      data: { getSingleNews: newsItem },
    },

    namespace,
  ] = await Promise.all([
    apolloClient.query<GetSingleNewsItemQuery, QueryGetSingleNewsArgs>({
      query: GET_SINGLE_NEWS_ITEM_QUERY,
      variables: {
        input: {
          slug: query.slug as string,
          lang: locale as ContentLanguage,
        },
      },
    }),

    apolloClient
      .query<GetNamespaceQuery, QueryGetNamespaceArgs>({
        query: GET_NAMESPACE_QUERY,
        variables: {
          input: {
            lang: locale as ContentLanguage,
            namespace: 'Newspages',
          },
        },
      })
      .then((variables) => {
        // map data here to reduce data processing in component
        return JSON.parse(variables.data.getNamespace.fields)
      }),
  ])

  return {
    newsItem,
    namespace,
  }
}

export default withMainLayout(NewsItem)
