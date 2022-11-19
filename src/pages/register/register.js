import React from 'react-redux';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import registerStyles from './register.module.css';
import { Link } from 'react-router-dom';

export const Register = () => {

    const handleRegister = (event) => {
        event.preventDefault();
        console.log('зарегистрироваться');
    }

    return (
        <div className={`${registerStyles.register} `}>
            <form name='register' action='#' onSubmit={handleRegister} className={`${registerStyles.form}`}>
                <h3 className={`mb-6 text text_type_main-medium ${registerStyles.text}`} >Регистрация</h3>

                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    // onChange={e => setValue(e.target.value)}
                    // icon={'CurrencyIcon'}
                    // value={value}
                    name={'name'}
                    error={false}
                    // ref={inputRef}
                    // onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass={`mb-6`}
                />
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
                    Зарегистрироваться
                </Button>

                <p className={`mb-4 text text_color_inactive text_type_main-default ${registerStyles.text}`}>Уже зарегистрированы? &nbsp;
                    <span>
                        <Link to='/login' className={`text text_type_main-default ${registerStyles.link}`}>
                            Войти
                        </Link>
                    </span>
                </p>
            </form >
        </div>
    )
}