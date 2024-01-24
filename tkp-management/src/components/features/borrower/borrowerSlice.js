import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

// const config = {
//     headers: {
//         'X-CSCAPI-KEY': process.env.REACT_APP_CSC_API_KEY
//     }
// }

const defaultBorrower = {
    borrower_id: 30,
    last_name: "jeune",
    first_name: "Schella",
    birthdate: "1999-11-11",
    city_of_birth: "",
    state_of_birth: "",
    country_of_birth: "",
    email: "schellaj@abc.com",
    created_by: 35,
    createdAt: "2023-12-30T22:33:05.675Z",
    updatedAt: "2023-12-30T22:33:05.675Z",
    address: {
        address_id: 11,
        borrower_id: 30,
        street: "eau chaude",
        city: "",
        state: "",
        is_property_owner: false,
        createdAt: "2023-12-30T22:33:05.683Z",
        updatedAt: "2023-12-30T22:33:05.683Z"
    },
    contacts: [
        {
            contact_id: 6,
            borrower_id: 30,
            phone_number: "50932020000",
            createdAt: "2023-12-30T22:33:05.687Z",
            updatedAt: "2023-12-30T22:33:05.687Z"
        }
    ],
    loans: [
        {
            loan_id: 4,
            borrower_id: 30,
            amount_requested: "100.00",
            interest_rate: "2.10",
            mortgage_length: 24,
            reason: "Achat de voiture.",
            approval_date: "2023-12-26T05:00:00.000Z",
            total_interest: "111.00",
            total_loan: "1111.00",
            payment_end_date: "2023-12-26T05:00:00.000Z",
            loan_status_id: 3,
            createdAt: "2024-01-01T11:55:25.054Z",
            updatedAt: "2024-01-01T11:55:25.082Z",
            pledges: [
                {
                    pledge_id: 3,
                    pledge_value: "12000.00",
                    location: "Eau chaude",
                    pledge_text: "An House",
                    loan_id: 4,
                    note: "au nom de Bamboch",
                    pledge_status_id: 1,
                    createdAt: "2024-01-01T19:44:45.184Z",
                    updatedAt: "2024-01-01T19:44:45.184Z"
                }
            ],
            reference_people: [
                {
                    reference_id: 1,
                    borrower_id: 30,
                    loan_id: 4,
                    first_name: "Fritz",
                    last_name: "Jeune",
                    address: "eau chaude",
                    phone_number: "50932000000",
                    relation_to_borrower: "Amis",
                    createdAt: "2024-01-01T16:28:11.621Z",
                    updatedAt: "2024-01-01T16:28:11.621Z"
                },
                {
                    reference_id: 2,
                    borrower_id: 30,
                    loan_id: 4,
                    first_name: "Schella",
                    last_name: "Jeune",
                    address: "eau chaude",
                    phone_number: "50932000000",
                    relation_to_borrower: "Amis",
                    createdAt: "2024-01-01T16:35:29.471Z",
                    updatedAt: "2024-01-01T16:35:29.471Z"
                }
            ],
            payments: [
                {
                    payment_id: 1,
                    loan_id: 4,
                    payment_date: "2023-12-31",
                    amount: "200.00",
                    payment_method_id: 1,
                    month_reference: "2023-12-31",
                    createdAt: "2024-01-01T13:18:25.643Z",
                    updatedAt: "2024-01-01T13:18:25.643Z",
                    payment_method: {
                        id: 1,
                        value: "Cash",
                        createdAt: "2024-01-01T13:10:31.932Z",
                        updatedAt: "2024-01-01T13:10:31.932Z"
                    }
                },
                {
                    payment_id: 2,
                    loan_id: 4,
                    payment_date: "2024-01-31",
                    amount: "200.00",
                    payment_method_id: 1,
                    month_reference: "2024-01-31",
                    createdAt: "2024-01-01T13:18:44.726Z",
                    updatedAt: "2024-01-01T13:18:44.726Z",
                    payment_method: {
                        id: 1,
                        value: "Cash",
                        createdAt: "2024-01-01T13:10:31.932Z",
                        updatedAt: "2024-01-01T13:10:31.932Z"
                    }
                },
                {
                    payment_id: 3,
                    loan_id: 4,
                    payment_date: "2024-02-29",
                    amount: "200.00",
                    payment_method_id: 1,
                    month_reference: "2024-02-29",
                    createdAt: "2024-01-01T13:18:55.342Z",
                    updatedAt: "2024-01-01T13:18:55.342Z",
                    payment_method: {
                        id: 1,
                        value: "Cash",
                        createdAt: "2024-01-01T13:10:31.932Z",
                        updatedAt: "2024-01-01T13:10:31.932Z"
                    }
                },
                {
                    payment_id: 4,
                    loan_id: 4,
                    payment_date: "2024-03-31",
                    amount: "200.00",
                    payment_method_id: 1,
                    month_reference: "2024-03-31",
                    createdAt: "2024-01-01T13:19:08.103Z",
                    updatedAt: "2024-01-01T13:19:08.103Z",
                    payment_method: {
                        id: 1,
                        value: "Cash",
                        createdAt: "2024-01-01T13:10:31.932Z",
                        updatedAt: "2024-01-01T13:10:31.932Z"
                    }
                },
                {
                    payment_id: 5,
                    loan_id: 4,
                    payment_date: "2024-04-30",
                    amount: "200.00",
                    payment_method_id: 2,
                    month_reference: "2024-04-30",
                    createdAt: "2024-01-01T13:19:22.586Z",
                    updatedAt: "2024-01-01T13:19:22.586Z",
                    payment_method: {
                        id: 2,
                        value: "MonCash",
                        createdAt: "2024-01-01T13:10:31.935Z",
                        updatedAt: "2024-01-01T13:10:31.935Z"
                    }
                }
            ]
        }
    ]
}


