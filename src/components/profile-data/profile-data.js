import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react';
import profileDataStyles from './profile-data.module.css';

export const ProfileData = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleResetForm = (e) => {
        setUserData({
            name: 'a',
            email: 'a',
            password: 'a'
        })
    }

    const handleEditUser = (event) => {
        event.preventDefault();
        console.log('редактировать данные', userData);

    }

    return (
        <form
            name='edit-data'
            action='#'
            onSubmit={handleEditUser}
            className={`mt-30 ${profileDataStyles.profileData}`}
        >
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={handleChange}
                icon={'EditIcon'}
                value={userData.name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass={`mb-6`}
            />
            <EmailInput
                extraClass={`mb-6`}
                placeholder={'Логин'}
                onChange={handleChange}
                value={userData.email}
                name={'email'}
                isIcon={true}
            />
            <PasswordInput
                extraClass={`mb-6`}
                onChange={handleChange}
                value={userData.password}
                name={'password'}
                icon="EditIcon"
            />
            <Button
                htmlType='submit'
                type="primary"
                size="large"
                extraClass={`mt-10`}
            >
                Сохранить
            </Button>
            <Button
                htmlType='button'
                type="secondary"
                size="large"
                extraClass={`mt-5`}
                onClick={handleResetForm}
            >
                Отмена
            </Button>
        </form >
    )
}