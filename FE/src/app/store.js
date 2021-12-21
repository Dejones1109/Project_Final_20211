import { configureStore } from '@reduxjs/toolkit';
import {userReducer} from "./service/user/userSlice";
import{token_current} from "./service/user/token";
import {productReducer} from "./service/product/productSlice";
import {storeReducer} from "./service/store/storeSlice";
import {adminApi,storeApi,productApi,orderApi} from "./controller/index"

export const store = configureStore({
    reducer : {
        user:userReducer,
        product:productReducer,
        store: storeReducer,
        [token_current.reducerPath] : token_current.reducer,
        [productApi.reducerPath] : productApi.reducer,
        [storeApi.reducerPath] : storeApi.reducer,
        [adminApi.reducerPath] : adminApi.reducer,
        [orderApi.reducerPath] : orderApi.reducer
    },
})
