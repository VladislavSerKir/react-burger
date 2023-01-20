import { useState, FC } from "react";
import { onLogin, onRegister, onReset, onResetPassword, onUpdateUser } from '../services/actions/actions';
import { useTypedSelector } from "../services/types";
import { useTypedDispatch } from "../services/types";
import { TUser } from "../services/types";

interface IInputValuesProps {
    inputValues: TInputValues
}

type TInputValues = {
    name: string,
    email: string,
    password: string,
    token: string
}

export const useForm: FC<IInputValuesProps> = (inputValues) => {

    const store = useTypedSelector(store => store);
    const [values, setValues] = useState(inputValues);
    const [isFormEdited, setIsFormEdited] = useState(false);
    const dispatch = useTypedDispatch();

    const handleChange = (event) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
        setIsFormEdited(true)
    };

    const handleResetForm = (e) => {
        setValues({
            name: store.user.userData.name,
            email: store.user.userData.email,
            password: ''
        })
        setIsFormEdited(false)
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (!values.email || values.password.length < 6) {
            return;
        }
        dispatch(onLogin(values));
        setValues({
            email: '',
            password: ''
        });
    }

    const handleRegister = (event) => {
        event.preventDefault();
        dispatch(onRegister(values));
        setValues({
            name: '',
            email: '',
            password: ''
        })
    }

    const handleReset = (event) => {
        event.preventDefault();
        dispatch(onReset(values))
    }

    const handleResetPassword = (event) => {
        event.preventDefault();
        dispatch(onResetPassword(values))
    }

    const handleUpdateUser = (e) => {
        e.preventDefault();
        if (values.name) {
            dispatch(onUpdateUser(values))
            setValues({
                password: ''
            })
            setIsFormEdited(false)
        }
    }

    return { values, handleChange, setValues, isFormEdited, setIsFormEdited, handleResetForm, handleLogin, handleRegister, handleReset, handleResetPassword, handleUpdateUser };
}