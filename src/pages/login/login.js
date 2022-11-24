import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import loginStyles from './login.module.css';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { onLogin } from '../../utils/api';

export const Login = () => {
    // const store = useSelector(store => store);
    const dispatch = useDispatch();
    // const location = useLocation();
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    // if (store.user.userData.email) {
    //     return (
    //         <Redirect to={{ pathname: "/login", state: { from: location } }} />
    //     );
    // }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('войти', userData);
        if (!userData.email || !userData.password) {
            return;
        }
        dispatch(onLogin(userData));
        setUserData({
            email: '',
            password: ''
        });
    }

    return (
        <div className={`${loginStyles.login}`}>
            <form
                name='login'
                action='#'
                onSubmit={handleLogin}
                className={`${loginStyles.form}`}
            >
                <h3 className={`mb-6 text text_type_main-medium ${loginStyles.text}`} >Вход</h3>
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
                    Войти
                </Button>
                <p className={`mb-4 text text_color_inactive text_type_main-default ${loginStyles.text}`}>Вы — новый пользователь? &nbsp;
                    <span>
                        <Link to='/register' className={`text text_type_main-default ${loginStyles.link}`}>
                            Зарегистрироваться
                        </Link>
                    </span>
                </p>
                <p className={`text text_color_inactive text_type_main-default ${loginStyles.text}`}>Забыли пароль? &nbsp;
                    <span>
                        <Link to='/forgot-password' className={`text text_type_main-default ${loginStyles.link}`}>
                            Восстановить пароль
                        </Link>
                    </span>
                </p>
            </form >
        </div>
    )
}