// export const getCountries = createAsyncThunk("assured/countryRessources", async () => {
//     const res = await axios.get(`https://api.countrystatecity.in/v1/countries`, config)
    
//     if (res.data) {
//         return res.data
//     } else {
//         return ([
//             { id: 1, name: "Haiti", iso2: "HT" },
//             { id: 2, name: "Autres", iso2: "XX" }
//         ])
//     }
// })


const initialState = {
    navBar: false,
    selectedSideLink: "",
    postingStatus: "",
    updatingAssured: "",
    error: "",
    errorMesage: "",
    requiredDocs: [
        { name: "Numero National", value: 2 },
        { name: "Passport", value: 7 },
        { name: "Extrait d'archive", value: 1 },
        { name: "Acte de Mariage", value: 3 }],
    idDocsAccepted: [
        { name: "NIF", value: 1 },
        { name: "NIN", value: 2 },
        { name: "Passport", value: 3 }],
    educationalLevel: [
        { name: "Primaire", value: 1 },
        { name: "secondaire", value: 2 },
        { name: "Technique", value: 3 },
        { name: "Licence", value: 4 },
        { name: "Maitrise", value: 5 },
        { name: "Doctorat", value: 6 }],
    assuredTypes: [
        {name: "Volontaire", value: 1},
        {name: "Obligatoire", value: 2},
    ],
    maritalStatus: [
        { name: "Celibataire", value: 1 },
        { name: "Marie(e)", value: 2 },
        { name: "Union Libre", value: 3 },
        { name: "Divorce(e)", value: 4 },
        { name: "Veuf(ve)", value: 5 }],
    user: null,
    borrower: defaultBorrower,
    borrowerList: []
}

