import { createSlice } from "@reduxjs/toolkit";

export const toolbarSlice = createSlice({
    name: 'toolbar',
    initialState: {
        title: 'Towns'
    },
    reducers: {
        update: (state, action) => {
            state.title = action.payload.title;
        }
    }
});

export const { update } = toolbarSlice.actions;
export default toolbarSlice.reducer;