
// Define a service using a base URL and expected endpoints
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {AsyncStorage} from "react-native";
// export const partnerId = localStorage.getItem("partnerId");
export const partnerId = 6;
export const productApi = createApi({
    reducerPath: 'product',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://112.78.1.28:8888/' }),
    endpoints: (builder) => ({
        getProductByType: builder.query({
            query: (type) => `product/${type}?query=type`,
        }),
        getAllProducts: builder.query({
            query: () => `product`,
        }),
        getProductByView: builder.query({
            query: () => "product?query=view",
        }),
        getTotalViewProductByType: builder.query({
            query: () => "product?query=viewByType",
        }),
        checkExistProductOnCart :builder.query({
            query: (productCode) => `product/${productCode}?partnerId=${partnerId}`,
        }),
        getCartListByPartner :builder.query({
            query: () => `cart?partnerId=${partnerId}`,
        }),
        getOrderListByStatus :builder.query({
            query: (status) => `orders?query=status&partnerId=${partnerId}&status=${status}`,
        }),
    }),
});
