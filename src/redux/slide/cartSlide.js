import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAllCart } from '~/services/user/cart-service';

const initialState = {
    cartCount: 0,
    loading: false,
    error: null,
};

// Thunk để fetch số lượng sản phẩm từ API
export const fetchCartCount = createAsyncThunk('cart/fetchCartCount', async (_, thunkAPI) => {
    try {
        const response = await getAllCart(); // Giả sử endpoint API trả về số lượng sản phẩm
        return response?.data?.length; // Trả về số lượng sản phẩm
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state) => {
            state.cartCount += 1; // Tăng số lượng sản phẩm trong giỏ
        },
        resetCart: (state) => {
            state.cartCount = 0; // Đặt lại giỏ hàng về 0
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartCount.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCartCount.fulfilled, (state, action) => {
                state.cartCount = action.payload;
                state.loading = false;
            })
            .addCase(fetchCartCount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { addToCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
