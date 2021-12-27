
// Define a service using a base URL and expected endpoints
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {AsyncStorage} from "react-native";
// export const partnerId = localStorage.getItem("partnerId");
export const partnerId = 6;
export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://112.78.1.28:8888/' }),
    endpoints: (builder) => ({
        getOrderListByStatusForAdmin :builder.query({
            query: (payload) => `admin?query=status&status=${payload.status}&date=${payload.date}`,
        }),
        getAllCartWaitingForAdmin: builder.query({
            query: (payload) =>`admin?query=status&status=${payload.status}&date=${payload.date}`
        }),
        getTotalPriceAndTotalQuantity: builder.query({
            query: () =>`admin?query=allTotal`
        }),
        getPartnerByQuantity: builder.query({
            query: () =>`admin?query=quantity`
        }),
        getPartnerByTotalPrice: builder.query({
            query: () =>`admin?query=totalPrice`
        }),
        getListToCartToOrderIdForAdmin :builder.query({
            query: (idCart) => `admin/${idCart}?query=orderId`,
        }),
        getListCartToPartnerId :builder.query({
            query: () => `admin/${partnerId}?query=partnerId`,
        }),

    }),
});
