import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout, setadminWithToken } from '../../features/slices/adminSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://aniket-enterprise-2.onrender.com',
    credentials: 'include',
    mode: 'cors',

    prepareHeaders: (headers, { getState }) => {
        const token = getState().admin.token

        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }

        return headers;
    }
})


// ARGS -> route 
// API -> A STATE OBJECT WE CAN GRAB STATE AND UPDATE IT

const baseQueryWithReAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        console.log('SENDING REFRESH TOKEN');


        const refereshResult = await baseQuery('/auth/refresh', api, extraOptions);

        if (refereshResult.data) {
            const admin = api.getState().admin.admin;

            // SETTING THE CREDENTIALS IN OUT STATE -> TODO
            api.dispatch(setadminWithToken({ admin, ...refereshResult.data }))
            result = await baseQuery(args, api, extraOptions);

        } else {
            api.dispatch(logout())
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints: builder => ({})
})