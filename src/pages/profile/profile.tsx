import { useEffect, FC } from 'react';
import { Link, NavLink, Route, Switch, useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { ProfileData } from '../../components/profile-data/profile-data';
import { onLogout } from '../../services/actions/actions';
import Spinner from '../spinner/spinner';
import { OrdersFeed } from '../../components/orders-feed/orders-feed';
import { setWebsocketConnection, setWebsocketOffline } from '../../services/reducers/dataReducer';
import { BASE_WSS } from '../../utils/utils';
import { getCookie } from '../../utils/cookie';
import { useTypedSelector } from '../../services/types';
import { useTypedDispatch } from '../../services/types';
import { IUseLocation } from '../../types';

export const Profile: FC = () => {

    const logoutRequest = useTypedSelector(store => store.user.logoutRequest);
    const orders = useTypedSelector(store => store.data?.orders)
    const dispatch = useTypedDispatch();
    const { url } = useRouteMatch();
    const location = useLocation<IUseLocation>();
    const accessToken = getCookie('accessToken');

    useEffect(() => {
        dispatch(setWebsocketConnection(`${BASE_WSS}/orders?token=${accessToken}`))
        return () => {
            dispatch(setWebsocketOffline())
        }
    }, [url])

    const onLogoutHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(onLogout())
    }

    if (logoutRequest) {
        return (
            <Spinner />
        );
    }

    return (
        <div className={`profile`}>
            <nav className={`mt-30 profile__menu`}>
                <NavLink to={`${url}`} exact className={`text text_type_main-medium profile__link`} activeClassName={`profile__link_type_active`}>
                    Профиль
                </NavLink>
                <NavLink to={`${url}/orders`} className={`text text_type_main-medium profile__link`} activeClassName={`profile__link_type_active`}>
                    История заказов
                </NavLink>
                <button
                    type="button"
                    className={`text text_type_main-medium text_color_inactive from global profile__button`}
                    onClick={onLogoutHandler}
                >
                    Выход
                </button>

                {
                    location.pathname === `${url}` &&
                    <p className={`mt-20 text text_color_inactive text_type_main-default profile__text`}>В этом разделе вы можете изменить свои персональные данные
                    </p>
                }

                {
                    location.pathname.startsWith(`${url}/orders`) &&
                    <p className={`mt-20 text text_color_inactive text_type_main-default profile__text`}>В этом разделе вы можете просмотреть свою историю заказов
                    </p>
                }

            </nav >
            <article className={`mt-10 profile__content`}>
                <Switch>
                    <Route path={`${url}`} exact>
                        <ProfileData />
                    </Route>
                    <Route path={`${url}/orders`} exact>
                        {!orders ?
                            <Spinner />
                            :
                            orders && orders.orders.length === 0
                                ?
                                <>
                                    <p className={`mt-20 text text_color_inactive text_type_main-large profile__text-order`}>Нет заказов</p>
                                    <Link to={`/`} className={`mt-10 text text_type_main-medium profile__link-order`} >
                                        Создать первый заказ
                                    </Link>
                                </>
                                :
                                <OrdersFeed />
                        }
                    </Route>
                </Switch>
            </article >
        </div>
    )
}