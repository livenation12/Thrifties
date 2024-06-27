import useFetch from '@/hooks/useFetch'
import React from 'react'

import DataTable from '@/components/DataTable'
import { availableProductsColDef } from './data/columns'
import { useLoaderData } from 'react-router-dom'

export async function AvailableProductsLoader() {
          return await useFetch('/products/filter', {
                    body: {
                              filter: {
                                        status: 'Available'
                              }
                    },
                    method: 'POST'
          })
}

export default function AvailableProducts() {
          const data = useLoaderData()

          return (
                    <DataTable columns={availableProductsColDef} data={data} />
          )
}
