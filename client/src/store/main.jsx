import { configureStore } from '@reduxjs/toolkit'
import productSlice from './features/product/productSlice'
import categorySlice from './features/product/categorySlice'
import conditionSlice from './features/product/conditionSlice'
import userSlice from './features/user/userSlice'
export default configureStore({
          reducer: {
                    products: productSlice,
                    categories: categorySlice,
                    conditions: conditionSlice,
                    users: userSlice
          }
})