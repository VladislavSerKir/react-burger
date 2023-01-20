import React, { FC } from 'react';
import { Logo, ProfileIcon, ListIcon, BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../services/types';
import { IUseLocation } from '../../types';

const AppHeader: FC = () => {
    const { pathname } = useLocation<IUseLocation>();
    const store = useTypedSelector(store => store);

    return (
        <header className={`header`}>
            <nav className={`header__nav`}>
                <div className={`header__group`}>
                    <NavLink to='/' className={`pl-5 pr-5 pt-4 pb-4 mt-4 mb-4 header__button`} activeClassName={`header__button_type_active`}>
                        <BurgerIcon type={pathname === '/' ? "primary" : "secondary"} />
                        <p className={`text text_type_main-default ml-2`} style={pathname !== '/' ? { color: '#8585AD' } : undefined}>Конструктор</p>
                    </NavLink>
                    <NavLink to='/feed' className={`pl-5 pr-5 pt-4 pb-4 mt-4 mb-4 header__button`} activeClassName={`header__button_type_active`}>
                        <ListIcon type={pathname.startsWith('/feed') ? "primary" : "secondary"} />
                        <p className={`text text_type_main-default ml-2`} style={!pathname.startsWith('/feed') ? { color: '#8585AD' } : undefined}>Лента заказов</p>
                    </NavLink>
                </div>
                <Link to='/'>
                    <Logo />
                </Link>
                <NavLink to={`/profile`} className={`pl-5 pr-5 pt-4 pb-4 mt-4 mb-4 header__button`} activeClassName={`header__button_type_active`}>
                    <ProfileIcon type={pathname.startsWith('/profile') ? "primary" : "secondary"} />
                    <p className={`text text_type_main-default ml-2`} style={!pathname.startsWith('/profile') ? { color: '#8585AD' } : undefined}>{store.user.userData.name ? store.user.userData.name : 'Личный кабинет'} </p>
                </NavLink>
            </nav>
        </header >
    );
}

export default AppHeader;