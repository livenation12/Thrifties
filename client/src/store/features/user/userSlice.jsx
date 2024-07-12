import useFetch from "@/hooks/useFetch";
import { handleAsyncThunk, statusState } from "../utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
          user: null,
          status: statusState.idle,
          error: null
}

export const userSignup = createAsyncThunk("user/signup", async (payload) => {
          return await useFetch('/users/signup', {
                    body: payload,
                    method: "POST"
          })
})

export const userLogin = createAsyncThunk('user/login', async (payload) => {
          return await useFetch('/users/login', {
                    method: 'POST',
                    body: payload
          })
})

const userSlice = createSlice({
          name: "user",
          initialState,
          reducers: {
                    setUser: (state) => {

                    }
          },
          extraReducers: builder => {
                    handleAsyncThunk(builder, userSignup)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {

                              })
                    handleAsyncThunk(builder, userLogin)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {
                                        const { data } = action.payload
                                        state.user = data
                              })
          }
})


export default userSlice.reducer