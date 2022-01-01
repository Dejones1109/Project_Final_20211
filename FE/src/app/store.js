import { configureStore } from '@reduxjs/toolkit';
import {userSlice} from "./service/user/userSlice";
import{token_current} from "./service/user/token";
import {storeSlice} from "./service/store/storeSlice";
import {adminApi,storeApi,productApi,orderApi, dashboardApi} from "./controller/index"
import {orderSlice} from "./service/order/orderSlice";
import {adminSlice} from "./service/admin/adminSlice";
import {productSlice} from "./service/product/productSlice";
import {cartSlice} from "./service/cart/cartSlice";

export const store = configureStore({
    reducer : {
        auth:userSlice.reducer,
        product:productSlice.reducer,
        store: storeSlice.reducer,
        orders : orderSlice.reducer,
        admin:adminSlice.reducer,
        cart : cartSlice.reducer,
        [token_current.reducerPath] : token_current.reducer,
        [productApi.reducerPath] : productApi.reducer,
        [storeApi.reducerPath] : storeApi.reducer,
        [adminApi.reducerPath] : adminApi.reducer,
        [orderApi.reducerPath] : orderApi.reducer,
        [dashboardApi.reducerPath] : dashboardApi.reducer,

    },
})
