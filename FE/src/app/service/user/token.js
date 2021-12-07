import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const URL =  ''
// Define a service using a base URL and expected endpoints to get payload

const baseQuery = fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem('access_token');
        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('authorization', `${token}`)
        }
        return headers
    },
})


export const token_current = createApi({
    reducerPath:'user',
    baseQuery: baseQuery,
    tagTypes: ['Post'],
    endpoints:(builder)=>({
        getUser: builder.query({
            query: ()=> 'user',
            transformResponse: (response) => response
        }),
    })
})

// @ts-ignore
export const {useGetUserQuery} = token_current;
