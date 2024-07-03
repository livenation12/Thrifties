import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsData } from '@/redux/features/product/productSlice';

const Sample = () => {
          const dispatch = useDispatch();
          const { products, status, error } = useSelector((state) => state.products);
          console.log(products);
          useEffect(() => {
                    dispatch(fetchProductsData());
          }, [dispatch]);

          if (status === 'loading') {
                    return <div>Loading...</div>;
          }

          if (status === 'failed') {
                    return <div>Error: {error}</div>;
          }

          return (
                    <div>
                              {products.map((product, index) => (
                                        <div key={index}>{product.name}</div>
                              ))}
                    </div>
          );
};

export default Sample;
