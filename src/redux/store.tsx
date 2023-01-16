import { configureStore } from "@reduxjs/toolkit";
import toolbarReducer from './toolbarSlice';

export default configureStore({
    reducer: {
        toolbar: toolbarReducer
    }
})