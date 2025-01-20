//file to make api calls from rapidAPI
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const shazamCoreApi = createApi({
    //all apis need a reducer path, which will just be the name of our api
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', 'cbad29c973msh167777ad19eb041p1643d1jsn264d75c6b52e');
            headers.set('x-rapidapi-host', 'shazam-core.p.rapidapi.com');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => 'v1/charts/world?country_code=DZ' }),
    }),

});

export const {
    useGetTopChartsQuery,
} = shazamCoreApi;