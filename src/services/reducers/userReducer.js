import { createSlice } from '@reduxjs/toolkit';

const userState = {
    isAuthChecked: false,
    userData: {
        email: '',
        name: ''
    },
    userUpdated: false,
    registerError: null,
    registerRequest: false,
    loginError: null,
    loginRequest: false,
    logoutError: null,
    logoutRequest: false,
    updateError: null,
    updateRequest: false,
    userError: null,
    userRequest: false,
    resetRequest: false,
    resetRequestConfirmed: false,
    resetRequestError: null,
    changePasswordRequest: false,
    changePasswordConfirmed: false,
    changePasswordError: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {
        setAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload
        },
        setUser: (state, action) => {
            state.userData.email = action.payload.user.email;
            state.userData.name = action.payload.user.name;
            state.userError = null;
        },
        setUserRequest: (state, action) => {
            state.userRequest = action.payload
        },
        setUserError: (state, action) => {
            state.userError = action.payload
        },
        setResetUserError: (state, action) => {
            state.userError = null
        },
        setRegisterRequest: (state, action) => {
            state.registerRequest = action.payload
        },
        setRegisterError: (state, action) => {
            state.registerError = action.payload
        },
        setLoginRequest: (state, action) => {
            state.loginRequest = action.payload
        },
        setLoginError: (state, action) => {
            state.loginError = action.payload
        },
        setUpdateUser: (state, action) => {
            state.userData.email = action.payload.user.email;
            state.userData.name = action.payload.user.name;
            state.userUpdated = true;
        },
        setUpdateUserRequest: (state, action) => {
            state.updateRequest = action.payload
        },
        setUpdateUserError: (state, action) => {
            state.updateError = action.payload
        },
        setResetRequest: (state, action) => {
            state.resetRequest = action.payload
        },
        setResetConfirmed: (state, action) => {
            state.resetRequestConfirmed = action.payload
        },
        setResetError: (state, action) => {
            state.resetRequestError = action.payload
        },
        setChangePasswordRequest: (state, action) => {
            state.changePasswordRequest = action.payload
        },
        setChangePasswordConfirmed: (state, action) => {
            state.changePasswordConfirmed = action.payload
        },
        setChangePasswordError: (state, action) => {
            state.changePasswordError = action.payload
        },
        setLogoutUser: (state, action) => {
            state.userData.email = '';
            state.userData.name = '';
            state.userUpdated = false
        },
        setLogoutRequest: (state, action) => {
            state.logoutRequest = action.payload
        },
        setLogoutError: (state, action) => {
            state.logoutError = action.payload
        },
    },
})

export const { setAuthChecked, setUser, setUserRequest, setUserError, setResetUserError, setRegisterRequest, setRegisterError, setLoginRequest, setLoginError, setLogoutRequest, setLogoutError, setUpdateUser, setUpdateUserRequest, setUpdateUserError, setResetRequest, setResetConfirmed, setResetError, setChangePasswordRequest, setChangePasswordConfirmed, setChangePasswordError, setLogoutUser } = userSlice.actions
export const userReducer = userSlice.reducer