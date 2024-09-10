import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    user: {},
};

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload;
        },
        // Thêm phần cập nhật thông tin user
        updateAuth: (state, action) => {
            state.user = { ...state.user, ...action.payload }; // Cập nhật chỉ các thông tin mới
        },
    },
});
export const { setAuth } = userSlice.actions;
export default userSlice.reducer;
