import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/api';
import { checkResponse } from '../../utils/utils';

const userState = {
    isAuthenticated: false,
    isRegistrationFailed: false,
    isLoginFailed: false,
    userData: {
        email: '',
        password: '',
        name: ''
    }
};

// export const getUserData = createAsyncThunk(
//     'user',
//     async function (_, { dispatch }) {
//         return fetch(`${BASE_URL}/auth/user`)
//             .then(checkResponse)
//             .then((data) => {
//                 // dispatch(setIngredients(data))
//             })
//             .catch((error) => {
//                 // dispatch(loadDataFail(error))
//                 console.warn(error)
//             })
//     }
// );

export const userSlice = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {
        setUser: (state, action) => {
            state.userData.email = action.payload.user.email;
            state.userData.name = action.payload.user.name;
            state.isAuthenticated = true
        },
        setRegistrationFailed: (state, action) => {
            state.isRegistrationFailed = true;
            state.isAuthenticated = false;
        },
        setLoginFailed: (state, action) => {
            state.isLoginFailed = true;
        },
        removeUser: (state, action) => {
            state.userData.email = '';
            state.userData.name = '';
            state.userData.password = '';
            state.isAuthenticated = false;
        }
    },
})

export const { setUser, setRegistrationFailed, setLoginFailed, removeUser } = userSlice.actions
export const userReducer = userSlice.reducer