import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import resetConfirmStyles from './reset-confirm.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const ResetConfirm = () => {
    const [userData, setUserData] = useState({
        newPassword: '',
        code: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleConfirmReset = (event) => {
        event.preventDefault();
        console.log('подтвердить сброс пароля');
    }

    return (
        <div className={`${resetConfirmStyles.resetConfirm} `}>
            <form
                name='register'
                action='#'
                onSubmit={handleConfirmReset}
                className={`${resetConfirmStyles.form}`}
            >
                <h3 className={`mb-6 text text_type_main-medium ${resetConfirmStyles.text}`} >Восстановление пароля</h3>
                <PasswordInput
                    extraClass={`mb-6`}
                    onChange={handleChange}
                    value={userData.newPassword}
                    name={'newPassword'}
                    placeholder={'Введите новый пароль'}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={handleChange}
                    value={userData.code}
                    name={'code'}
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