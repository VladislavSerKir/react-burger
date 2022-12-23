import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../spinner/spinner';
import { useForm } from '../../hooks/useForm';

export const Register = () => {

    const isAuthChecked = useSelector(store => store.user.isAuthChecked);
    const registerRequest = useSelector(store => store.user.registerRequest)
    const user = useSelector(store => store.user.userData.name);
    const { state } = useLocation()

    const userData = {
        name: '',
        email: '',
        password: ''
    }

    const { values, handleChange, handleRegister } = useForm(userData);

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
        <div className={`register`}>
            <form
                name='register'
                action='#'
                onSubmit={handleRegister}
                className={`register__form`}
            >
                <h3 className={`mb-6 text text_type_main-medium`} >Регистрация</h3>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    value={values.name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass={`mb-6`}
                />
                <EmailInput
                    extraClass={`mb-6`}
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    isIcon={false}
                />
                <PasswordInput
                    extraClass={`mb-6`}
                    onChange={handleChange}
                    value={values.password}
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

                <p className={`mb-4 text text_color_inactive text_type_main-default`}>Уже зарегистрированы? &nbsp;
                    <span>
                        <Link to='/login' className={`text text_type_main-default register__link`}>
                            Войти
                        </Link>
                    </span>
                </p>
            </form >
        </div>
    )
}