const borrowerListAdapter = createEntityAdapter({
    selectId: (borrower) => borrower.borrower_id,
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

// const initialState = assuredListAdapter.getInitialState()

export const borrowerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBorrowerList: builder.mutation({
            query: () => ({
                url: '/borrower',
                method: "GET"
            }),
            providesTags: ["Borrower"],
        }),
        createBorrower: builder.mutation({
            query: (borrower) => ({
                url: '/borrower',
                method: "POST",
                body: borrower
            }),
            providesTags: ["Borrower"],
        }),
        getBorrower: builder.mutation({
            query: (borrowerId) => ({
                url: `/borrower/${borrowerId}`,
                method: "GET"
            }),
            providesTags: ["Borrower"],
        }),
        updateBorrower: builder.mutation({
            query: (borrower) => ({
                url: `/borrower/${borrower?.borrower_id}`,
                method: "PUT",
                body: borrower
            }),
            providesTags: ["Borrower"],
            // invalidatesTags: ["Assured"],
        }),
        getBorrowerByQueries: builder.mutation({
            query: (queries) => ({
                url: `/borrower/${queries}`,
                method: "GET"
            }),
            providesTags: ["Borrower"],
        }),
        addBorrowerAddress: builder.mutation({
            query: (data) => ({
                url: `/borrower/${data.borrower_id}/address`,
                method: "POST",
                body: data.address
            }),
            providesTags: ["Borrower"],
            // invalidatesTags: ["Assured"],
        }),
        updateBorrowerAddress: builder.mutation({
            query: (data) => ({
                url: `/borrower/${data.borrower_id}/address/${data?.address?.id}`,
                method: "PUT",
                body: data.address
            }),
            providesTags: ["Borrower"],
            // invalidatesTags: ["Assured"],
        }),
        addBorrowerContact: builder.mutation({
            query: (data) => ({
                url: `/borrower/${data.borrower_id}/address`,
                method: "POST",
                body: data.contact
            }),
            providesTags: ["Borrower"],
            // invalidatesTags: ["Assured"],
        }),
        updateBorrowerContact: builder.mutation({
            query: (data) => ({
                url: `/borrower/${data.borrower_id}/contact/${data?.contact?.id}`,
                method: "PUT",
                body: data.contact
            }),
            providesTags: ["Borrower"],
            // invalidatesTags: ["Assured"],
        }),


        createBorrowerLoan: builder.mutation({
            query: (data) => ({
                url: `/borrower/${data.borrower_id}/loans`,
                method: "POST",
                body: data.loan
            }),
            providesTags: ["Borrower"],
            // invalidatesTags: ["Assured"],
        }),
        updateBorrowerLoan: builder.mutation({
            query: (data) => ({
                url: `/borrower/${data.borrower_id}/loans/${data.loan?.id}`,
                method: "PUT",
                body: data.loan
            }),
            providesTags: ["Borrower"],
            // invalidatesTags: ["Assured"],
        }),
        deleteBorrowerLoan: builder.mutation({
            query: (data) => ({
                url: `/borrower/${data.borrower_id}/loans/${data?.loan?.id}`,
                method: "DELETE",
            }),
            providesTags: ["Borrower"],
            // invalidatesTags: ["Assured"],
        }),
        getBorrowerLoans: builder.mutation({
            query: (data) => ({
                url: `/borrower/${data.borrower_id}/loans/${data.loan?.id}`,
                method: "GET",
            }),
            providesTags: ["Borrower"],
            // invalidatesTags: ["Assured"],
        }),
    })
})

export const borrowerSlice = createSlice({
    name: "borrower",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            borrowerApiSlice.endpoints.getBorrower.matchFulfilled,
            (state, action) => {
                
            }
        );
    },
})


export const {
    
} = borrowerSlice.actions;
export default borrowerSlice.reducer;

export const {
    useGetBorrowerMutation,
    useCreateBorrowerMutation,
    useGetBorrowerListMutation,
    useGetBorrowerLoansMutation,
    useUpdateBorrowerMutation,
    useUpdateBorrowerLoanMutation,
    useCreateBorrowerLoanMutation,
    useDeleteBorrowerLoanMutation,
    useAddBorrowerAddressMutation,
    useAddBorrowerContactMutation,
    useUpdateBorrowerAddressMutation,
    useUpdateBorrowerContactMutation,
    // useGetBorrowerByQueriesMutation
} = borrowerApiSlice