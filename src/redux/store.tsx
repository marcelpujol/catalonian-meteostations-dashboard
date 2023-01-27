import { configureStore } from "@reduxjs/toolkit";
import toolbarReducer from './toolbarSlice';
import themeReducer from './themeSlice';
import meteoVariablesReducer from "./meteoVariablesSlice";

export default configureStore({
    reducer: {
        toolbar: toolbarReducer,
        theme: themeReducer,
        meteoVariables: meteoVariablesReducer
    }
})