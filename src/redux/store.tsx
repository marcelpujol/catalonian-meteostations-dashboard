import { configureStore } from "@reduxjs/toolkit";
import toolbarReducer from './toolbarSlice';
import themeReducer from './themeSlice';

export default configureStore({
    reducer: {
        toolbar: toolbarReducer,
        theme: themeReducer
    }
})