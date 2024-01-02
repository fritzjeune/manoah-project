import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import axios from '../../components/axios/axios';

// create a new mutex
const mutex = new Mutex()

// const BACK_END_URL = "http://192.206.141.224:8088/api/v1";
// const BACK_END_URL = "http://192.168.100.10/api/v1";
const BACK_END_URL = "http://127.0.0.1:8000/api/";
// const BACK_END_URL = "";

const baseQuery = fetchBaseQuery({
    baseUrl: BACK_END_URL,
    prepareHeaders: (headers) => {
        // headers.set("Content-Type", "application/json");
        headers.set("Access-Control-Allow-Origin", "*/*");
        let token = window.sessionStorage.getItem("back_token");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
  // credentials: 'include',
});

// Custom Middleware for intercepting requests and responses
const baseQueryWithReauth = async (args, api, extraOptions) => {

    await mutex.waitForUnlock()   
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 403) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            const refreshToken = window.sessionStorage.getItem("refresh_token");
            // console.log(refreshToken)
            try {
                // const refreshResult = 
                await axios(
                    {
                        url: `${BACK_END_URL}/auth/refresh-token`,
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${refreshToken}` },
                    }
                ).then(async (res) => {
                    // store the new token
                    window.sessionStorage.setItem('back_token', res.data['Jwt-Token'])
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions);
                }).catch((err) => {
                    if (err.response.status === 403) {
                        window.sessionStorage.clear()
                        const currentLocation = window.location.pathname;
                        window.location.href = `/login?from=${encodeURIComponent(currentLocation)}`; 
                    }
                })
                // console.log(refreshResult);
                // if (refreshResult.data) {
                //     // store the new token
                //     window.sessionStorage.setItem('back_token', refreshResult.data['Jwt-Token'])
                //     // retry the initial query
                //     result = await baseQuery(args, api, extraOptions);
                // }
            } catch (err) {
                if (err.response.status === 403) {
                    window.sessionStorage.clear()
                    const currentLocation = window.location.pathname;
                    window.location.href = `/login?from=${encodeURIComponent(currentLocation)}`; 
                }
            } finally { 
                release()
            }
        } else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
        // try to get a new token
    }
    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: baseQueryWithReauth, // Pass the function reference without calling it
    tagTypes: ['Borrower', '', 'User'],
    endpoints: builder => ({}),
});


