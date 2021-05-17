import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

const jokesAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.createdAt < b.createdAt ? 1 : -1),
  selectId: (entity) => entity._id,
});

const initialState = jokesAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchJokes = createAsyncThunk('jokes/fetchJokes', async () => {
  const response = await axios.get('/jokes');
  return response.data;
});

export const updateJoke = createAsyncThunk(
  'jokes/updateJoke',
  async ({ jokeId, iconName, token }) => {
    const response = await axios.put(
      `/jokes/${jokeId}`,
      {
        iconName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data.error) {
      return response.data;
    }
  }
);

export const jokeDeleted = createAsyncThunk(
  'jokes/jokeDeleted',
  async ({ jokeId, token }) => {
    const response = await axios.delete(`/jokes/${jokeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
);

export const jokeAdded = createAsyncThunk(
  'jokes/jokeAdded',
  async ({ title, content, token }) => {
    const response = await axios.post(
      '/jokes',
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);

const jokesSlice = createSlice({
  name: 'jokes',
  initialState,
  reducers: {
    voteAdded: function (state, action) {
      const { jokeId, iconName } = action.payload;
      state.entities[jokeId][iconName]++;
    },
  },
  extraReducers: {
    [fetchJokes.pending]: function (state) {
      state.status = 'pending';
    },
    [fetchJokes.fulfilled]: function (state, action) {
      state.status = 'fulfilled';
      jokesAdapter.setAll(state, action.payload);
    },
    [fetchJokes.rejected]: function (state, action) {
      state.status = 'rejected';
      state.error = action.error.message;
    },
    [updateJoke.pending]: function (state) {
      state.status = 'pending';
    },
    [updateJoke.fulfilled]: function (state, action) {
      state.status = 'fulfilled';
      jokesAdapter.upsertOne(state, action.payload);
    },
    [updateJoke.rejected]: function (state, action) {
      state.status = 'rejected';
      state.error = action.error.message;
    },
    [jokeDeleted.pending]: function (state) {
      state.status = 'pending';
    },
    [jokeDeleted.fulfilled]: function (state, action) {
      state.status = 'fulfilled';
      jokesAdapter.removeOne(state, action.payload._id);
    },
    [jokeDeleted.rejected]: function (state) {
      state.status = 'rejected';
    },
    [jokeAdded.pending]: function (state) {
      state.status = 'pending';
    },
    [jokeAdded.fulfilled]: function (state, action) {
      state.status = 'fulfilled';
      jokesAdapter.addOne(state, action.payload);
    },
    [jokeAdded.rejected]: function (state) {
      state.status = 'rejected';
    },
  },
});

export default jokesSlice.reducer;

export const {
  selectIds: selectJokeIds,
  selectAll: selectAllJokes,
  selectById: selectJokeById,
} = jokesAdapter.getSelectors((state) => state.jokes);

export const { voteAdded } = jokesSlice.actions;
