
// Define a service using a base URL and expected endpoints
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {getIdUser} from "../../../helps/authenticate";
export const storeApi = createApi({
    reducerPath: 'storePartner',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://112.78.1.28:8888/' }),
    tagTypes:['storeApi'],
    endpoints: (builder) => ({
        getAllStore: builder.query({
            query: () => "partner",
            providesTags:['storeApi'],
        }),

        getOrderQuantityByStatusOfPartner:builder.query({
            query: (partnerId)=>`partner/${partnerId}?query=quantityOrder`,
            providesTags:['storeApi'],
        }),
        getPartnerByCode:builder.query({
            query: (partnerCodeId)=>`partner/${partnerCodeId}`,
            providesTags:['storeApi'],
        }),
        getBillPartner:builder.query({
            query: (partnerId)=>`bill/${partnerId}`,
            providesTags:['storeApi'],
        }),
    }),
});
