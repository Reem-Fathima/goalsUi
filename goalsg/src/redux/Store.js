import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from '../redux/slices/goalsSlice'

const store = configureStore({
  reducer: {
    goals: goalsReducer,
  },
});

export default store;
