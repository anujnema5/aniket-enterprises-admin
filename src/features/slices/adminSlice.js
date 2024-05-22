import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const getUserFromLocalStorage = () => {
    let admin = null;

    if (typeof localStorage !== 'undefined') {
        const isAdminExist = localStorage.getItem('admin');
        if (isAdminExist !== null) {
            try {
                admin = JSON.parse(isAdminExist);
            } catch (error) {
                console.error('Error parsing admin data from localStorage:', error);
            }
        }
    }
    return admin;
};

const getTokenFromLocalStorage = () => {
    let admin = null;

    if (typeof localStorage !== 'undefined') {
        const isTokenExist = localStorage.getItem('accessToken');
        if (isTokenExist !== null) {
            try {
                admin = JSON.parse(isTokenExist);
            } catch (error) {
                console.error('Error parsing admin data from localStorage:', error);
            }
        }
    }
    return admin;
};


const initialState = {
    admin: getUserFromLocalStorage(),
    token: getTokenFromLocalStorage()
}


const admin = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setadminWithToken: (state, action) => {
            const { admin, accessToken } = action.payload
            state.admin = admin
            state.token = accessToken
            localStorage.setItem('admin', JSON.stringify(admin));
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
        },

        logout: (state) => {
            state.admin = null;
            state.token = null;
            localStorage.removeItem('admin');
            localStorage.removeItem('accessToken');
        }
    }
})

export const { setadminWithToken, logout } = admin.actions;
export const getadmin = () => useSelector((state) => state.admin);
export default admin.reducer
