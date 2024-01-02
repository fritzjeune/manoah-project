import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activePage: sessionStorage.getItem("activePage") !== 'undefined' ? JSON.parse(sessionStorage.getItem("activePage")) : 0,
    activeFormWindows: 0,
    isPopupVisible: false,
    notificationBody: {},
    openNotif: false,
    isLoaded: true,
    popContent: null,
    displayMenu: false,
    pages: [{link: 'Home', href: "/", role: 2}, {link:'Assuree', href: "/assured", role: 2}, {link: 'Entreprises', href: "/enterprise", role: 2}, { link: 'Nouvelles', href: "/news", role: 2}, {link:'Ressources', href: "/ressources", role: 2}]
}


export const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        setActivePage: (state, action) => {
            state.activePage = action.payload
            state.displayMenu = false
            window.sessionStorage.setItem("activePage", JSON.stringify(state.activePage))
        },
        openPopup: (state) => {
            state.isPopupVisible = true
        },
        closePopup: (state) => {
            state.isPopupVisible = false
            state.popContent = null
        },
        openNotification: (state) => {
            state.openNotif = true
        },
        closeNotification: (state) => {
            state.openNotif = false
        },
        setNotificationBody: (state, action) => {
            state.notificationBody = action.payload
            state.openNotif = true
        },
        setPopContent: (state, action) => {
            state.popContent = action.payload
        },
        toggleDisplayMenu: (state) => {
            state.displayMenu = !state.displayMenu
        },
        nextFormWindows: (state) => {
            if (state.activeFormWindows > 6) {
                state.activeFormWindows = 0
            } else {
                state.activeFormWindows = state.activeFormWindows + 1
            }
        },
        prevFormWindows: (state) => {
            if (state.activeFormWindows > 0) {
                state.activeFormWindows = state.activeFormWindows - 1
            }
        },
        changeActiveFormWindows: (state, action) => {
            state.activeFormWindows = action.payload
        },
    },
    extraReducers: (builder) => {
        
    }
})


export const { setActivePage, setUser, logOut, toggleDisplayMenu, setNotificationBody, openNotification, closeNotification, setPopContent, closePopup, openPopup, nextFormWindows, prevFormWindows, changeActiveFormWindows } = pageSlice.actions;
export default pageSlice.reducer;