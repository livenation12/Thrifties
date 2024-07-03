import DataTable from '@/components/DataTable'
import React from 'react'
import { useSelector } from 'react-redux'
import { availableProductsColDef } from './data/columns'

export default function ArchiveProducts() {
          const { products, status, error } = useSelector(state => state.products)
          const archiveProducts = products.filter(product => product.status === "Archive")
          return (
                    <DataTable columns={availableProductsColDef} data={archiveProducts} />
          )
}
