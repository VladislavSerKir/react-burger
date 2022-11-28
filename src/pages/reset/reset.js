import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import resetStyles from './reset.module.css';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../spinner/spinner';
import { useForm } from '../../hooks/useForm';

export const Reset = () => {

    const isAuthChecked = useSelector(store => store.user.isAuthChecked);
    const resetRequest = useSelector(store => store.user.resetRequest)
    const user = useSelector(store => store.user.userData.name);
    const { state } = useLocation()
    const store = useSelector(store => store);

    const userData = {
        email: '',
    }

    const { values, handleChange, handleReset } = useForm(userData);

    if (store.user.resetRequestConfirmed) {
        return <Redirect to={{ pathname: '/reset-password' }} />
    }

    if (isAuthChecked && user) {
        return (
            <Redirect to={state?.from || '/'} />
        );
    }

    if (resetRequest) {
        return (
            <Spinner />
        );
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
                    value={values.email}
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