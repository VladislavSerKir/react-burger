import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect } from 'react';
import Spinner from '../../pages/spinner/spinner';
import { useForm } from '../../hooks/useForm';
import { useTypedSelector } from '../../services/types';

export const ProfileData = () => {

    const store = useTypedSelector(store => store);
    const updateRequest = useTypedSelector(store => store.user.updateRequest)
    const userUpdated = useTypedSelector(store => store.user.userUpdated)

    const userData = {
        name: store.user.userData.name,
        email: store.user.userData.email,
        password: '',
        token: ''
    }

    const { values, handleChange, isFormEdited, handleResetForm, handleUpdateUser } = useForm(userData);

    const isActive = isFormEdited && (values.name.length ? true : false) && (values.password.length > 5 ? true : false)

    useEffect(() => {
        handleResetForm()
    }, [updateRequest]);

    if (updateRequest) {
        return (
            <Spinner />
        );
    }

    return (
        <form
            name='edit-data'
            action='#'
            onSubmit={handleUpdateUser}
            className={`mt-20 profile-data`}
        >
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={handleChange}
                icon={'EditIcon'}
                value={values.name}
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
                value={values.email}
                name={'email'}
                isIcon={true}
            />
            <PasswordInput
                extraClass={`mb-6`}
                onChange={handleChange}
                value={values.password}
                name={'password'}
                icon="EditIcon"
            />
            <div className={`profile-data__buttons`}>
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

            {
                userUpdated && (<p className={`mt-5 text text_color_inactive text_type_main-default profile-data__status`}>Изменения сохранены</p>)
            }

        </form >
    )
}