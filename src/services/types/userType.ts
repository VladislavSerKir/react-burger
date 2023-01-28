import { TError } from "."

export type TUserState = {
    isAuthChecked: boolean,
    userData: { name: string, email: string },
    userUpdated: boolean,
    registerError: null | undefined | TError,
    registerRequest: boolean,
    loginError: null | undefined | TError,
    loginRequest: boolean,
    logoutError: null | undefined | TError,
    logoutRequest: boolean,
    updateError: null | undefined | TError,
    updateRequest: boolean,
    userError: null | undefined | TError,
    userRequest: boolean,
    resetRequest: boolean,
    resetRequestConfirmed: boolean,
    resetRequestError: null | undefined | TError,
    changePasswordRequest: boolean,
    changePasswordConfirmed: boolean,
    changePasswordError: null | undefined | TError,
}