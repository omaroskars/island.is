import { useContext } from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'
import format from 'date-fns/format'
import is from 'date-fns/locale/is'
import en from 'date-fns/locale/en-US'

import { LocaleContext } from './LocaleContext'

export function useLocale() {
  const intl = useIntl()
  const contextValue = useContext(LocaleContext)
  const lang = contextValue === null ? null : contextValue.lang

  function formatMessage(
    descriptor: MessageDescriptor | string,
    values?: any,
  ): string {
    if (!descriptor || typeof descriptor === 'string')
      return descriptor as string

    return intl.formatMessage(descriptor, values)
  }

  function formatDateFns(date: string, str = 'dd MMM yyyy') {
    const locale = lang === 'en' ? en : is

    return format(new Date(date), str, { locale })
  }

  return {
    ...intl,
    formatMessage,
    formatDateFns,
    lang,
  }
}

export default useLocale
