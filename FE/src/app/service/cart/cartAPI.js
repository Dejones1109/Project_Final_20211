
// Define a service using a base URL and expected endpoints
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {getIdUser} from "../../../helps/authenticate";

export const partnerId = getIdUser();
export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://112.78.1.28:8888/' }),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getCartListByPartner :builder.query({
            query: () => `cart?partnerId=${partnerId}`,
            providesTags:['Cart'],
        }),
        createCart : builder.mutation({
            query: (body)=>  ({
                url: `/cart`,
                method: 'POST',
                body,
            }),
            invalidatesTags:['Cart'],
        })
    }),
});
