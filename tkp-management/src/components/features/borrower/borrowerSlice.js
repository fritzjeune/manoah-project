import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import axios from "axios";

const config = {
    headers: {
        'X-CSCAPI-KEY': process.env.REACT_APP_CSC_API_KEY
    }
}

const defaultSpouse = {
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    middlename: "",
    commonLifeDate: "",
    phoneNumber: "",
    countryOfBirth: "",
    stateOfBirth: "",
    cityOfBirth: "",
    address: "",
    isCurrent: true
}

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


export const getCountries = createAsyncThunk("assured/countryRessources", async () => {
    const res = await axios.get(`https://api.countrystatecity.in/v1/countries`, config)
    
    if (res.data) {
        return res.data
    } else {
        return ([
            { id: 1, name: "Haiti", iso2: "HT" },
            { id: 2, name: "Autres", iso2: "XX" }
        ])
    }
})


const initialState = {
    // view: "00",
    alertBox: 0,
    alertText: {
        title: "",
        body: ""
    },
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
        { name: "Acte de Mariage", value: 3 },
        { name: "Acte de Naissance enfant", value: 4 },
        { name: "Livret ONA", value: 5 },
        { name: "Carte d'Assuré ONA", value: 6 }],
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
    assuredStatuses: [
        {name: "Actif(ve)", value: 1},
        {name: "Pensioné(e)", value: 2},
        {name: "Restitué(e)", value: 3},
        // {name: "Client(e)", value: 4},
        {name: "Inactif(ve)", value: 5},
    ],
    assuredTypes: [
        {name: "Volontaire", value: 1},
        {name: "Obligatoire", value: 2},
    ],
    assuredStates: [
        {name: "Verifié", value: 8},
        {name: "Matriculé", value: 9},
        {name: "Pret a imprimer", value: 10},
    ],
    maritalStatus: [
        { name: "Celibataire", value: 1 },
        { name: "Marie(e)", value: 2 },
        { name: "Union Libre", value: 3 },
        { name: "Divorce(e)", value: 4 },
        { name: "Veuf(ve)", value: 5 }],
    matrimonialRegime: [
        { name: "Communauté", value: 1 },
        { name: "Separé", value: 2 }],
    dependantType: [
        { name: "Enfant", value: 1 },
        // { name: "Enfant Adoptif", value: 3 },
        // { name: "Enfant du Conjoint", value: 2 },
        { name: "Autre", value: 4 }],
    countries: [
        
    ],
    user: null,
    assured: defaultAssured,
    spouse: defaultSpouse,
    assuredList: []
}

