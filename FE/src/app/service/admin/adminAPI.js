
// Define a service using a base URL and expected endpoints
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {AsyncStorage} from "react-native";
// export const partnerId = localStorage.getItem("partnerId");
export const partnerId = 6;
export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://112.78.1.28:8888/' }),
    tagTypes: ['adminApi'],
    endpoints: (builder) => ({
        getOrderListByStatusForAdmin :builder.query({
            query: (payload) => `admin/${payload.status}?query=status`,
            providesTags:['adminApi']
        }),
        getAllCartWaitingForAdmin: builder.query({
            query: (payload) =>`admin?query=status&status=${payload.status}&date=${payload.date}`,
            providesTags:['adminApi']
        }),
        getTotalPriceAndTotalQuantity: builder.query({
            query: () =>`admin?query=allTotal`,
            providesTags:['adminApi']
        }),
        getPartnerByQuantity: builder.query({
            query: () =>`admin?query=quantity`,
            providesTags:['adminApi']
        }),
        getPartnerByTotalPrice: builder.query({
            query: () =>`admin?query=totalPrice`,
            providesTags:['adminApi']
        }),
        getListToCartToOrderIdForAdmin :builder.query({
            query: (idCart) => `admin/${idCart}?query=orderId`,
            providesTags:['adminApi']
        }),
        getListCartToPartnerId :builder.query({
            query: () => `admin/${partnerId}?query=partnerId`,
            providesTags:['adminApi']
        }),
    //     editPost: builder.mutation({
    //     query: (body) => {
    //         console.log(body);
    //         return ({
    //             url: `admin?query=login`,
    //             method: 'POST',
    //             body,
    //         })
    //     },
    //     invalidatesTags:(result) =>
    //         {
    //             // console.log("result",result);
    //             return ['Post']
    //         },
    // }),
    }),
});
