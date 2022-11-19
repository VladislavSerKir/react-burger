import React from 'react-redux';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import resetConfirmStyles from './reset-confirm.module.css';
import { Link } from 'react-router-dom';

export const ResetConfirm = () => {

    const handleResetConfirm = (event) => {
        event.preventDefault();
        console.log('подтвердить сброс пароля');
    }

    return (
        <div className={`${resetConfirmStyles.resetConfirm} `}>
            <form name='register' action='#' onSubmit={handleResetConfirm} className={`${resetConfirmStyles.form}`}>
                <h3 className={`mb-6 text text_type_main-medium ${resetConfirmStyles.text}`} >Восстановление пароля</h3>
                <PasswordInput
                    extraClass={`mb-6`}
                    // onChange={onChange}
                    // value={value}
                    name={'password'}
                    placeholder={'Введите новый пароль'}
                // icon="EditIcon"
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
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