import React from 'react'

import { useProducts } from '@/contexts/ProductProvider';
import ProductCarousel from './ProductCarousel';
import { statusState } from '@/store/features/utils';
import { CarouselSkeleton } from '@/components/Skeleton';

export default function NewProductCarousel() {
          const { newProducts, products } = useProducts();
          if (products.status === statusState.loading) {
                    return (
                              <div className='my-6'>
                                        <CarouselSkeleton />
                              </div>
                    )
          }

          return (
                    <div className='my-6'>
                              <h2 className='product-heading'>New Products</h2>
                              {newProducts.length > 0 ?
                                        <ProductCarousel products={newProducts} className="text-xl" />
                                        :
                                        <div className='h-[100px] justify-center flex items-center'>No new products yet, Stay tune!</div>
                              }
                    </div>
          )
}
