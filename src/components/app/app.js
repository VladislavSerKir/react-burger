import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import OrderBrief from '../order-brief/order-brief';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { getAllIngredients, setWebsocketConnection, setWebsocketConnectionStart } from '../../services/reducers/dataReducer';
import { Constructor } from '../../pages/constructor/constructor';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Login } from '../../pages/login/login';
import { Register } from '../../pages/register/register';
import { Reset } from '../../pages/reset/reset';
import { ResetConfirm } from '../../pages/reset-confirm/reset-confirm';
import { Profile } from '../../pages/profile/profile';
import { ProtectedRoute } from '../protected-route/protected-route';
import { NotFound } from '../../pages/not-found/not-found';
import Spinner from '../../pages/spinner/spinner';
import { checkAuth } from '../../services/reducers/userReducer';
import { Feed } from '../../pages/feed/feed';
import OrderDetails from '../order-details/order-details';

function App() {

    const location = useLocation();
    const state = useSelector(store => store)
    const dispatch = useDispatch();
    const history = useHistory();

    const background = location.state?.background;

    React.useEffect(() => {
        dispatch(getAllIngredients());
    }, []);

    React.useEffect(() => {
        dispatch(checkAuth());
    }, []);

    const handleCloseModals = () => {
        history.goBack()
    }

    React.useEffect(() => {
        location.pathname.startsWith('/profile') ? dispatch(setWebsocketConnection(`wss://norma.nomoreparties.space/orders`)) : dispatch(setWebsocketConnection(`wss://norma.nomoreparties.space/orders/all`));
    }, [location.pathname]);

    return (
        <div className={appStyles.body} >
            <AppHeader />
            <Switch location={background || location}>
                <Route path='/' exact>
                    <Constructor />
                </Route>
                <ProtectedRoute path='/profile/orders/:id'>
                    {/* {state.data.userOrders?.orders && <OrderDetails />} */}
                    {/* {state.data.orders?.orders && <OrderDetails />} */}
                    <OrderDetails />
                </ProtectedRoute>
                <ProtectedRoute path='/profile' >
                    <Profile />
                </ProtectedRoute>
                <Route path='/login' exact>
                    {!state.user.userData.name && state.user.isAuthChecked && state.user.userRequest ? <Spinner /> : <Login />}
                </Route>
                <Route path='/register' exact>
                    {!state.user.userData.name && state.user.isAuthChecked && state.user.userRequest ? <Spinner /> : <Register />}
                </Route>
                <Route path='/forgot-password' exact>
                    {!state.user.userData.name && state.user.isAuthChecked && state.user.userRequest ? <Spinner /> : <Reset />}
                </Route>
                <Route path='/reset-password' exact>
                    {(!state.user.userData.name && state.user.isAuthChecked && state.user.userRequest) ? <Spinner /> : state.user.resetRequestConfirmed ? <ResetConfirm /> : <Redirect to={{ pathname: '/forgot-password' }} />}
                </Route>
                <Route path='/ingredients/:id' >
                    {state.data.ingredients.length && <IngredientDetails ingredients={state.data.ingredients} />}
                </Route>
                <Route path='/feed/:id' >
                    {/* {state.data.orders?.orders ? <OrderDetails /> : <Spinner />} */}
                    <OrderDetails />
                </Route>
                <Route path='/feed' >
                    <Feed />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>

            {background &&
                (<>
                    <Route path='/ingredients/:id' >
                        <Modal onClose={handleCloseModals} >
                            {state.data.ingredients.length && <IngredientDetails />}
                            {/* <IngredientDetails /> */}
                        </Modal>
                    </Route >
                    <Route path='/feed/:id' >
                        <Modal onClose={handleCloseModals} >
                            {/* {state.data.orders?.orders && <OrderDetails />} */}
                            {/* {state.data.orders?.orders ? <OrderDetails /> : <Spinner />} */}
                            <OrderDetails />
                        </Modal>
                    </Route >
                    <ProtectedRoute path='/order'>
                        {state.burgerConstructor.orderNumber &&
                            (<>
                                <Modal onClose={handleCloseModals} >
                                    <OrderBrief />
                                </Modal>
                            </>)
                        }
                    </ProtectedRoute>
                    <ProtectedRoute path='/profile/orders/:id'>
                        <Modal onClose={handleCloseModals} >
                            <OrderDetails />
                        </Modal>
                    </ProtectedRoute>
                </>
                )
            }
        </div >
    );
}

export default App;