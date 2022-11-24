import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import resetConfirmStyles from './reset-confirm.module.css';
import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onResetPassword } from '../../utils/api';

export const ResetConfirm = () => {
    const store = useSelector(store => store);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        password: '',
        token: ''
    });

    if (store.user.changePasswordConfirmed) {
        return <Redirect to={{ pathname: '/profile' }} />
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleResetPassword = (event) => {
        event.preventDefault();
        console.log('подтвердить сброс пароля');
        dispatch(onResetPassword(userData))
    }

    return (
        <div className={`${resetConfirmStyles.resetConfirm} `}>
            <form
                name='register'
                action='#'
                onSubmit={handleResetPassword}
                className={`${resetConfirmStyles.form}`}
            >
                <h3 className={`mb-6 text text_type_main-medium ${resetConfirmStyles.text}`} >Восстановление пароля</h3>
                <PasswordInput
                    extraClass={`mb-6`}
                    onChange={handleChange}
                    value={userData.password}
                    name={'password'}
                    placeholder={'Введите новый пароль'}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={handleChange}
                    value={userData.token}
                    name={'token'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass={`mb-6`}
                />
                <Button
                    htmlType='submit'
                    type="primary"
                    size="large"
                    extraClass={`mb-20`}
                >
                    Сохранить
                </Button>
                <p className={`mb-4 text text_color_inactive text_type_main-default ${resetConfirmStyles.text}`}>Вспомнили пароль? &nbsp;
                    <span>
                        <Link to='/login' className={`text text_type_main-default ${resetConfirmStyles.link}`}>
                            Войти
                        </Link>
                    </span>
                </p>
            </form >
        </div>
    )
}