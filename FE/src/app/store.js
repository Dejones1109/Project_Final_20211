import { configureStore } from '@reduxjs/toolkit';
import {userSlice} from "./service/user/userSlice";
import{token_current} from "./service/user/token";
import {productReducer} from "./service/product/productSlice";
import {storeReducer} from "./service/store/storeSlice";
import {adminApi,storeApi,productApi,orderApi, dashboardApi} from "./controller/index"
import {orderReducer} from "./service/order/orderSlice";
import {adminSlice} from "./service/admin/adminSlice";

export const store = configureStore({
    reducer : {
        auth:userSlice.reducer,
        // product:productReducer,
        // store: storeReducer,
        // orders : orderReducer,
        admin:adminSlice.reducer,
        [token_current.reducerPath] : token_current.reducer,
        [productApi.reducerPath] : productApi.reducer,
        [storeApi.reducerPath] : storeApi.reducer,
        [adminApi.reducerPath] : adminApi.reducer,
        [orderApi.reducerPath] : orderApi.reducer,
        [dashboardApi.reducerPath] : dashboardApi.reducer,
    },
})
