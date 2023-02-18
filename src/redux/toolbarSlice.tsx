import { createSlice } from "@reduxjs/toolkit";

export const toolbarSlice = createSlice({
    name: 'toolbar',
    initialState: {
        title: 'Meteostations',
        backArrow: false
    },
    reducers: {
        update: (state, action) => {
            state.title = action.payload.title;
            state.backArrow = action.payload.backArrow;
        }
    }
});

export const { update } = toolbarSlice.actions;
export default toolbarSlice.reducer;