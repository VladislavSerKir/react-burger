import { FC } from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useLocation } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import { useForm } from '../../hooks/useForm';
import { useTypedSelector } from '../../services/types';
import { IUseLocation } from '../../types';

export const Reset: FC = () => {

    const isAuthChecked = useTypedSelector(store => store.user.isAuthChecked);
    const resetRequest = useTypedSelector(store => store.user.resetRequest)
    const user = useTypedSelector(store => store.user.userData.name);
    const { state } = useLocation<IUseLocation>()
    const store = useTypedSelector(store => store);

    const userData = {
        name: '',
        email: '',
        password: '',
        token: ''
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
        <div className={`reset`}>
            <form
                name='register'
                action='#'
                onSubmit={handleReset}
                className={`reset__form`}
            >
                <h3 className={`mb-6 text text_type_main-medium`} >Сброс пароля</h3>
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

                <p className={`mb-4 text text_color_inactive text_type_main-default`}>Вспомнили пароль? &nbsp;
                    <span>
                        <Link to='/login' className={`text text_type_main-default reset__link`}>
                            Войти
                        </Link>
                    </span>
                </p>
            </form >
        </div>
    )
}