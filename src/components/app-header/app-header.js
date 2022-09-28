import React, { useEffect } from 'react';
import { Logo, ProfileIcon, ListIcon, BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderMenuButton from '../menu-home/menu-home';
import appHeaderStyles from './app-header.module.css';

function AppHeader() {
    // const [active, setActive] = React.useState({ menu: 'constructor' });
    // const openMenu = (menu) => {
    //     setActive((prevState) => ({}))
    // }

    return (
        <header className={appHeaderStyles.header}>
            <nav className={appHeaderStyles.header__nav}>
                <div className={appHeaderStyles.header__group}>
                    <HeaderMenuButton className={appHeaderStyles.header__button}>
                        <BurgerIcon type="secondary" />
                        <p className={`text text_type_main-default ${appHeaderStyles.header__buttontext}`}>Конструктор</p>
                    </HeaderMenuButton>
                    <HeaderMenuButton className={appHeaderStyles.header__button}>
                        <ListIcon type="secondary" />
                        <p className={`text text_type_main-default ${appHeaderStyles.header__buttontext}`}>Лента заказов</p>
                    </HeaderMenuButton>
                </div>
                <Logo />
                <HeaderMenuButton className={appHeaderStyles.header__button}>
                    <ProfileIcon type="secondary" />
                    <p className={`text text_type_main-default ${appHeaderStyles.header__buttontext}`}>Личный кабинет</p>
                </HeaderMenuButton>
            </nav>
        </header>
    );

}

export default AppHeader;