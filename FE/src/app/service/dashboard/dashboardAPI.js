
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://112.78.1.28:8888/' }),
    tagTypes: ['dashboardApi'],
    endpoints: (builder) => ({
        getDashboardByProductType :builder.query({
            query: (payload) => `dashboard?query=productType&startDate=${payload.start}&endDate=${payload.end}`,
            providesTags:['dashboardApi']
        }),
        getOrderQuantityByStatusOfAdmin :builder.query({
            query: () => `dashboard?query=quantityOrder`,
            providesTags:['dashboardApi']
        }),
    }),
});
