import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../spinner/spinner';
import { useForm } from '../../hooks/useForm';

export const ResetConfirm = () => {

    const isAuthChecked = useSelector(store => store.user.isAuthChecked);
    const user = useSelector(store => store.user.userData.name);
    const changePasswordRequest = useSelector(store => store.user.changePasswordRequest)
    const { state } = useLocation()
    const store = useSelector(store => store);

    const userData = {
        password: '',
        token: ''
    }

    const { values, handleChange, handleResetPassword } = useForm(userData);

    if (store.user.changePasswordConfirmed) {
        return <Redirect to={{ pathname: '/profile' }} />
    }

    if (isAuthChecked && user) {
        return (
            <Redirect to={state?.from || '/'} />
        );
    }

    if (changePasswordRequest) {
        return (
            <Spinner />
        );
    }

    return (
        <div className={`reset-confirm`}>
            <form
                name='register'
                action='#'
                onSubmit={handleResetPassword}
                className={`reset-confirm__form`}
            >
                <h3 className={`mb-6 text text_type_main-medium`} >Восстановление пароля</h3>
                <PasswordInput
                    extraClass={`mb-6`}
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                    placeholder={'Введите новый пароль'}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={handleChange}
                    value={values.token}
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
                <p className={`mb-4 text text_color_inactive text_type_main-default`}>Вспомнили пароль? &nbsp;
                    <span>
                        <Link to='/login' className={`text text_type_main-default reset-confirm__link`}>
                            Войти
                        </Link>
                    </span>
                </p>
            </form >
        </div>
    )
}