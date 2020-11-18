import React, { useState, useCallback } from 'react'
import {
  Text,
  Box,
  Stack,
  Columns,
  Column,
  Button,
  Select,
  Pagination,
  Option,
  DatePicker,
  Input,
} from '@island.is/island-ui/core'
import { useListDocuments } from '@island.is/service-portal/graphql'
import {
  useScrollTopOnUpdate,
  ServicePortalModuleComponent,
} from '@island.is/service-portal/core'
import { ActionCardLoader } from '@island.is/service-portal/core'
import { Document } from '@island.is/api/schema'
import { useLocale, useNamespaces } from '@island.is/localization'
import isAfter from 'date-fns/isAfter'
import subYears from 'date-fns/subYears'
import startOfTomorrow from 'date-fns/startOfTomorrow'
import isWithinInterval from 'date-fns/isWithinInterval'
import isEqual from 'lodash/isEqual'
import { ValueType } from 'react-select'
import DocumentCard from '../../components/DocumentCard/DocumentCard'
import { defineMessage } from 'react-intl'

const defaultCategory = { label: 'Allar stofnanir', value: '' }
const pageSize = 6
const defaultStartDate = new Date('2000-01-01')
const defaultEndDate = startOfTomorrow()

// type FuseItem = {
//   item: Document
//   refIndex: number
// }

const defaultFilterValues = {
  dateFrom: defaultStartDate,
  dateTo: defaultEndDate,
  activeCategory: defaultCategory,
  searchQuery: '',
}

const defaultSearchOptions = {
  threshold: 0.3,
  keys: ['senderName', 'senderNatReg', 'sender', 'subject'],
}

type FilterValues = {
  dateFrom: Date
  dateTo: Date
  activeCategory: Option
  searchQuery: string
}

