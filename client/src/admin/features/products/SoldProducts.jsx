import useFetch from '@/hooks/useFetch'
import { FetchProvider } from '@/hooks/useFetchContext'
import React from 'react'

export default function SoldProducts() {
  const fetchSoldRequests = () => {
    useFetch('/products/filter', {
      body: {
        filter: {
          status: 'sold'
        }
      },
      method: 'POST'
    })
  }
  return (
    <FetchProvider request={fetchSoldRequests}>
      
    </FetchProvider >
  )
}
