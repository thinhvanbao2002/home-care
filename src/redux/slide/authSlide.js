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
    },
});
export const { setAuth } = userSlice.actions;
export default userSlice.reducer;
