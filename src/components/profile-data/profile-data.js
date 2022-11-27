import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import profileDataStyles from './profile-data.module.css';
import { onUpdateUser } from '../../utils/api';
import Spinner from '../../pages/spinner/spinner';

export const ProfileData = () => {
    const store = useSelector(store => store);
    const updateRequest = useSelector(store => store.user.updateRequest)
    const [isFormEdited, setIsFormEdited] = useState(false)
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        name: store.user.userData.name,
        email: store.user.userData.email,
        password: ''
    });

    const isActive = isFormEdited && (userData.name.length ? true : false) && (userData.password.length > 5 ? true : false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
        setIsFormEdited(true)
    }

    const handleResetForm = (e) => {
        setUserData({
            name: store.user.userData.name,
            email: store.user.userData.email,
            password: ''
        })
        setIsFormEdited(false)
    }

    useEffect(() => {
        handleResetForm()
    }, [updateRequest]);

    if (updateRequest) {
        return (
            <Spinner />
        );
    }

    const handleUpdateUser = (e) => {
        e.preventDefault();
        if (userData.name) {
            dispatch(onUpdateUser(userData))
            setUserData({
                password: ''
            })
            setIsFormEdited(false)
        }
    }

    return (
        <form
            name='edit-data'
            action='#'
            onSubmit={handleUpdateUser}
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
            <div className={`${profileDataStyles.profileButtons}`}>
                <Button
                    htmlType='button'
                    type="secondary"
                    size="large"
                    disabled={!isFormEdited}
                    onClick={handleResetForm}
                >
                    Отмена
                </Button>
                <Button
                    htmlType='submit'
                    type="primary"
                    size="large"
                    disabled={!isActive}
                >
                    Сохранить
                </Button>
            </div>

        </form >
    )
}