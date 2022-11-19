import React from 'react';
import { NavLink } from 'react-router-dom';
import profileStyle from './profile.module.css';
import { useRouteMatch } from 'react-router-dom';

export const Profile = () => {
    const { url } = useRouteMatch();

    return (
        <div className={`mt-30 ${profileStyle.profile}`}>
            <nav className={profileStyle.menu}>
                <NavLink to={`${url}`} className={`text text_type_main-medium ${profileStyle.link}`} activeClassName={profileStyle.link_active}>
                    <p className={`${profileStyle.linkText}`}>Профиль</p>

                </NavLink>
                <NavLink to={`${url}/orders`} className={`text text_type_main-medium ${profileStyle.link}`} activeClassName={profileStyle.link_active}>
                    История заказов
                </NavLink>
                <NavLink to={`${url}/quit`} className={`text text_type_main-medium ${profileStyle.link}`} activeClassName={profileStyle.link_active}>
                    Выход
                </NavLink>
            </nav >
            <article className={profileStyle.content} >
                some text
            </article >
        </div>
    )
}