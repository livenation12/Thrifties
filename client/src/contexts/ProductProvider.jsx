import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '@/store/features/product/categorySlice';
import { fetchConditions } from '@/store/features/product/conditionSlice';
import { fetchProductsData } from '@/store/features/product/productSlice';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
          const dispatch = useDispatch();
          const products = useSelector(state => state.products);
          const categories = useSelector(state => state.categories);
          const conditions = useSelector(state => state.conditions);

          useEffect(() => {
                    dispatch(fetchProductsData());
                    dispatch(fetchCategories());
                    dispatch(fetchConditions());
          }, [dispatch]);

          return (
                    <ProductContext.Provider value={{ products, categories, conditions }}>
                              {children}
                    </ProductContext.Provider>
          );
};

export const useProducts = () => useContext(ProductContext);
