import { NavLink, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import profileStyle from './profile.module.css';
import { useRouteMatch } from 'react-router-dom';
import { ProfileData } from '../../components/profile-data/profile-data';
import { useSelector } from 'react-redux';
import { onLogout } from '../../utils/api';
import { useDispatch } from 'react-redux';
import Spinner from '../spinner/spinner';
import { OrdersFeed } from '../../components/orders-feed/orders-feed';
import { ProtectedRoute } from '../../components/protected-route/protected-route';
import OrderDetails from '../../components/order-details/order-details';
import Modal from '../../components/modal/modal';

export const Profile = () => {

    const state = useSelector(store => store)
    const logoutRequest = useSelector(store => store.user.logoutRequest);
    const userOrders = useSelector(store => store.data?.userOrders)
    const dispatch = useDispatch();
    const { url } = useRouteMatch();
    const location = useLocation();
    const background = location.state?.background;
    const history = useHistory();

    const onLogoutHandler = (e) => {
        e.preventDefault();
        dispatch(onLogout())
    }

    if (logoutRequest) {
        return (
            <Spinner />
        );
    }

    const handleCloseModals = () => {
        history.goBack()
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
            <article className={`mt-10 ${profileStyle.content}`}>
                <Switch>
                    <Route path={`${url}`} exact>
                        <ProfileData />
                    </Route>
                    <Route path={`${url}/orders`} exact>
                        <OrdersFeed className={`mt-10 ${profileStyle.orders}`} orders={userOrders} />
                    </Route>
                    {/* <ProtectedRoute path='/profile/orders/:id'>
                        <Modal onClose={handleCloseModals} >
                            {state.data.orders?.orders && <OrderDetails />}
                        </Modal>
                    </ProtectedRoute> */}
                </Switch>

                {/* {background &&
                    (<>
                        <ProtectedRoute path='/profile/orders/:id'>
                            <Modal onClose={handleCloseModals} >
                                {userOrders && <OrderDetails orders={userOrders} />}
                            </Modal>
                        </ProtectedRoute>
                    </>
                    )
                } */}

            </article >
        </div>
    )
}