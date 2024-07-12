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

          const productsData = useMemo(() => ({
                    products,
                    categories,
                    conditions,
                    groupedProducts: groupProductsByCategory(products.list),
                    newProducts: newProducts(products.list)
          }), [products, categories, conditions, dispatch])

          useEffect(() => {
                    dispatch(fetchProductsData());
                    dispatch(fetchCategories());
                    dispatch(fetchConditions());
          }, [dispatch]);

          return (
                    <ProductContext.Provider value={productsData}>
                              {children}
                    </ProductContext.Provider>
          );
};

export const useProducts = () => useContext(ProductContext);


const groupProductsByCategory = (products) => {
          const filterAvailable = products.filter(product => product.status === "Available")
          const groupedByCategory = filterAvailable.reduce((acc, product) => {
                    const { category, ...rest } = product;
                    if (!acc[category]) {
                              acc[category] = {
                                        category,
                                        products: []
                              };
                    }
                    acc[category].products.push({ category, ...rest });
                    return acc;
          }, {});

          return Object.values(groupedByCategory);
};


const newProducts = (products) => {
          // Get the current date
          const currentDate = new Date();

          // Calculate the date 7 days ago
          const lastWeekDate = new Date();
          lastWeekDate.setDate(currentDate.getDate() - 7);

          return products.filter(product => {
                    // Check if the product is available and created within the last week
                    return product.status === "Available" && new Date(product.createdAt) >= lastWeekDate;
          });
}
