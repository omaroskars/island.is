import { useQuery } from '@apollo/client'
import { Document, Query } from '@island.is/api/schema'
import { LIST_DOCUMENTS } from '../../lib/queries/listDocuments'
import uniqBy from 'lodash/uniqBy'

interface UseListDocumentsProps {
  data: {
    documents: Document[]
    categories: { label: string; value: string }[]
  }
  loading?: boolean
  error?: any
}

export const useListDocuments = (natReg: string): UseListDocumentsProps => {
  const { data, loading, error } = useQuery<Query>(LIST_DOCUMENTS)

  const documents = data?.listDocuments || []

  const allCategories = documents.map((document) => ({
    label: document.senderName,
    value: document.senderNatReg,
  }))
  // Note: Getting unique categories
  const categories = uniqBy(allCategories, (category) => category.value)
  return {
    data: { documents, categories },
    loading,
    error,
  }
}
