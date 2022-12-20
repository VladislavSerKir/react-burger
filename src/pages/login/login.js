import { useDispatch, useSelector } from 'react-redux';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import loginStyles from './login.module.css';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import { useForm } from '../../hooks/useForm';
import { useEffect } from 'react';
import { setResetUserError } from '../../services/reducers/userReducer';

export const Login = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const isAuthChecked = useSelector(store => store.user.isAuthChecked);
    const userRequest = useSelector(store => store.user.userRequest)
    const user = useSelector(store => store.user.userData.name);
    const userError = useSelector(store => store.user.userError);
    const { state } = useLocation();
    const location = useLocation();

    const userErrorCode = userError?.slice(userError?.length - 3, userError?.length)

    const userData = {
        email: '',
        password: ''
    }

    useEffect(() => {
        return history.listen((location) => {
            dispatch(setResetUserError())
        })
    }, [history])

    const { values, handleChange, handleLogin } = useForm(userData);

    if (isAuthChecked && user) {
        return (
            <Redirect to={state?.from || '/'} />
        );
    }

    if (userRequest) {
        return (
            <Spinner />
        );
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

                {userError && (<p className={`mb-4 text text_type_main-default ${loginStyles.textError}`}>{userErrorCode === '403' ? 'Сессия истекла' : 'Неправильный логин или пароль'} </p>)
                }

                {!user && location.state?.from.pathname.startsWith('/profile/orders') && (<p className={`mb-4 text text_type_main-default ${loginStyles.textError}`}>Войдите чтобы посмотреть заказы пользователя</p>)
                }

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