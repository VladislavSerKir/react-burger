import { NavLink, Route, Switch, useLocation } from 'react-router-dom';
import profileStyle from './profile.module.css';
import { useRouteMatch } from 'react-router-dom';
import { ProfileData } from '../../components/profile-data/profile-data';
import { useSelector } from 'react-redux';
import { onLogout } from '../../utils/api';
import { useDispatch } from 'react-redux';
import Spinner from '../spinner/spinner';
import { OrdersFeed } from '../../components/orders-feed/orders-feed';
import { useEffect } from 'react';
import { setWebsocketConnection, setWebsocketOffline } from '../../services/reducers/dataReducer';
import { BASE_WSS } from '../../utils/utils';
import { getCookie } from '../../utils/cookie';

export const Profile = () => {

    const logoutRequest = useSelector(store => store.user.logoutRequest);
    const orders = useSelector(store => store.data?.orders)
    const dispatch = useDispatch();
    const { url } = useRouteMatch();
    const location = useLocation();
    const accessToken = getCookie('accessToken');

    useEffect(() => {
        dispatch(setWebsocketConnection(`${BASE_WSS}/orders?token=${accessToken}`))
        return () => {
            dispatch(setWebsocketOffline())
        }
    }, [location.pathname])

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

                {
                    location.pathname === `${url}` &&
                    <p className={`mt-20 text text_color_inactive text_type_main-default ${profileStyle.text}`}>В этом разделе вы можете изменить свои персональные данные
                    </p>
                }

                {
                    location.pathname.startsWith(`${url}/orders`) &&
                    <p className={`mt-20 text text_color_inactive text_type_main-default ${profileStyle.text}`}>В этом разделе вы можете просмотреть свою историю заказов
                    </p>
                }

            </nav >
            <article className={`mt-10 ${profileStyle.content}`}>
                <Switch>
                    <Route path={`${url}`} exact>
                        <ProfileData />
                    </Route>
                    <Route path={`${url}/orders`} exact>
                        {!orders ? <Spinner /> :
                            <OrdersFeed className={`mt-10 ${profileStyle.orders}`} orders={orders} />
                        }
                    </Route>
                </Switch>
            </article >
        </div>
    )
}