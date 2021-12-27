
// Define a service using a base URL and expected endpoints
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const partnerId = 6;
export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://112.78.1.28:8888/' }),
    endpoints: (builder) => ({
        getDashboardByProductType :builder.query({
            query: (payload) => `dashboard?query=productType&startDate=${payload.start}&endDate=${payload.end}`,
        }),

    }),
});
