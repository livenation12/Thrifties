import useFetch from "@/hooks/useFetch";
import { handleAsyncThunk, statusState } from "../utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userSignup = createAsyncThunk("users/signup", async (payload) => {
          return await useFetch('/users/signup', {
                    body: payload,
                    method: "POST"
          })
})

export const userLogin = createAsyncThunk('users/login', async (payload) => {
          try {
                    const response = await useFetch('/users/login', {
                              method: 'POST',
                              body: payload
                    })
                    return response
          } catch (error) {
                    throw new Error(error.message); // Propagate error for rejection
          }
})

const initialState = {
          user: null,
          login: {
                    username: '',
                    password: ''
          },
          status: statusState.idle,
          error: null
}


const userSlice = createSlice({
          name: "user",
          initialState,
          reducers: {
                    loginChange: (state, action) => {
                              //handle inputcahnges here 
                              const { name, value } = action.payload;
                              state.login[name] = value;
                    }
          },
          extraReducers: (builder) => {
                    handleAsyncThunk(builder, userSignup)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {

                              })
                    handleAsyncThunk(builder, userLogin)
                              .pending()
                              .rejected()
                              .fulfilled((state, action) => {

                              })
          }
})

export const { loginChange } = userSlice.actions;
export default userSlice.reducer