import { configureStore } from '@reduxjs/toolkit';
import {userReducer} from "./service/user/userSlice";
import{token_current} from "./service/user/token";
import {productApi} from "./service/product/productAPI";

export const store = configureStore({
    reducer : {
        user:userReducer,
        [token_current.reducerPath] : token_current.reducer,
        [productApi.reducerPath] : productApi.reducer,
    },
})
