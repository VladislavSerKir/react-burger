import { useState } from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import resetStyles from './reset.module.css';
import { Link, Redirect } from 'react-router-dom';
import { onReset } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';

export const Reset = () => {
    const store = useSelector(store => store);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        email: ''
    });

    if (store.user.resetRequestConfirmed) {
        return <Redirect to={{ pathname: '/reset-password' }} />
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleReset = (event) => {
        event.preventDefault();
        console.log('сброс пароля', userData.email);
        dispatch(onReset(userData))
    }

    return (
        <div className={`${resetStyles.reset} `}>
            <form
                name='register'
                action='#'
                onSubmit={handleReset}
                className={`${resetStyles.form}`}
            >
                <h3 className={`mb-6 text text_type_main-medium ${resetStyles.text}`} >Сброс пароля</h3>
                <EmailInput
                    extraClass={`mb-6`}
                    onChange={handleChange}
                    value={userData.email}
                    name={'email'}
                    isIcon={false}
                />
                <Button
                    htmlType='submit'
                    type="primary"
                    size="large"
                    extraClass={`mb-20`}
                >
                    Восстановить
                </Button>

                <p className={`mb-4 text text_color_inactive text_type_main-default ${resetStyles.text}`}>Вспомнили пароль? &nbsp;
                    <span>
                        <Link to='/login' className={`text text_type_main-default ${resetStyles.link}`}>
                            Войти
                        </Link>
                    </span>
                </p>
            </form >
        </div>
    )
}