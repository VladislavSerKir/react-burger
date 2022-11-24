import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/api';
import { checkResponse } from '../../utils/utils';
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
            console.log('isCookie')
            dispatch(getUser())
            dispatch(setAuthChecked())

        } else {
            console.log('noCookie')
            dispatch(setAuthChecked())
        }
    }
);

export const getUser = createAsyncThunk(
    'user/getUser',
    async function (_, { dispatch }) {
        return userRequest()
            .then((user) => {
                console.log('userRequest', user)
                dispatch(setUserRequest(true))
                dispatch(setUser(user))
                dispatch(setUserRequest(false))
            })
            // .then((user) => {
            //     console.log('setUser', user)
            //     dispatch(setUser(user))
            //     dispatch(setUserRequest(false))
            // })
            .catch((err) => {
                console.log('setUserError')
                dispatch(setUserRequest(true))
                dispatch(setUserError(err))
                dispatch(setUserRequest(false))
            })
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {
        setAuthChecked: (state, action) => {
            state.isAuthChecked = true;
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
        setEditUser: (state, action) => {
            state.userData.email = action.payload.user.email;
            state.userData.name = action.payload.user.name;
        },
        setEditUserRequest: (state, action) => {
            state.updateRequest = action.payload
        },
        setEditUserError: (state, action) => {
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
        }
    },
})

export const { setAuthChecked, setUser, setUserRequest, setUserError, setEditUser, setEditUserRequest, setEditUserError, setResetRequest, setResetConfirmed, setResetError, setChangePasswordRequest, setChangePasswordConfirmed, setChangePasswordError, setLogoutUser } = userSlice.actions
export const userReducer = userSlice.reducer