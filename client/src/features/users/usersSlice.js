import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  getUserLocalStorage,
  setUserLocalStorage,
} from '../../app/localStorage';

// http://localhost:5000

const initialState = {
  user: getUserLocalStorage(),
  error: null,
  status: 'idle',
};

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async ({ email, password }) => {
    try {
      const response = await axios.post(
        '/users/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setUserLocalStorage(response.data);

      return response.data;
    } catch (error) {
      setUserLocalStorage('');
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async ({ name, email, password }) => {
    try {
      const response = await axios.post('/users/register', {
        name,
        email,
        password,
      });

      setUserLocalStorage(response.data);

      return response.data;
    } catch (error) {
      setUserLocalStorage('');
      throw error;
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        if (action.payload.error) {
          state.error = action.payload.error;
          state.user = null;
        } else {
          state.error = null;
          state.user = action.payload;
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'rejected';
        state.user = null;
        state.error = 'Incorrect login details, pls try again';
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        if (action.payload.error) {
          state.error = action.payload.error;
          state.user = null;
        } else {
          state.error = null;
          state.user = action.payload;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.user = null;
        state.error = action.error.message;
        state.error = 'Error on the server, try again';
      });
  },
});

export const { logoutUser } = usersSlice.actions;

export const selectUser = (state) => state.users.user;
export const selectUserError = (state) => state.users.error;
export const selectUserToken = (state) =>
  state.users.user && state.users.user.token;

export default usersSlice.reducer;
