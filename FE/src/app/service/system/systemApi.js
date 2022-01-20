// Define a service using a base URL and expected endpoints
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const systemApi = createApi({
    reducerPath: 'systemApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://112.78.1.28:8888/' }),
    tagTypes:['systemApi'],
    endpoints: (builder) => ({
        getListSaleNoUse: builder.query({
            query: (sale) => `/system/${sale.partnerId}?query=listSaleNoUse&condition=${sale.condition}`,
            providesTags:['systemApi'],
        }),
        createSale: builder.mutation({
            query: (body) => ({
                url: `system?query=sale`,
                method: 'POST',
                body,
            }),
            invalidatesTags:['systemApi'],
        }),
        getAllSale : builder.query({
            query: () => "system",
            providesTags:['systemApi'],
        }),
        updateStatusSale :builder.mutation({
            query: (payload) => ({
                url: `system/${payload.id}?query=status&status=${payload.status}`,
                method: 'PUT',
            }),
            invalidatesTags:['systemApi'],
        }),
    }),
});
