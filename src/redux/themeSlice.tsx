import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        mode: 'light'
    },
    reducers: {
        update: (state, action) => {
            console.log(state, action);
            const themeMode: string = action.payload.mode ? 'dark' : 'light';
            state.mode = themeMode;
        }
    }
});

export const { update } = themeSlice.actions;
export default themeSlice.reducer;