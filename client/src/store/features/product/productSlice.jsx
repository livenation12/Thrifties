import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from '@/hooks/useFetch'; // Ensure this is a function that fetches data correctly
import { handleAsyncThunk } from '../utils';
// Async thunk to fetch products data

export const fetchProductsData = createAsyncThunk('products/fetchData', async () => {
          return await useFetch('/products', {});
});

// Async thunk to create a new product
export const createProduct = createAsyncThunk('products/createData', async (payload) => {
          return await useFetch('/products', {
                    body: payload,
                    method: 'POST'
          });
});

const initialState = {
          list: [],
          status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
          error: null,
};


// Create the product slice using createSlice
const productSlice = createSlice({
          name: 'products',
          initialState,
          reducers: {
                    // Define synchronous reducers here if needed
          },
          extraReducers: (builder) => {
                    handleAsyncThunk(builder, fetchProductsData)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {
                                        state.list = action.payload; // Replace current products with fetched data
                              });
                    handleAsyncThunk(builder, createProduct)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {
                                        state.list.push(action.payload)
                              })
          },
});

export default productSlice.reducer;
