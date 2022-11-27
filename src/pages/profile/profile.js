import { NavLink, Route, Switch } from 'react-router-dom';
import profileStyle from './profile.module.css';
import { useRouteMatch } from 'react-router-dom';
import { ProfileData } from '../../components/profile-data/profile-data';
import { useSelector } from 'react-redux';
import { onLogout } from '../../utils/api';
import { useDispatch } from 'react-redux';
import Spinner from '../spinner/spinner';

export const Profile = () => {
    const logoutRequest = useSelector(store => store.user.logoutRequest)
    const dispatch = useDispatch();
    const { url } = useRouteMatch();

    const onLogoutHandler = (e) => {
        e.preventDefault();
        dispatch(onLogout())
    }

    if (logoutRequest) {
        return (
            <Spinner />
        );
    }

    return (
        <div className={`${profileStyle.profile}`}>
            <nav className={`mt-30 ${profileStyle.menu}`}>
                <NavLink to={`${url}`} exact className={`text text_type_main-medium ${profileStyle.link}`} activeClassName={profileStyle.link_active}>
                    Профиль
                </NavLink>
                <NavLink to={`${url}/orders`} className={`text text_type_main-medium ${profileStyle.link}`} activeClassName={profileStyle.link_active}>
                    История заказов
                </NavLink>
                <button
                    type="button"
                    className={`text text_type_main-medium text_color_inactive from global ${profileStyle.button}`}
                    onClick={onLogoutHandler}
                >
                    Выход
                </button>

                <p className={`mt-20 text text_color_inactive text_type_main-default ${profileStyle.text}`}>В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav >
            <article className={profileStyle.content} >
                <Switch>
                    <Route path={`${url}`} exact>
                        <ProfileData />
                    </Route>
                </Switch>
            </article >
        </div>
    )
}