
// Define a service using a base URL and expected endpoints
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {AsyncStorage} from "react-native";
export const partnerId = localStorage.getItem("partnerId");
export const orderApi = createApi({
    reducerPath: 'order',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://112.78.1.28:8888/' }),
    endpoints: (builder) => ({
        getOrderListByStatusOfUserForAdmin :builder.query({
            query: (payload) => `orders?query=status&partnerId=${payload.id}&status=${payload.status}`,
        }),
        getListToCartToOrderIdForAdmin :builder.query({
            query: (idCart) => `admin/${idCart}?query=orderId`,
        }),
    }),
});
