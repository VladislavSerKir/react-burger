import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookie';
import { userRequest } from '../../utils/utils';

const userState = {
    isAuthChecked: false,
    userData: {
        email: '',
        name: ''
    },
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

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async function (_, { dispatch }) {
        if (getCookie('accessToken')) {
            dispatch(getUser())
            dispatch(setAuthChecked(true))
        } else {
            dispatch(setAuthChecked(true))
        }
    }
);

export const getUser = createAsyncThunk(
    'user/getUser',
    async function (_, { dispatch }) {
        dispatch(setUserRequest(true))
        return userRequest()
            .then((user) => {
                dispatch(setUser(user))
            })
            .catch((err) => {
                dispatch(setUserError(err))
            })
            .finally(() => {
                dispatch(setUserRequest(false))
            })
    }
);

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
        },
        setUserRequest: (state, action) => {
            state.userRequest = action.payload
        },
        setUserError: (state, action) => {
            state.userError = action.payload
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
        },
        setLogoutRequest: (state, action) => {
            state.logoutRequest = action.payload
        },
        setLogoutError: (state, action) => {
            state.logoutError = action.payload
        },
    },
})

export const { setAuthChecked, setUser, setUserRequest, setUserError, setRegisterRequest, setRegisterError, setLoginRequest, setLoginError, setLogoutRequest, setLogoutError, setUpdateUser, setUpdateUserRequest, setUpdateUserError, setResetRequest, setResetConfirmed, setResetError, setChangePasswordRequest, setChangePasswordConfirmed, setChangePasswordError, setLogoutUser } = userSlice.actions
export const userReducer = userSlice.reducer