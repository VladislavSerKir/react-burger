import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { url } from '../../utils/data';
import IngredientDetails from '../ingredient-details/ingredient-details';

function App() {
    const [state, setState] = useState({ apiData: [], success: false });
    const [orderDetails, setOrderDetails] = useState({ isOpened: false });
    const [ingredientDetails, setIngredientDetails] = useState({ isOpened: false, ingredient: null })

    React.useEffect(() => {
        getData();
    }, []);

    const getCardsData = (cardData) => {
        setIngredientDetails({ isOpened: true, ingredient: cardData })
    }

    const closeAllModals = () => {
        setOrderDetails({ ...orderDetails, isOpened: false });
        setIngredientDetails({ ...ingredientDetails, isOpened: false });
    }

    const openOrderDetails = () => {
        setOrderDetails({ ...orderDetails, isOpened: true });
    }

    const getData = async () => {
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
                <BurgerIngredients className={appStyles.column} data={state.apiData} getCardsData={getCardsData} />
                <BurgerConstructor className={appStyles.column} data={state.apiData} openOrder={openOrderDetails} />
            </main>

            {orderDetails.isOpened &&
                <Modal
                    title={'Детали заказа'}
                    onOverlayClick={closeAllModals}
                >
                    <OrderDetails orderId={`034536`} closeModal={closeAllModals} />
                </Modal>}

            {ingredientDetails.isOpened &&
                <Modal
                    title={'Детали ингредиента'}
                    onOverlayClick={closeAllModals}
                >
                    <IngredientDetails title={`Детали ингредиента`} ingredientData={ingredientDetails.ingredient} closeModal={closeAllModals} name={`Биокотлета из марсианской Магнолии`} />
                </Modal>}
        </div>
    );
}

export default App;