import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleAsyncThunk } from "../utils";
import useFetch from "@/hooks/useFetch";

export const addToBag = createAsyncThunk('bag/add', async (payload, { rejectWithValue }) => {
          try {
                    const response = await useFetch('/bags', {
                              body: payload,
                              method: 'POST'
                    })
                    return response.data
          } catch (error) {
                    return rejectWithValue(error.message)
          }
})
export const removeFromBag = createAsyncThunk('bag/remove', async (productId, { rejectWithValue }) => {
          try {
                    const response = await useFetch(`/bags/${productId}`, {
                              method: 'DELETE'
                    })
                    return response.data
          } catch (error) {
                    return rejectWithValue(error.message)
          }
})

export const fetchUserBag = createAsyncThunk('bag/fetch', async (userId, { rejectWithValue }) => {
          try {
                    const response = await useFetch(`/bags/${userId}`, {})
                    return response.data
          } catch (error) {
                    return rejectWithValue(error.message)
          }
})

const initialState = {
          list: [],
          totalCheckout: 0,
          checkoutItemIds: [],
          status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
          error: null,
}

const bagSlice = createSlice({
          name: 'bag',
          initialState,
          reducers: {
                    // // Define synchronous reducers here if neededsa
                    clearBag: (state, action) => {
                              state.list = []
                    },
                    addToTotal: (state, action) => {
                              state.totalCheckout += action.payload
                              state.checkoutItemIds.push(action.payload)
                    },
                    removeToTotal: (state, action) => {
                              state.totalCheckout -= action.payload
                              state.checkoutItemIds = state.checkoutItems.filter(item => item !== action.payload)
                    }

          },
          extraReducers: (builder) => {
                    // Define asynchronous reducers here if needed
                    handleAsyncThunk(builder, addToBag)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {
                                        state.list.push(action.payload.data)
                              })
                    handleAsyncThunk(builder, removeFromBag)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {
                                        state.list = state.list.filter(item => item._id !== action.payload.deletedId)
                              })
                    handleAsyncThunk(builder, fetchUserBag)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {
                                        state.list = action.payload
                              })
          }
})

export const { clearBag, addToTotal, removeToTotal } = bagSlice.actions
export default bagSlice.reducer