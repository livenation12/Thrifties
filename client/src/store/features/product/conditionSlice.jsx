import useFetch from "@/hooks/useFetch";
import { handleAsyncThunk } from "../utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addCondition = createAsyncThunk('condition/add', async (payload, { rejectWithValue }) => {
          try {
                    const response = await useFetch('/conditions', { method: "POST", body: payload })
                    return response.data
          } catch (error) {
                    return rejectWithValue(error.message);

          }

})

export const fetchConditions = createAsyncThunk('conditions/fetch', async (_, { rejectWithValue }) => {
          try {
                    const response = await useFetch('/conditions', {})
                    return response.data
          } catch (error) {
                    return rejectWithValue(error.message);

          }

})

export const updateConditionsById = createAsyncThunk('condition/updateById', async ({ id, condition }, { rejectWithValue }) => {
          try {
                    const response = await useFetch(`/conditions/${id}`, {
                              body: { condition },
                              method: "PATCH"
                    })
                    return response.data
          } catch (error) {
                    return rejectWithValue(error.message);

          }

})

export const deleteConditionById = createAsyncThunk('condition/deleteById', async (id, { rejectWithValue }) => {
          try {
                    const response = await useFetch(`/conditions/${id}`, {
                              method: "DELETE"
                    })
                    return response.data
          } catch (error) {
                    return rejectWithValue(error.message);

          }


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
                    handleAsyncThunk(builder, deleteConditionById)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {
                                        state.list = state.list.filter(item => item._id !== action.payload.deletedId)

                              })
                    handleAsyncThunk(builder, addCondition)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {
                                        //push the new object
                                        state.list.push(action.payload.data)
                              })
                    handleAsyncThunk(builder, updateConditionsById)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {
                                        const { _id: payloadId } = action.payload.data
                                        //find the id in the state list then update that list
                                        const index = state.list.findIndex(item => item._id === payloadId)
                                        state.list[index] = { ...state.list[index], ...action.payload.data }
                              })
          }
})

export default categorySlice.reducer