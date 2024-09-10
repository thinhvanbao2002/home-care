import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    admin: {},
};

export const adminSlice = createSlice({
    name: 'authAdmin',
    initialState,
    reducers: {
        setAuthAdmin: (state, action) => {
            state.admin = action.payload;
        },
    },
});
export const { setAuthAdmin } = adminSlice.actions;
export default adminSlice.reducer;
