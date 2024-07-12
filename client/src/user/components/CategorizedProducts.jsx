import React from 'react'
import { useProducts } from '@/contexts/ProductProvider'
import ProductCarousel from './ProductCarousel';
import { statusState } from '@/store/features/utils';
import { CarouselSkeleton } from '@/components/Skeleton';

export default function CategorizedProducts() {
          const { groupedProducts, products } = useProducts()
          if (products.status === statusState.loading) {
                    return (
                              <div className="my-6">
                                        <CarouselSkeleton />
                              </div>
                    )
          }
          return (
                    <div className='grid lg:grid-cols-2 gap-x-5 gap-y-3'>
                              {groupedProducts.length > 0 ? groupedProducts.map((item, index) =>
                              (
                                        <div key={index}>
                                                  <h2 className='product-heading text-xl'>{item.category}</h2>
                                                  <ProductCarousel products={item.products} className="text-base" />
                                        </div>
                              )
                              ) :
                                        <span className='text-sm'>No listed products yet</span>
                              }
                    </div>
          )
}
