import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import { useForm } from '../../hooks/useForm';
import { useEffect, FC } from 'react';
import { setResetUserError } from '../../services/reducers/userReducer';
import { useTypedSelector } from '../../services/types';
import { useTypedDispatch } from '../../services/types';
import { IUseLocation } from '../../types';

export const Login: FC = () => {

    const history = useHistory();
    const dispatch = useTypedDispatch();
    const isAuthChecked = useTypedSelector(store => store.user.isAuthChecked);
    const loginRequest = useTypedSelector(store => store.user.loginRequest)
    const user = useTypedSelector(store => store.user.userData.name);
    const userError = useTypedSelector(store => store.user.userError);
    const { state } = useLocation<IUseLocation>();
    const location = useLocation<IUseLocation>();

    const userErrorCode = userError?.message?.slice(userError?.message.length - 3, userError?.message?.length)

    const userData = {
        name: '',
        email: '',
        password: '',
        token: ''
    }

    useEffect(() => {
        return history.listen((location) => {
            dispatch(setResetUserError)
        })
    }, [history])

    const { values, handleChange, handleLogin } = useForm(userData);

    if (isAuthChecked && user) {
        return (
            <Redirect to={state?.from || '/'} />
        );
    }

    if (loginRequest) {
        return (
            <Spinner />
        );
    }

    return (
        <div className={`login`}>

            <form
                name='login'
                action='#'
                onSubmit={handleLogin}
                className={`login__form`}
            >
                <h3 className={`mb-6 text text_type_main-medium`} >Вход</h3>
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

                {userError && (<p className={`mb-4 text text_type_main-default login__error`}>{userErrorCode === '403' ? 'Сессия истекла' : 'Неправильный логин или пароль'} </p>)
                }

                {!user && location.state?.from.pathname.startsWith('/profile/orders') && (<p className={`mb-4 text text_type_main-default login__error`}>Войдите чтобы посмотреть заказы пользователя</p>)
                }

                <Button
                    htmlType='submit'
                    type="primary"
                    size="large"
                    extraClass={`mb-20`}
                >
                    Войти
                </Button>
                <p className={`mb-4 text text_color_inactive text_type_main-default`}>Вы — новый пользователь? &nbsp;
                    <span>
                        <Link to='/register' className={`text text_type_main-default login__link`}>
                            Зарегистрироваться
                        </Link>
                    </span>
                </p>
                <p className={`text text_color_inactive text_type_main-default`}>Забыли пароль? &nbsp;
                    <span>
                        <Link to='/forgot-password' className={`text text_type_main-default login__link`}>
                            Восстановить пароль
                        </Link>
                    </span>
                </p>
            </form >
        </div>
    )
}