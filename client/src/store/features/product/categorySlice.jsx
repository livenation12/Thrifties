import useFetch from "@/hooks/useFetch";
import { handleAsyncThunk } from "../utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addCategory = createAsyncThunk('category/Add', async (payload) => {
          return await useFetch()
})

export const fetchCategories = createAsyncThunk('categories/Fetch', async () => {
          return await useFetch('/categories', {})
})

export const updateCategoriesById = createAsyncThunk('category/UpdateById', async (id, payload) => {
          return await useFetch(`/categories/${id}`, {
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
          name: 'categories',
          initialState,
          reducers: {

          },
          extraReducers: builder => {
                    handleAsyncThunk(builder, fetchCategories)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {
                                        state.list = action.payload
                              })
          }
})

export default categorySlice.reducer