const assuredListAdapter = createEntityAdapter({
    selectId: (assured) => assured.id,
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

// const initialState = assuredListAdapter.getInitialState()

export const assuredApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAssuredList: builder.query({
            query: () => ({
                url: '/assured',
                method: "GET"
            }),
            providesTags: ["Assured"],
        }),
        createAssured: builder.mutation({
            query: (assured) => ({
                url: '/assured',
                method: "POST",
                body: assured
            }),
            providesTags: ["Assured"],
        }),
        getAssured: builder.mutation({
            query: (assuredId) => ({
                url: `/assured/${assuredId}`,
                method: "GET"
            }),
            providesTags: ["Assured"],
        }),
        updateAssured: builder.mutation({
            query: (assured) => ({
                url: `/assured/${assured?.id}`,
                method: "PUT",
                body: assured
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        getAssuredByQueries: builder.mutation({
            query: (queries) => ({
                url: `/assured/${queries}`,
                method: "GET"
            }),
            // transformResponse: (response) => console.log(response),
            providesTags: ["Assured"],
            // transformResponse: assuredData => {
            //     return assuredListAdapter.setAll(initialState, assuredData)
            // },
            // providesTags: ["Assured"],
        }),
        addAssuredDependant: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/dependants`,
                method: "POST",
                body: data.dependant
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        updateAssuredIdDoc: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/identity-documents/${data?.idDoc?.id}`,
                method: "PUT",
                body: data.idDoc
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        
        deleteAssuredIdDoc: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/identity-documents/${data?.idDoc?.id}`,
                method: "DELETE"
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        addAssuredIdDoc: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/identity-documents`,
                method: "POST",
                body: data.idDoc
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        addAssuredFamily: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/family`,
                method: "POST",
                body: data.family
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        addAssuredParent: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/parents`,
                method: "POST",
                body: data.parent
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        updateAssuredParent: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/parents/${data.parent?.id}`,
                method: "PUT",
                body: data.parent
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        addAssuredSpouse: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/spouse`,
                method: "POST",
                body: data.spouse
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        updateAssuredSpouse: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/spouse/${data.spouse?.id}`,
                method: "PUT",
                body: data.spouse
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        deleteAssuredSpouse: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/spouse/${data.spouse?.id}`,
                method: "DELETE",
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        addAssuredContact: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/contact`,
                method: "POST",
                body: data.contact
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        updateAssuredContact: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/contact/${data?.contact?.id}`,
                method: "PUT",
                body: data.contact
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        deleteAssuredContact: builder.mutation({
            query: (data) => ({
                url: `/assured/${data?.assured}/contact/${data?.contact?.id}`,
                method: "DELETE"
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        addAssuredAddress: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/address`,
                method: "POST",
                body: data.address
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        updateAssuredAddress: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/address/${data.address?.id}`,
                method: "PUT",
                body: data.address
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        deleteAssuredAddress: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/address/${data.address?.id}`,
                method: "DELETE",
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        updateAssuredDependant: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/dependants/${data.dependant.id}`,
                method: "PUT",
                body: data.dependant
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        deleteAssuredDependant: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/dependants/${data.dependant.id}`,
                method: "DELETE",
                body: {}
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        addAssuredWorkHistory: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/work-history`,
                method: "POST",
                body: data.work
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        updateAssuredWorkHistory: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/work-history/${data.work?.id}`,
                method: "PUT",
                body: data.work
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        deleteAssuredWorkHistory: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/work-history/${data.work?.id}`,
                method: "DELETE",
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        addAssuredContactPerson: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/contact-person`,
                method: "POST",
                body: data.contactPerson
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        updateAssuredContactPerson: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/contact-person/${data.contactPerson?.id}`,
                method: "PUT",
                body: data.contactPerson
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        deleteAssuredContactPerson: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/contact-person/${data.contactPerson?.id}`,
                method: "DELETE",
                body: {}
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        addAssuredProfilImage: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/profileimg`,
                method: "POST",
                prepareHeaders: (headers) => {
                    headers.set("Content-Type", "multipart/form-data")
                        return headers
                },
                body: data.imageData
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        addAssuredEconomicActivity: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/economic-activity`,
                method: "POST",
                body: data.economicActivity
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        updateAssuredEconomicActivity: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/economic-activity/${data.economicActivity?.id}`,
                method: "PUT",
                body: data.economicActivity
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        deleteAssuredEconomicActivity: builder.mutation({
            query: (data) => ({
                url: `/assured/${data.assured}/economic-activity/${data.economicActivity?.id}`,
                method: "DELETE",
                body: {}
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        updateAssuredStatus: builder.mutation({
            query: (assured) => ({
                url: `/assured/${assured.id}/update-status`,
                method: "POST",
                body: assured.assuredStatus
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        updateAssuredState: builder.mutation({
            query: (assured) => ({
                url: `/assured/${assured.id}/update-state`,
                method: "POST",
                body: assured.assuredState
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        updateAssuredMatricule: builder.mutation({
            query: (assured) => ({
                url: `/assured/${assured.id}/update-matricule`,
                method: "POST",
                body: assured.matricule
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
        updateAssuredType: builder.mutation({
            query: (assured) => ({
                url: `/assured/${assured.id}/update-type`,
                method: "POST",
                body: assured.assuredType
            }),
            providesTags: ["Assured"],
            // invalidatesTags: ["Assured"],
        }),
    })
})

export const assuredSlice = createSlice({
    name: "assured",
    initialState,
    reducers: {
        setSpouse: (state, action) => {
            state.spouse = action.payload
        },
        setAssured: (state, action) => {
            state.assured = action.payload
        },
        setAssuredList: (state, action) => {
            state.assuredList = action.payload
        },
        resetAssured: (state, action) => {
            state.assured = defaultAssured
            state.spouse = defaultSpouse
        },
        resetSpouse: (state, action) => {
            state.spouse = defaultSpouse
        },
        updateAssuredField: (state, action) => {
            state.assured = { ...state.assured, [action.payload.input]: action.payload.value }
        },
        updateAssuredInnerField: (state, action) => {
            state.assured = { ...state.assured, [action.payload.object]: { ...state.assured[action.payload.object], [action.payload.input]: action.payload.value } }
        },
        updateAssuredFamilyField: (state, action) => {
            state.spouse = { ...state.spouse, [action.payload.input]: action.payload.value }
        },
        addDependant: (state, action) => {
            state.assured = { ...state.assured, dependants: state.assured.dependants.concat(action.payload) }
        },
        addIdentityDocs: (state, action) => {
            state.assured = { ...state.assured, identityDocuments: state.assured.identityDocuments.concat(action.payload) }
        },
        removeIdentityDocs: (state, action) => {
            state.assured = { ...state.assured, identityDocuments: state.assured.identityDocuments.filter((identity, index) => identity.idType?.id !== action.payload?.id && identity.idNumber !== action.payload.idNumber ) }
        },
        addWorkHistory: (state, action) => {
            state.assured = { ...state.assured, works: state.assured.works.concat(action.payload) }
        },
        removeDependant: (state, action) => {
            state.assured = { ...state.assured, dependants: state.assured.dependants.filter((dep, index) => dep.firstname !== action.payload.firstname && dep.lastname !== action.payload.lastname) }
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(getCountries.fulfilled, (state, action) => {
        //     console.log("fullfilled")
        //     state.countries = [...[{ id: 1, name: "Choose", iso2: "" }], action.payload]
        // });
        builder.addCase(getCountries.fulfilled, (state, action) => {
            state.countries = state.countries.concat(action.payload);
        });
        builder.addCase(getCountries.pending, (state, action) => {
            console.log("rejected")
            state.countries = [
                { id: 1, name: "Choose", iso2: "" },
                { id: 1, name: "Haiti", iso2: "HT" },
                { id: 2, name: "Autres", iso2: "XX" }
            ];
        });
        // builder.addCase(updateAssured.fulfilled, (state, action) => {
        //     state.assured = action.payload;
        // });
        builder.addMatcher(
            assuredApiSlice.endpoints.getAssured.matchFulfilled,
            (state, action) => {
                state.assured = action.payload;
            }
        );
        builder.addMatcher(
            assuredApiSlice.endpoints.createAssured.matchFulfilled,
            (state, action) => {
                // console.log(action.payload)
                state.assured = action.payload;
            }
        );
        builder.addMatcher(
            assuredApiSlice.endpoints.updateAssured.matchFulfilled,
            (state, action) => {
                state.assured = action.payload;
            }
        );
        builder.addMatcher(
            assuredApiSlice.endpoints.updateAssuredMatricule.matchFulfilled,
            (state, action) => {
                state.assured = action.payload;
            }
        );
        builder.addMatcher(
            assuredApiSlice.endpoints.updateAssuredState.matchFulfilled,
            (state, action) => {
                state.assured = action.payload;
            }
        );
        builder.addMatcher(
            assuredApiSlice.endpoints.updateAssuredType.matchFulfilled,
            (state, action) => {
                state.assured = action.payload;
            }
        );
        builder.addMatcher(
            assuredApiSlice.endpoints.updateAssuredStatus.matchFulfilled,
            (state, action) => {
                state.assured = action.payload;
            }
        );
        builder.addMatcher(
            assuredApiSlice.endpoints.addAssuredDependant.matchFulfilled,
            (state, action) => {
                state.assured = { ...state.assured, dependants: state.assured.dependants.concat(action.payload) }
            }
        );
        builder.addMatcher(
            assuredApiSlice.endpoints.addAssuredContactPerson.matchFulfilled,
            (state, action) => {
                state.assured = action.payload
            }
        );
    },
})


export const {
    setCountry,
    setAlertBox,
    setAlertText,
    updateAssuredField,
    updateAssuredInnerField,
    updateAssuredFamilyField,
    addDependant,
    addIdentityDocs,
    addWorkHistory,
    setSpouse,
    setAssured,
    setAssuredList,
    resetAssured,
    resetSpouse,
    removeDependant,
    removeIdentityDocs
} = assuredSlice.actions;
export default assuredSlice.reducer;

export const {
    useGetAssuredByQueriesMutation,
    useGetAssuredListQuery,
    useCreateAssuredMutation,
    useGetAssuredMutation,
    useUpdateAssuredParentMutation,
    useAddAssuredParentMutation,
    useUpdateAssuredMutation,
    useAddAssuredIdDocMutation,
    useUpdateAssuredIdDocMutation,
    useDeleteAssuredIdDocMutation,
    useAddAssuredDependantMutation,
    useUpdateAssuredDependantMutation,
    useDeleteAssuredDependantMutation,
    useAddAssuredFamilyMutation,
    useAddAssuredAddressMutation,
    useAddAssuredContactMutation,
    useDeleteAssuredAddressMutation,
    useDeleteAssuredContactMutation,
    useUpdateAssuredAddressMutation,
    useUpdateAssuredContactMutation,
    useAddAssuredSpouseMutation,
    useDeleteAssuredSpouseMutation,
    useUpdateAssuredSpouseMutation,
    useAddAssuredWorkHistoryMutation,
    useUpdateAssuredWorkHistoryMutation,
    useDeleteAssuredWorkHistoryMutation,
    useAddAssuredProfilImageMutation,
    useAddAssuredContactPersonMutation,
    useUpdateAssuredContactPersonMutation,
    useDeleteAssuredContactPersonMutation,
    useAddAssuredEconomicActivityMutation,
    useUpdateAssuredEconomicActivityMutation,
    useDeleteAssuredEconomicActivityMutation,
    useUpdateAssuredMatriculeMutation,
    useUpdateAssuredStateMutation,
    useUpdateAssuredStatusMutation,
    useUpdateAssuredTypeMutation
} = assuredApiSlice