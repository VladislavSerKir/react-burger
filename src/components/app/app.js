import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { url } from '../utils/data';

function App() {
    const [state, setState] = useState({ apiData: [], success: false });
    const [orderDetails, setOrderDetails] = useState({ isOpened: true });
    const [ingredientDetails, setIngredientDetails] = useState({ isOpened: false })

    React.useEffect(() => {
        getData();
    }, []);

    const closeAllModals = () => {
        setOrderDetails({ ...orderDetails, isOpened: false });
        setIngredientDetails({ ...ingredientDetails, isOpened: false });
    }

    const handleEscKeydown = (e) => {
        e.key === 'Escape' && closeAllModals();
    }

    const getData = () => {
        return fetch(url)
            .then((response) => {
                return response.ok ? response.json() : setState({ ...state, success: false });
            })
            .then((data) => {
                setState({ apiData: data.data, success: data.success })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className={appStyles.body} >
            <AppHeader />
            <main className={appStyles.main}>
                <BurgerIngredients className={appStyles.column} data={state.apiData} />
                <BurgerConstructor className={appStyles.column} data={state.apiData} />
            </main>

            {orderDetails.isOpened &&
                <Modal
                    title={'Детали заказа'}
                    onOverlayClick={closeAllModals}
                    onEscKeydown={handleEscKeydown}
                >
                    <OrderDetails />
                </Modal>}

            {ingredientDetails.isOpened &&
                <Modal
                    title={'Детали ингредиента'}
                    onOverlayClick={closeAllModals}
                    onEscKeydown={handleEscKeydown}
                >

                </Modal>}
        </div>
    );
}

export default App;