// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginToApi } from '../../utils/api';

export const login = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
  const response = await loginToApi('/auth/local', {
    identifier: credentials.email,
    password: credentials.password,
  });
  return response;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.jwt;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.jwt);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
