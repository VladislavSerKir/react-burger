import React from 'react-redux';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import loginStyles from './login.module.css';
import { Link } from 'react-router-dom';

export const Login = () => {

    const handleLogin = (event) => {
        event.preventDefault();
        console.log('войти');
    }

    return (
        <div className={`${loginStyles.login} `}>
            <form name='login' action='#' onSubmit={handleLogin} className={`${loginStyles.form}`}>
                <h3 className={`mb-6 text text_type_main-medium ${loginStyles.text}`} >Вход</h3>
                <EmailInput
                    extraClass={`mb-6`}
                    // onChange={onChange}
                    // value={value}
                    name={'email'}
                    isIcon={false}
                />
                <PasswordInput
                    extraClass={`mb-6`}
                    // onChange={onChange}
                    // value={value}
                    name={'password'}
                // icon="EditIcon"
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