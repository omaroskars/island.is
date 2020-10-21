import orderBy from 'lodash/orderBy'
import { Resolvers } from '../../types'
import { store } from './store'
import { getDatePrefix } from './utils'

export const resolvers: Resolvers = {
  Slice: {
    __resolveType: (parent) => {
      return parent.typename as never
    },
  },

  Query: {
    getArticleCategories: () => store.articleCategories,

    getArticles: (parent, args) => {
      return store.articles.filter(
        (article) => article.category?.slug === args.input.category,
      )
    },

    getSingleArticle: (parent, args) =>
      store.articles.find((article) => article.slug === args.input.slug) ||
      null,

    getMenu: () => store.menu,

    getAlertBanner: () => store.alertBanner,

    getNews: (parent, args) => {
      const datePrefix = getDatePrefix(args.input.year, args.input.month)
      const filtered = store.newsList.filter((news) =>
        news.date.startsWith(datePrefix),
      )
      const sorted = args.input.order === 'asc' ? filtered.reverse() : filtered
      const page = args.input.page || 1
      const perPage = args.input.size || 10
      const start = (page - 1) * perPage
      return {
        items: sorted.slice(start, start + perPage),
        total: filtered.length,
      }
    },

    getNewsDates: (parent, args) => {
      const yearsAndMonths = store.newsList.map((news) => news.date.slice(0, 7))
      const order = args.input.order === 'desc' ? 'desc' : 'asc'
      const unique = Array.from(new Set(yearsAndMonths))
      return orderBy(unique, [], order)
    },

    getSingleNews: (parent, args) =>
      store.newsList.find((news) => news.slug === args.input.slug) || null,

    getLifeEvents: () => store.lifeEvents,

    getLifeEventPage: (parent, args) =>
      store.lifeEvents.find(
        (lifeEvent) => lifeEvent.slug === args.input.slug,
      ) || null,

    getLifeEventsInCategory: (parent, args) => {
      return store.lifeEvents.filter(
        (lifeEvent) => lifeEvent.category?.slug === args.input.slug,
      )
    },

    getFrontpageSliderList: () => ({
      items: store.frontPageSliders,
    }),

    getHomepage: () => store.homepage,

    getNamespace: (parent, args) => {
      return {
        namespace: args.input.namespace || 'namespace',
        fields: '{}',
      }
    },
  },
}