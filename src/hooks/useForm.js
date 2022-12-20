import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onLogin, onRegister, onReset, onResetPassword, onUpdateUser } from '../services/actions/actions';

export function useForm(inputValues) {

    const store = useSelector(store => store);
    const [values, setValues] = useState(inputValues);
    const [isFormEdited, setIsFormEdited] = useState(false);
    const dispatch = useDispatch();

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