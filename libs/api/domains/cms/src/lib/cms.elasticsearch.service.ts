import { Injectable } from '@nestjs/common'
import {
  dateResolution,
  ElasticService,
  sortDirection,
} from '@island.is/content-search-toolkit'
import { ArticleCategory } from './models/articleCategory.model'
import { Article } from './models/article.model'
import { News } from './models/news.model'
import { GetNewsInput } from './dto/getNews.input'
import { GetArticlesInput } from './dto/getArticles.input'
import { NewsList } from './models/newsList.model'
import { GetNewsDatesInput } from './dto/getNewsDates.input'
import { SearchIndexes } from '@island.is/content-search-indexer/types'

@Injectable()
export class CmsElasticsearchService {
  constructor(private elasticService: ElasticService) {}

  async getArticleCategories(
    index: SearchIndexes,
    { size }: { size?: number },
  ): Promise<ArticleCategory[]> {
    const query = {
      types: ['webArticleCategory'],
      sort: { 'title.sort': 'asc' as sortDirection },
      size,
    }
    const categoryResponse = await this.elasticService.getDocumentsByMetaData(
      index,
      query,
    )

    return categoryResponse.hits.hits.map<ArticleCategory>((response) =>
      JSON.parse(response._source.response),
    )
  }

  async getArticles(
    index: SearchIndexes,
    { category, size }: GetArticlesInput,
  ): Promise<Article[]> {
    const query = {
      types: ['webArticle'],
      tags: [{ type: 'category', key: category }],
      sort: { 'title.sort': 'asc' as sortDirection },
      size,
    }

    const articlesResponse = await this.elasticService.getDocumentsByMetaData(
      index,
      query,
    )
    return articlesResponse.hits.hits.map<Article>((response) =>
      JSON.parse(response._source.response),
    )
  }

  async getNews(
    index: SearchIndexes,
    { size, page, order, month, year, tag }: GetNewsInput,
  ): Promise<NewsList> {
    let dateQuery
    if (year) {
      dateQuery = {
        date: {
          from: `${year}-${month?.toString().padStart(2, '0') ?? '01'}-01`, // create a date with the format YYYY-MM-DD
          to: `${year}-${month?.toString().padStart(2, '0') ?? '12'}-31`, // create a date with the format YYYY-MM-DD
        },
      }
    } else {
      dateQuery = {}
    }

    let tagQuery
    if (tag) {
      tagQuery = {
        tags: [
          {
            key: tag,
            type: 'genericTag',
          },
        ],
      }
    }

    const query = {
      types: ['webNews'],
      sort: { dateCreated: order as sortDirection },
      ...dateQuery,
      ...tagQuery,
      page,
      size,
    }

    const articlesResponse = await this.elasticService.getDocumentsByMetaData(
      index,
      query,
    )

    return {
      total: articlesResponse.hits.total.value,
      items: articlesResponse.hits.hits.map<News>((response) =>
        JSON.parse(response._source.response),
      ),
    }
  }

  async getNewsDates(
    index: SearchIndexes,
    { order, tag }: GetNewsDatesInput,
  ): Promise<string[]> {
    let tagQuery
    if (tag) {
      tagQuery = {
        tags: [
          {
            key: tag,
            type: 'genericTag',
          },
        ],
      }
    }

    const query = {
      types: ['webNews'],
      field: 'dateCreated',
      resolution: 'month' as dateResolution,
      ...tagQuery,
      order,
    }

    const newsDatesResponse = await this.elasticService.getDateAggregation(
      index,
      query,
    )

    // we return dates as array of strings on the format y-M
    return newsDatesResponse.aggregations.dates.buckets.map(
      (aggregationResult) => aggregationResult.key_as_string,
    )
  }

  async getSingleDocumentTypeBySlug<RequestedType>(
    index: SearchIndexes,
    { type, slug }: { type: string; slug: string },
  ): Promise<RequestedType | null> {
    // return a single news item by slug
    const query = { types: [type], tags: [{ type: 'slug', key: slug }] }
    const newsResponse = await this.elasticService.getDocumentsByMetaData(
      index,
      query,
    )
    const response = newsResponse.hits.hits?.[0]?._source?.response
    if (response) {
      return JSON.parse(response)
    } else {
      return null
    }
  }
}
