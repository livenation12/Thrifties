import React, { useCallback } from 'react'
import { useProducts } from '@/contexts/ProductProvider';
import ProductCard from '../components/ProductCard';
import { statusState } from '@/store/features/utils';
import { ProductListSkeleton } from '@/components/Skeleton';
import { Outlet } from 'react-router-dom';
export default function NewProducts() {
          const { newProducts, products } = useProducts();
          if (products.status === statusState.loading)
                    return <ProductListSkeleton />

          const renderNewProducts = useCallback(() => {
                    if (!newProducts || newProducts.length === 0) return (
                              <div className="empty-text">No new products yet, Stay tune for future updates!</div>
                    )
                    return newProducts.map((newProduct, index) => <ProductCard product={newProduct} key={index} />);
          }, [newProducts]);
          return (
                    <>
                              <Outlet />
                              <div className='products-wrapper'>
                                        {renderNewProducts()}
                              </div>
                    </>
          )
}

