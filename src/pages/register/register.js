import React, { useState } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import registerStyles from './register.module.css';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { onRegister } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../spinner/spinner';

export const Register = () => {
    const isAuthChecked = useSelector(store => store.user.isAuthChecked);
    const registerRequest = useSelector(store => store.user.registerRequest)
    const user = useSelector(store => store.user.userData.name);
    const { state } = useLocation()
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleRegister = (event) => {
        event.preventDefault();
        dispatch(onRegister(userData));
        setUserData({
            name: '',
            email: '',
            password: ''
        })
    }

    if (registerRequest) {
        return (
            <Spinner />
        );
    }

    if (isAuthChecked && user) {
        return (
            <Redirect to={state?.from || '/'} />
        );
    }

    return (
        <div className={`${registerStyles.register} `}>
            <form
                name='register'
                action='#'
                onSubmit={handleRegister}
                className={`${registerStyles.form}`}
            >
                <h3 className={`mb-6 text text_type_main-medium ${registerStyles.text}`} >Регистрация</h3>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    value={userData.name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass={`mb-6`}
                />
                <EmailInput
                    extraClass={`mb-6`}
                    onChange={handleChange}
                    value={userData.email}
                    name={'email'}
                    isIcon={false}
                />
                <PasswordInput
                    extraClass={`mb-6`}
                    onChange={handleChange}
                    value={userData.password}
                    name={'password'}
                />
                <Button
                    htmlType='submit'
                    type="primary"
                    size="large"
                    extraClass={`mb-20`}
                >
                    Зарегистрироваться
                </Button>

                <p className={`mb-4 text text_color_inactive text_type_main-default ${registerStyles.text}`}>Уже зарегистрированы? &nbsp;
                    <span>
                        <Link to='/login' className={`text text_type_main-default ${registerStyles.link}`}>
                            Войти
                        </Link>
                    </span>
                </p>
            </form >
        </div>
    )
}