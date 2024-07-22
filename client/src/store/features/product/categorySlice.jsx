import useFetch from "@/hooks/useFetch";
import { handleAsyncThunk } from "../utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addCategory = createAsyncThunk('category/Add', async (payload, { rejectWithValue }) => {
          try {
                    const response = await useFetch('/categories', { method: "POST", body: payload });
                    return response.data;
          } catch (error) {
                    return rejectWithValue(error.message);
          }
});

export const fetchCategories = createAsyncThunk('categories/fetch', async (_, { rejectWithValue }) => {
          try {
                    const response = await useFetch('/categories', {});
                    return response.data;
          } catch (error) {
                    return rejectWithValue(error.message);
          }
});

export const updateCategoryById = createAsyncThunk('category/updateById', async ({ id, category }, { rejectWithValue }) => {
          try {
                    const response = await useFetch(`/categories/${id}`, {
                              body: { category },
                              method: "PATCH"
                    });
                    return response.data;
          } catch (error) {
                    return rejectWithValue(error.message);
          }
});

export const deleteCategoryById = createAsyncThunk('category/deleteById', async (id, { rejectWithValue }) => {
          try {
                    const response = await useFetch(`/categories/${id}`, {
                              method: "DELETE"
                    });
                    return response.data;
          } catch (error) {
                    return rejectWithValue(error.message);
          }
});


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
                    handleAsyncThunk(builder, deleteCategoryById)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {
                                        state.list = state.list.filter(item => item._id !== action.payload.deletedId)
                              })
                    handleAsyncThunk(builder, addCategory)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {
                                        state.list.push(action.payload.data);
                              })
                    handleAsyncThunk(builder, updateCategoryById)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {
                                        const { _id: payloadId } = action.payload.data
                                        const index = state.list.findIndex(item => item._id === payloadId)
                                        state.list[index] = { ...state.list[index], ...action.payload.data }
                                        console.log(index);
                                        console.log(action.payload);
                                        console.log(state.list);
                              })
          }
})

export default categorySlice.reducer