import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { getAllIngredients } from '../../services/reducers/dataReducer';
import { closeAllModals } from '../../services/reducers/modalReducer';
import { Constructor } from '../../pages/constructor/constructor';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Login } from '../../pages/login/login';
import { Register } from '../../pages/register/register';
import { Reset } from '../../pages/reset/reset';
import { ResetConfirm } from '../../pages/reset-confirm/reset-confirm';
import { Profile } from '../../pages/profile/profile';
import { ProtectedRoute } from '../protected-route/protected-route';
import { NotFound } from '../../pages/not-found/not-found';
import Spinner from '../../pages/spinner/spinner';
import { checkAuth } from '../../services/reducers/userReducer';

function App() {
    const history = useHistory();
    const location = useLocation();
    const state = useSelector((store) => { return store })
    const dispatch = useDispatch();

    const background = location.state?.background;

    React.useEffect(() => {
        dispatch(getAllIngredients());
    }, []);

    React.useEffect(() => {
        dispatch(checkAuth());
    }, []);

    const handleCloseModals = () => {
        dispatch(closeAllModals())
    }

    return (
        <div className={appStyles.body} >
            <AppHeader />
            <Switch location={background || location}>
                <Route path='/' exact>
                    <Constructor />
                </Route>
                <ProtectedRoute path='/profile' isAuth={state.user.isAuthCheck} user={state.user.userData}>
                    <Profile />
                </ProtectedRoute>
                {/* <Route path='/profile'>
                    <Profile />
                </Route> */}

                {/* <ProtectedRoute path='/login' isAuth={state.user.isAuthCheck} user={state.user.userData}>
                    {state.user.userRequest ? <Spinner /> : <Login />}
                </ProtectedRoute> */}
                <Route path='/login' exact>
                    {state.user.userRequest ? <Spinner /> : <Login />}
                </Route>

                <Route path='/register' exact>
                    <Register />
                </Route>
                <Route path='/forgot-password' exact>
                    <Reset />
                </Route>
                <Route path='/reset-password' exact>
                    <ResetConfirm />
                </Route>
                <Route path="*">
                    <NotFound />
                    {/* <Spinner /> */}
                </Route>
            </Switch>

            {
                state.modal.orderDetails?.isOpened &&
                <Modal
                    onClick={handleCloseModals}
                    closeModal={handleCloseModals}
                >
                    <OrderDetails
                        orderNumber={state.burgerConstructor?.orderNumber}
                        closeModal={handleCloseModals}
                    />
                </Modal>
            }
            {
                state.modal?.ingredientDetails?.isOpened &&
                <Modal
                    onClick={handleCloseModals}
                    closeModal={handleCloseModals}
                >
                    <IngredientDetails
                        title={`Детали ингредиента`}
                        ingredientData={state.data.ingredientDetails.ingredient}
                        closeModal={handleCloseModals}
                    />
                </Modal>
            }
        </div >
    );
}

export default App;