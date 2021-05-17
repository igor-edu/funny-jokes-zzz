import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import jokesReducer from '../features/jokes/jokesSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    jokes: jokesReducer,
    users: usersReducer,
  },
});
