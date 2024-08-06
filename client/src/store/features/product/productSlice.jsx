import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from '@/hooks/useFetch'; // Ensure this is a function that fetches data correctly
import { handleAsyncThunk } from '../utils';
// Async thunk to fetch products data

export const fetchProductsData = createAsyncThunk('products/fetchData', async () => {
          return await useFetch('/products', {});
});

// Async thunk to create a new product
export const createProduct = createAsyncThunk('products/createData', async (payload, { dispatch, rejectWithValue }) => {
          try {
                    const create = await useFetch('/products', {
                              body: payload,
                              method: 'POST'
                    });
                    if (create) {
                              dispatch(fetchProductsData())
                              return create;
                    }

          } catch (error) {
                    return rejectWithValue(error.message)
          }
});
export const applyDiscount = createAsyncThunk('products/applyDiscount', async (payload, { dispatch, rejectWithValue }) => {
          try {
                    const discount = await useFetch('/products/discount', {
                              body: payload,
                              method: 'PUT'
                    })
                    if (discount) {
                              dispatch(fetchProductsData())
                              return discount;
                    }
          } catch (error) {
                    return rejectWithValue(error.message)

          }
})

export const updateProductStatus = createAsyncThunk('products/updateData', async (payload, { dispatch }) => {
          const response = await useFetch('/products/status', {
                    method: "PUT",
                    body: payload
          });
          dispatch(fetchProductsData()); // Trigger refetch after update
          return response;
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
                                        state.list = action.payload.data; // Replace current products with fetched data
                              });
                    handleAsyncThunk(builder, createProduct)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {
                                        // state.list = [...state.list, ...action.payload]

                              })
                    handleAsyncThunk(builder, updateProductStatus)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {

                              })
                    handleAsyncThunk(builder, applyDiscount)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {

                              })
          },
});

export default productSlice.reducer;
