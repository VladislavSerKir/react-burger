import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { onLogin, onLogout, onRegister, onReset, onResetPassword, onUpdateUser } from '../actions/actions';
import { TError, TUserFetchResponse } from '../types';
import { TUserState } from '../types/userType';

const userState: TUserState = {
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
        setAuthChecked: (state, action: PayloadAction<boolean>) => {
            state.isAuthChecked = action.payload
        },
        setUser: (state, action: PayloadAction<TUserFetchResponse>) => {
            state.userData.email = action.payload.user.email;
            state.userData.name = action.payload.user.name;
            state.userError = null;
        },
        setUserRequest: (state, action: PayloadAction<boolean>) => {
            state.userRequest = action.payload
        },
        setUserError: (state, action: PayloadAction<TError>) => {
            state.userError = action.payload
        },
        setResetUserError: (state) => {
            state.userError = null
        },
    },

    extraReducers: (builder) => {
        builder.addCase(onRegister.pending, (state) => {
            state.registerRequest = true
        })
        builder.addCase(onRegister.fulfilled, (state, action) => {
            state.userData.email = action.payload.user.email;
            state.userData.name = action.payload.user.name;
            state.userError = null;
            state.registerRequest = false
        })
        builder.addCase(onRegister.rejected, (state, action) => {
            state.registerError = action.payload
            state.registerRequest = false
        })
        builder.addCase(onLogin.pending, (state) => {
            state.loginRequest = true
        })
        builder.addCase(onLogin.fulfilled, (state, action) => {
            state.userData.email = action.payload.user.email;
            state.userData.name = action.payload.user.name;
            state.userError = null;
            state.loginRequest = false
        })
        builder.addCase(onLogin.rejected, (state, action) => {
            state.loginError = action.payload
            state.loginRequest = false
        })
        builder.addCase(onLogout.pending, (state) => {
            state.logoutRequest = true
        })
        builder.addCase(onLogout.fulfilled, (state) => {
            state.userData.email = '';
            state.userData.name = '';
            state.userUpdated = false;
            state.logoutRequest = false
        })
        builder.addCase(onLogout.rejected, (state, action) => {
            state.logoutError = action.payload
            state.logoutRequest = false
        })
        builder.addCase(onReset.pending, (state) => {
            state.resetRequest = true
        })
        builder.addCase(onReset.fulfilled, (state, action) => {
            state.resetRequestConfirmed = action.payload.success
            state.resetRequest = false
        })
        builder.addCase(onReset.rejected, (state, action) => {
            state.resetRequestError = action.payload
            state.resetRequest = false
        })
        builder.addCase(onResetPassword.pending, (state) => {
            state.changePasswordRequest = true
        })
        builder.addCase(onResetPassword.fulfilled, (state, action) => {
            state.changePasswordConfirmed = action.payload.success
            state.changePasswordRequest = false
        })
        builder.addCase(onResetPassword.rejected, (state, action) => {
            state.changePasswordError = action.payload
            state.changePasswordRequest = false
        })
        builder.addCase(onUpdateUser.pending, (state) => {
            state.updateRequest = true
        })
        builder.addCase(onUpdateUser.fulfilled, (state, action) => {
            state.userData.email = action.payload.user.email;
            state.userData.name = action.payload.user.name;
            state.userUpdated = true;
            state.updateRequest = false
        })
        builder.addCase(onUpdateUser.rejected, (state, action) => {
            state.userError = action.payload
            state.updateRequest = false
        })
    }
})

export const { setAuthChecked, setResetUserError, setUserRequest, setUserError, setUser } = userSlice.actions
export const userReducer = userSlice.reducer