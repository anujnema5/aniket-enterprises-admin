import { configureStore } from '@reduxjs/toolkit'
import adminReducer from '../features/slices/adminSlice.js'
import { apiSlice } from './api/apiSlice.js';

const store = configureStore({
    reducer: {
        admin: adminReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware)
})

export default store;