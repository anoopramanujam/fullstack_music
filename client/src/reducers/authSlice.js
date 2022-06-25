import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import musicApi from '../api/musicApi';

const initialState = {
  isAuthenticated: false,
  name: null,
  token: null
}

export const authenticate = createAsyncThunk ('auth/authenticate', async ({userName, password})=> {
  const response = await musicApi.post('/auth', {userName, password});
  return response.data;
})

const authSlice = createSlice ({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authenticate.fulfilled, (state,action) => {
      console.log(action);
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.token = action.payload.token;
    })
  }
})

// export  {authenticate} = authSlice.actions;
export default authSlice.reducer;