
// Define a service using a base URL and expected endpoints
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {getIdUser} from "../../../helps/authenticate";
import Database from "../../../firebase/database";
import {getData} from "../../../helps/localStorage";


export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://112.78.1.28:8888/' }),
    tagTypes: ['cartApi'],
    endpoints: (builder) => ({
        getCartListByPartner :builder.query({
            query: (partnerId) => `cart?partnerId=${partnerId}`,
            providesTags:['cartApi'],
        }),
        getOrderListByStatus :builder.query({
            query: (payload) => `orders?query=status&partnerId=${payload.partnerId}&status=${payload.status}`,
            providesTags:['cartApi'],
        }),
        // createCart : builder.mutation({
        //     query: (body)=>  ({
        //         url: `/cart`,
        //         method: 'POST',
        //         body,
        //     }),
        //     invalidatesTags:['Cart'],
        // })
    }),
});
