// Define a service using a base URL and expected endpoints
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {AsyncStorage} from "react-native";
import {getIdUser} from "../../../helps/authenticate";
export const partnerId = getIdUser();
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://112.78.1.28:8888/' }),
    tagTypes:['productApi'],
    endpoints: (builder) => ({
        getProductByType: builder.query({
            query: (type) => `product/${type}?query=type`,
            providesTags:['productApi'],
        }),
        getAllProducts: builder.query({
            query: () => `product`,
            providesTags:['productApi']
        }),
        getProductByView: builder.query({
            query: () => "product?query=view",
            providesTags:['productApi']
        }),
        getTotalViewProductByType: builder.query({
            query: () => "product?query=viewByType",
            providesTags:['productApi']
        }),
        checkExistProductOnCart :builder.query({
            query: (productCode) => `product/${productCode}?partnerId=${partnerId}`,
            providesTags:['productApi']
        }),

    }),
});
