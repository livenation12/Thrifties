import React from 'react'

import DataTable from '@/components/DataTable'
import { availableProductsColDef } from './data/columns'
import { useProducts } from '@/contexts/ProductProvider'

export default function AvailableProducts() {
          const { products } = useProducts()

          const availableProducts = products.list.filter(product => product.status === "Available")
          return (
                    <DataTable columns={availableProductsColDef} data={availableProducts} showSelectedRows={true} />
          )
}
