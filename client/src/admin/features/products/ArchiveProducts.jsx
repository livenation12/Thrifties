import React from 'react'
import { availableProductsColDef } from './data/columns'
import { useProducts } from '@/contexts/ProductProvider'
import ProductTable from './components/ProductTable'

export default function ArchiveProducts() {
          const { products } = useProducts()
          const archiveProducts = {
                    list:products.list.filter(product => product.status === "Archive"),
                    status: products.status
          }
          return (
                    <ProductTable columns={availableProductsColDef} data={archiveProducts} />
          )
}
