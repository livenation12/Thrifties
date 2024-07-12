import React from 'react'
import { availableProductsColDef } from './data/columns'
import { useProducts } from '@/contexts/ProductProvider'
import ProductTable from './components/ProductTable'

export default function AvailableProducts() {
          const { products } = useProducts()

          const availableProducts = {
                    list: products.list.filter(product => product.status === "Available"),
                    status: products.status
          }
          return (
                    <ProductTable columns={availableProductsColDef} data={availableProducts} showSelectedRows={true} />
          )
}
