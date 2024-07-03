import useFetch from "@/hooks/useFetch";
import { handleAsyncThunk } from "../utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addCategory = createAsyncThunk('category/Add', async (payload) => {
          return await useFetch()
})

export const fetchConditions = createAsyncThunk('conditions/Fetch', async () => {
          return await useFetch('/conditions', {})
})

export const updateConditionsById = createAsyncThunk('condition/UpdateById', async (id, payload) => {
          return await useFetch(`/conditions/${id}`, {
                    body: payload,
                    method: "PATCH"
          })
})

const initialState = {
          list: [],
          status: "idle",
          error: null
}

const categorySlice = createSlice({
          name: 'conditions',
          initialState,
          reducers: {

          },
          extraReducers: builder => {
                    handleAsyncThunk(builder, fetchConditions)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {
                                        state.list = action.payload
                              })
          }
})

export default categorySlice.reducer