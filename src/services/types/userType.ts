export type TUserState = {
    isAuthChecked: boolean,
    userData: { name: string, email: string },
    userUpdated: boolean,
    registerError: null | string,
    registerRequest: boolean,
    loginError: null | string,
    loginRequest: boolean,
    logoutError: null | string,
    logoutRequest: boolean,
    updateError: null | string,
    updateRequest: boolean,
    userError: null | string,
    userRequest: boolean,
    resetRequest: boolean,
    resetRequestConfirmed: boolean,
    resetRequestError: null | string,
    changePasswordRequest: boolean,
    changePasswordConfirmed: boolean,
    changePasswordError: null | string
}