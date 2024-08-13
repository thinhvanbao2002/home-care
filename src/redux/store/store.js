import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../slide/couterSlide';
import authSlide from '../slide/authSlide';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authSlide,
    },
});
