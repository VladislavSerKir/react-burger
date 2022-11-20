import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import profileStyle from './profile.module.css';
import { useRouteMatch } from 'react-router-dom';
import { ProfileData } from '../../components/profile-data/profile-data';
import { useDispatch, useSelector } from 'react-redux';

export const Profile = () => {
    const store = useSelector(store => store);
    const dispatch = useDispatch();
    console.log(store);
    const { url } = useRouteMatch();

    return (
        <div className={`${profileStyle.profile}`}>
            <nav className={`mt-30 ${profileStyle.menu}`}>
                <NavLink to={`${url}`} exact className={`text text_type_main-medium ${profileStyle.link}`} activeClassName={profileStyle.link_active}>
                    Профиль
                </NavLink>
                <NavLink to={`${url}/orders`} className={`text text_type_main-medium ${profileStyle.link}`} activeClassName={profileStyle.link_active}>
                    История заказов
                </NavLink>
                <NavLink to={`${url}/quit`} className={`text text_type_main-medium ${profileStyle.link}`} activeClassName={profileStyle.link_active}>
                    Выход
                </NavLink>
                <p className={`mt-20 text text_color_inactive text_type_main-default ${profileStyle.text}`}>В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav >
            <article className={profileStyle.content} >
                <Switch>
                    <Route path={`${url}`} exact>
                        <ProfileData />
                    </Route>
                    <Route path={`${url}/quit`} exact>
                        <h1>quit</h1>
                    </Route>
                </Switch>
            </article >
        </div>
    )
}