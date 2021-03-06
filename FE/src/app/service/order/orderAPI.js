
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://112.78.1.28:8888/' }),
    tagTypes: ['orderApi'],
    endpoints: (builder) => ({
        getOrderListByStatusOfUserForAdmin :builder.query({
            query: (payload) => `orders?query=status&partnerId=${payload.id}&status=${payload.status}`,
            providesTags:['orderApi']
        }),
        getOrderByCode :builder.query({
            query: (orderCode) => `orders/${orderCode}`,
            providesTags:['orderApi']
        }),
    }),
});
