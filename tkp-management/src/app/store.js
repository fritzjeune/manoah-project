import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../components/features/api/apiSlice";
import borrowerReducer from "../components/features/borrower/borrowerSlice";
import loanReducer from "../components/features/loan/loanSlice";
import pageReducer from "../components/features/PagesSlice";
import userSlice from "../components/features/user/userSlice";

export const store = configureStore({
    reducer: {
        borrower: borrowerReducer,
        page: pageReducer,
        loan: loanReducer,
        user: userSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware()
        .concat(apiSlice.middleware),
    devTools: true
})

