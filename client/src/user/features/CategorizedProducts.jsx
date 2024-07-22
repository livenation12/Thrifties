import { useProducts } from '@/contexts/ProductProvider'
import React from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { ProductListSkeleton } from '@/components/Skeleton'
import { statusState } from '@/store/features/utils'
export default function CategorizedProducts() {
          const { category } = useParams()
          const { groupedProducts, products } = useProducts()
          if (products.status === statusState.loading) {
                    return <ProductListSkeleton />
          }
          const categoryProducts = groupedProducts.find(product => product.category === category.charAt(0).toUpperCase() + category.slice(1))
          const productItems = categoryProducts?.products || []
          return (
                    <div className='products-wrapper'>
                              {productItems.length > 0 ? (
                                        productItems.map(product => (
                                                  <ProductCard key={product._id} product={product} />
                                        )
                                        )
                              ) : <p className='empty-text'>No products in this category yet, Stay tuned!</p>}
                    </div>
          )
}
