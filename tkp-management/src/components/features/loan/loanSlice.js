import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const initialState = {
    loanList: {},
    List: []
}

export const loanApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLoanList: builder.query({
            query: () => ({
                url: '/loans',
                method: "GET"
            }),
            providesTags: ["Loan"],
        }),
        getLoan: builder.mutation({
            query: (loanId) => ({
                url: `/loans/${loanId}`,
                method: "GET",
            }),
            providesTags: ["Loan"],
            // invalidatesTags: ["Assured"],
        }),
        getLoanPayments: builder.mutation({
            query: (loanId) => ({
                url: `/loans/${loanId}/payments`,
                method: "GET",
            }),
            providesTags: ["Loan"],
            // invalidatesTags: ["Assured"],
        }),
        makePayment: builder.mutation({
            query: (payment) => ({
                url: `/loans/${payment?.loan_id}/payments`,
                method: "POST",
                body: payment
            }),
            providesTags: ["Loan"],
            // invalidatesTags: ["Assured"],
        }),
        updatePayment: builder.mutation({
            query: (payment) => ({
                url: `/payments/${payment?.payment_id}`,
                method: "PUT",
                body: payment
            }),
            providesTags: ["Loan"],
            // invalidatesTags: ["Assured"],
        }),
    })
})


export const loanSlice = createSlice({
    name: "loan",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            loanApiSlice.endpoints.getLoanList.matchFulfilled,
            (state, action) => {
                state.loanList = action.payload
            }
        );
    },
})

export const {
    

} = loanSlice.actions;
export default loanSlice.reducer;

export const {
    useGetLoanListQuery,
    useGetLoanMutation,
    useGetLoanPaymentsMutation,
    useMakePaymentMutation,
    useUpdatePaymentMutation
} = loanApiSlice