import { configureStore } from '@reduxjs/toolkit';
import {adminApi,productApi,storeApi, orderApi ,dashboardApi,cartApi, systemApi,userSlice,orderSlice,adminSlice,productSlice,cartSlice,token_current,storeSlice} from "./controller/index"


export const store = configureStore({
    reducer : {
        auth:userSlice.reducer,
        product:productSlice.reducer,
        store: storeSlice.reducer,
        orders : orderSlice.reducer,
        admin:adminSlice.reducer,
        cart : cartSlice.reducer,
        // [token_current.reducerPath] : token_current.reducer,
        [productApi.reducerPath] : productApi.reducer,
        [storeApi.reducerPath] : storeApi.reducer,
        [adminApi.reducerPath] : adminApi.reducer,
        [orderApi.reducerPath] : orderApi.reducer,
        [dashboardApi.reducerPath] : dashboardApi.reducer,
        [cartApi.reducerPath] : cartApi.reducer,
        [systemApi.reducerPath] : systemApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            cartApi.middleware,
            storeApi.middleware,
            productApi.middleware,
            adminApi.middleware,
            orderApi.middleware ,
            dashboardApi.middleware,
            systemApi.middleware
        ),
})
