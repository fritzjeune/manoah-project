// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";


const initialState = {
    user: JSON.parse(window.sessionStorage.getItem("user")),
    userList: [],
    userProfil: null
}


const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (user) => ({
                url: '/account/register',
                method: "POST",
                body: user
            }),
            providesTags: ["User"],
        }),
        getUsers: builder.mutation({
            query: () => ({
                url: `/account`,
                method: "GET",
            }),
            providesTags: ["User"],
        }),
        getUser: builder.mutation({
            query: (username) => ({
                url: `/account/${username}`,
                method: "GET"
            }),
            providesTags: ["User"],
        }),
        updateUser: builder.mutation({
            query: (account) => ({
                url: `/account/${account?.id}`,
                method: "PUT",
                body: account
            }),
            providesTags: ["User"],
        }),
        logOut: builder.mutation({
            query: () => ({
                url: `/account/logout`,
                method: "POST",
            }),
            providesTags: ["User"],
        }),
        verifyAccount: builder.mutation({
            query: (cred) => ({
                url: `account/login`,
                method: "POST",
                body: cred
            })
        }),
        resetPassword: builder.mutation({
            query: (username) => ({
                url: `account/reset-password`,
                method: "POST",
                body: {
                    username
                }
            })
        }),
        changePassword: builder.mutation({
            query: (user) => ({
                url: `account/change-password`,
                method: "POST",
                body: user
            })
        }),
    })
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApiSlice.endpoints.getUsers.matchFulfilled,
            (state, action) => {
                state.userList = action.payload;
            }
        );
        builder.addMatcher(
            userApiSlice.endpoints.getUser.matchFulfilled,
            (state, action) => {
                state.userProfil = action.payload;
            }
        );
        builder.addMatcher(
            userApiSlice.endpoints.updateUser.matchFulfilled,
            (state, action) => {
                state.userProfil = action.payload;
            }
        );
        builder.addMatcher(
            userApiSlice.endpoints.logOut.matchFulfilled,
            (state, action) => {
                state.user = null
                window.sessionStorage.clear()
                window.location.href = `/login`;
            }
        );
        builder.addMatcher(
            userApiSlice.endpoints.logOut.matchRejected,
            (state, action) => {
                state.user = null
                window.sessionStorage.clear()
                window.location.href = `/login`;
            }
        );
    },
})

export const {
    setUser,
    logOut
} = userSlice.actions;
export default userSlice.reducer;
export const {
    useCreateUserMutation,
    useGetUsersMutation,
    useGetUserMutation,
    useUpdateUserMutation,
    useLogOutMutation,
    useVerifyAccountMutation,
    useResetPasswordMutation,
    useChangePasswordMutation
} = userApiSlice