const getFilteredDocuments = (
  documents: Document[],
  filterValues: FilterValues,
): Document[] => {
  const { dateFrom, dateTo, activeCategory, searchQuery } = filterValues
  let filteredDocuments = documents.filter((document) =>
    isWithinInterval(new Date(document.date), {
      start: dateFrom || defaultStartDate,
      end: dateTo || defaultEndDate,
    }),
  )

  if (activeCategory.value) {
    filteredDocuments = filteredDocuments.filter(
      (document) => document.senderNatReg === activeCategory.value,
    )
  }

  // if (searchQuery) {
  //   const fuse = new Fuse(filteredDocuments, defaultSearchOptions)
  //   return fuse.search(searchQuery).map((elem) => {
  //     // const fuseItem = (elem as unknown) as FuseItem
  //     // return fuseItem.item
  //     return elem.item
  //   })
  // }
  if (searchQuery) {
    return filteredDocuments.filter((x) =>
      x.subject.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  return filteredDocuments
}

export const ServicePortalDocuments: ServicePortalModuleComponent = ({
  userInfo,
}) => {
  useNamespaces('sp.documents')
  const { formatMessage, lang } = useLocale()
  const [page, setPage] = useState(1)
  useScrollTopOnUpdate([page])

  const [filterValue, setFilterValue] = useState<FilterValues>(
    defaultFilterValues,
  )
  const { data, loading, error } = useListDocuments(userInfo.profile.nationalId)

  const categories = [defaultCategory, ...data.categories]
  const filteredDocuments = getFilteredDocuments(data.documents, filterValue)
  const pagedDocuments = {
    from: (page - 1) * pageSize,
    to: pageSize * page,
    totalPages: Math.ceil(filteredDocuments.length / pageSize),
  }
  const handleDateFromInput = useCallback((value: Date) => {
    setPage(1)
    setFilterValue((oldState) => {
      const { dateTo } = oldState
      return {
        ...oldState,
        dateTo: dateTo ? (isAfter(value, dateTo) ? value : dateTo) : dateTo,
        dateFrom: value,
      }
    })
  }, [])

  const handleDateToInput = useCallback((value: Date) => {
    setPage(1)
    setFilterValue((oldState) => ({
      ...oldState,
      dateTo: value,
    }))
  }, [])

  const handlePageChange = useCallback((page: number) => setPage(page), [])
  const handleCategoryChange = useCallback((newCategory: ValueType<Option>) => {
    setPage(1)
    setFilterValue((oldFilter) => ({
      ...oldFilter,
      activeCategory: newCategory as Option,
    }))
  }, [])

  const handleSearchChange = useCallback((value: string) => {
    setPage(1)
    setFilterValue({ ...defaultFilterValues, searchQuery: value })
  }, [])

  const handleClearFilters = useCallback(() => {
    setPage(1)
    setFilterValue({ ...defaultFilterValues })
  }, [])

  const hasActiveFilters = () => !isEqual(filterValue, defaultFilterValues)

  const documentsFoundText = () => {
    // default text format, singular & plural
    let foundText =
      filteredDocuments.length === 1
        ? defineMessage({
            id: 'sp.documents:found-singular',
            defaultMessage: 'skjal fannst',
          })
        : defineMessage({
            id: 'sp.documents:found',
            defaultMessage: 'skjöl fundust',
          })

    // Handling edge case if lang is IS and documents.length is greater than 11 and ends with 1.
    if (
      lang === 'is' &&
      filteredDocuments.length > 11 &&
      filteredDocuments.length % 10 === 1
    ) {
      foundText = defineMessage({
        id: 'sp.documents:found-singular',
        defaultMessage: 'skjal fannst',
      })
    }
    return foundText
  }

  return (
    <Box marginBottom={[4, 4, 6, 10]}>
      <Stack space={3}>
        <Text variant="h1" as="h1">
          {formatMessage({
            id: 'sp.documents:title',
            defaultMessage: 'Rafræn skjöl',
          })}
        </Text>
        <Columns collapseBelow="sm">
          <Column width="7/12">
            <Text variant="intro">
              {formatMessage({
                id: 'sp.documents:intro',
                defaultMessage:
                  'Hér munt þú geta fundið öll þau skjöl sem eru send til þín frá stofnunum ríkisins',
              })}
            </Text>
          </Column>
        </Columns>
        <Box marginTop={[1, 1, 2, 2, 6]}>
          <Stack space={2}>
            <div>
              <Stack space={3}>
                <Box height="full">
                  <Input
                    value={filterValue.searchQuery}
                    onChange={(ev) => handleSearchChange(ev.target.value)}
                    name="rafraen-skjol-leit"
                    placeholder={formatMessage({
                      id: 'sp.documents:search-placeholder',
                      defaultMessage: 'Leitaðu af rafrænu skjali',
                    })}
                  />
                </Box>
                <Box>
                  <Select
                    name="categories"
                    defaultValue={categories[0]}
                    options={categories}
                    value={filterValue.activeCategory}
                    onChange={handleCategoryChange}
                    label={formatMessage({
                      id: 'sp.documents:institution-label',
                      defaultMessage: 'Stofnun',
                    })}
                  />
                </Box>
                <Columns space={2} collapseBelow="md">
                  <Column width="6/12">
                    <DatePicker
                      label={formatMessage({
                        id: 'sp.documents:datepicker-dateFrom-label',
                        defaultMessage: 'Dagsetning frá',
                      })}
                      placeholderText={formatMessage({
                        id: 'sp.documents:datepicker-dateFrom-placeholder',
                        defaultMessage: 'Veldu dagsetningu',
                      })}
                      locale="is"
                      selected={filterValue.dateFrom}
                      handleChange={handleDateFromInput}
                    />
                  </Column>
                  <Column width="6/12">
                    <DatePicker
                      label={formatMessage({
                        id: 'sp.documents:datepicker-dateTo-label',
                        defaultMessage: 'Dagsetning til',
                      })}
                      placeholderText={formatMessage({
                        id: 'sp.documents:datepicker-dateTo-placeholder',
                        defaultMessage: 'Veldu dagsetningu',
                      })}
                      locale="is"
                      selected={filterValue.dateTo}
                      handleChange={handleDateToInput}
                      minDate={filterValue.dateFrom || undefined}
                    />
                  </Column>
                </Columns>
                <Box marginTop="gutter">
                  {hasActiveFilters() && (
                    <Columns space={3}>
                      <Column>
                        <Text variant="h3">{`${
                          filteredDocuments.length
                        } ${formatMessage(documentsFoundText())}`}</Text>
                      </Column>
                      <Column width="content">
                        <Button variant="text" onClick={handleClearFilters}>
                          {formatMessage({
                            id: 'sp.documents:clear-filters',
                            defaultMessage: 'Hreinsa filter',
                          })}
                        </Button>
                      </Column>
                    </Columns>
                  )}
                </Box>
              </Stack>
            </div>
            {loading && <ActionCardLoader repeat={3} />}
            {error && (
              <Box display="flex" justifyContent="center" margin={[3, 3, 3, 6]}>
                <Text variant="h3">
                  {formatMessage({
                    id: 'sp.documents:error',
                    defaultMessage:
                      'Tókst ekki að sækja rafræn skjöl, eitthvað fór úrskeiðis',
                  })}
                </Text>
              </Box>
            )}
            {!loading && !error && filteredDocuments?.length === 0 && (
              <Box display="flex" justifyContent="center" margin={[3, 3, 3, 6]}>
                <Text variant="h3">
                  {formatMessage({
                    id: 'sp.documents:not-found',
                    defaultMessage:
                      'Engin skjöl fundust fyrir gefin leitarskilyrði',
                  })}
                </Text>
              </Box>
            )}
            {filteredDocuments
              ?.slice(pagedDocuments.from, pagedDocuments.to)
              .map((document) => (
                <DocumentCard key={document.id} document={document} />
              ))}
            {filteredDocuments && filteredDocuments.length > pageSize && (
              <Pagination
                page={page}
                totalPages={pagedDocuments.totalPages}
                renderLink={(page, className, children) => (
                  <button
                    className={className}
                    onClick={handlePageChange.bind(null, page)}
                  >
                    {children}
                  </button>
                )}
              />
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default ServicePortalDocuments
