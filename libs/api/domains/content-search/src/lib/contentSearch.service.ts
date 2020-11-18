import { Injectable } from '@nestjs/common'
import {
  ElasticService,
  TagAggregationResponse,
} from '@island.is/content-search-toolkit'
import { logger } from '@island.is/logging'
import { SearchResult } from './models/searchResult.model'
import { WebSearchAutocomplete } from './models/webSearchAutocomplete.model'
import { TagCount } from './models/tagCount'
import { SearchIndexes } from '@island.is/content-search-indexer/types'
import { SearcherInput } from './dto/searcher.input'
import { WebSearchAutocompleteInput } from './dto/webSearchAutocomplete.input'

@Injectable()
export class ContentSearchService {
  constructor(private elasticService: ElasticService) {}

  private getIndex(lang: keyof typeof SearchIndexes) {
    return SearchIndexes[lang] ?? SearchIndexes.is
  }

  mapFindAggregations(aggregations: TagAggregationResponse): TagCount[] {
    if (!aggregations?.group) {
      return null
    }
    return aggregations.group.filtered.count.buckets.map<TagCount>(
      (tagObject) => ({
        key: tagObject.key,
        count: tagObject.doc_count.toString(),
        value: tagObject.value.buckets?.[0]?.key ?? '', // value of tag is allways the first value here we provide default value since value is optional
      }),
    )
  }

  async find(query: SearcherInput): Promise<SearchResult> {
    const { body } = await this.elasticService.search(
      this.getIndex(query.language),
      query,
    )

    return {
      total: body.hits.total.value,
      // we map data when it goes into the index we can return it without mapping it here
      items: body.hits.hits.map((item) => JSON.parse(item._source.response)),
      tagCounts: this.mapFindAggregations(body.aggregations),
    }
  }

  async fetchAutocompleteTerm(
    input: WebSearchAutocompleteInput,
  ): Promise<WebSearchAutocomplete> {
    logger.info('search index', {
      lang: input.language,
      index: this.getIndex(input.language),
    })
    const {
      suggest: { searchSuggester },
    } = await this.elasticService.fetchAutocompleteTerm(
      this.getIndex(input.language),
      {
        ...input,
        singleTerm: input.singleTerm.trim(),
      },
    )

    // we always handle just one terms at a time so we return results for first term
    const firstWordSuggestions = searchSuggester[0].options

    return {
      total: firstWordSuggestions.length,
      completions: firstWordSuggestions.map(
        (suggestionObjects) => suggestionObjects.text,
      ),
    }
  }
}
