
// Define a service using a base URL and expected endpoints
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {AsyncStorage} from "react-native";
// export const partnerId = localStorage.getItem("partnerId");
export const storeApi = createApi({
    reducerPath: 'storePartner',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://112.78.1.28:8888/' }),
    endpoints: (builder) => ({
        getAllStore: builder.query({
            query: () => "partner",
        }),
        getOrderQuantityByStatusOfPartner:builder.query({
            query: (partnerId)=>`partner/${partnerId}?query=quantityOrder`
        })
    }),
});
