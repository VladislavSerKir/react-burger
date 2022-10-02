import React from 'react';
import { Logo, ProfileIcon, ListIcon, BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderMenuButton from '../header-menu-button/header-menu-button';
import appHeaderStyles from './app-header.module.css';

function AppHeader() {
    return (
        <header className={appHeaderStyles.header}>
            <nav className={appHeaderStyles.header__nav}>
                <div className={appHeaderStyles.header__group}>
                    <HeaderMenuButton className={appHeaderStyles.header__button} path={'/'}>
                        <BurgerIcon type="primary" />
                        <p className={`text text_type_main-default ${appHeaderStyles.header__buttontext} ${appHeaderStyles.active}`}>Конструктор</p>
                    </HeaderMenuButton>
                    <HeaderMenuButton path={'/orders'} className={appHeaderStyles.header__button}>
                        <ListIcon type="secondary" />
                        <p className={`text text_type_main-default ${appHeaderStyles.header__buttontext}`}>Лента заказов</p>
                    </HeaderMenuButton>
                </div>
                <Logo />
                <HeaderMenuButton path={'/profile'} className={appHeaderStyles.header__button}>
                    <ProfileIcon type="secondary" />
                    <p className={`text text_type_main-default ${appHeaderStyles.header__buttontext}`}>Личный кабинет</p>
                </HeaderMenuButton>
            </nav>
        </header>
    );
}

export default AppHeader;