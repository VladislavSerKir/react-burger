import { useState } from "react";
import { onLogin, onRegister, onReset, onResetPassword, onUpdateUser } from '../services/actions/actions';
import { useTypedSelector } from "../services/types";
import { useTypedDispatch } from "../services/types";
import { TUser } from "../services/types";

export interface IInputValuesProps {
    // inputValues: TInputValues

    name?: string,
    email?: string,
    password?: string,
    token?: string
}

export type TInputValues = {
    name: string,
    email: string,
    password: string,
    token: string
}

type TEventTarget = {
    target: {
        value: string,
        name: string
    }
}

// export const useForm: FC<TUser> = (inputValues) => {

export const useForm = (inputValues: TUser) => {

    const store = useTypedSelector(store => store);
    const [values, setValues] = useState(inputValues);
    const [isFormEdited, setIsFormEdited] = useState(false);
    const dispatch = useTypedDispatch();


    const handleChange = (event: TEventTarget) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
        setIsFormEdited(true)
    };

    const handleResetForm = () => {
        setValues({
            // name: store.user.userData.name,
            // email: store.user.userData.email,
            // password: ''

            name: store.user.userData.name,
            email: store.user.userData.email,
            password: '',
            token: ''
        })
        setIsFormEdited(false)
    }

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!values.email || values.password!.length < 6) {
            return;
        }
        dispatch(onLogin(values));
        setValues({
            // email: '',
            // password: ''

            name: '',
            email: '',
            password: '',
            token: ''
        });
    }

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(onRegister(values));
        setValues({
            // name: '',
            // email: '',
            // password: ''

            name: '',
            email: '',
            password: '',
            token: ''
        })
    }

    const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(onReset(values))
    }

    const handleResetPassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(onResetPassword(values))
    }

    const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (values.name) {
            dispatch(onUpdateUser(values))
            setValues({
                // password: ''

                name: '',
                email: '',
                password: '',
                token: ''
            })
            setIsFormEdited(false)
        }
    }

    return { values, handleChange, isFormEdited, setIsFormEdited, handleResetForm, handleLogin, handleRegister, handleReset, handleResetPassword, handleUpdateUser };
}