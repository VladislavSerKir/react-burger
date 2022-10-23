import React, { useReducer } from 'react';
// import ReactDOM from 'react-dom';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { url } from '../../utils/data';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { IngredientsContext } from '../services/ingredientsContext';
import reducer from '../services/reducers/appReducer';

const initialState = {
    ingredients: [],
    success: false,
    orderDetails: {
        isOpened: false,
        orderNumber: null
    },
    ingredientDetails: {
        isOpened: false,
        ingredient: null
    },
    burgerConstructor: {
        bun: null,
        ingredients: [],
    }
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    React.useEffect(() => {
        getData();
    }, []);

    const getCardsData = (cardData) => {
        dispatch({
            type: 'LOAD_CARD_DATA',
            payload: cardData
        })
        dispatch({
            type: 'ADD',
            payload: cardData
        })
    }

    const closeAllModals = () => {
        dispatch({
            type: "CLOSE_ALL_MODALS"
        })
    }

    const getData = async () => {
        return fetch(url)
            .then((response) => {
                return response.ok ?
                    response.json()
                    :
                    dispatch({ type: 'LOAD_DATA_FAIL' });
            })
            .then((data) => {
                dispatch({
                    type: 'LOAD_DATA',
                    payload: data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className={appStyles.body} >
            <AppHeader />
            <main className={appStyles.main}>
                <IngredientsContext.Provider value={{ state, dispatch }} >
                    <BurgerIngredients className={appStyles.column} getCardsData={getCardsData} />
                    <BurgerConstructor className={appStyles.column} />
                </IngredientsContext.Provider>
            </main>

            {
                state.orderDetails?.isOpened &&
                <Modal
                    title={'Детали заказа'}
                    onOverlayClick={closeAllModals}
                >
                    <OrderDetails orderNumber={state.orderDetails.orderNumber} closeModal={closeAllModals} />
                </Modal>
            }

            {
                state.ingredientDetails?.isOpened &&
                <Modal
                    title={'Детали ингредиента'}
                    onOverlayClick={closeAllModals}
                >
                    <IngredientDetails title={`Детали ингредиента`} ingredientData={state.ingredientDetails.ingredient} closeModal={closeAllModals} name={`Биокотлета из марсианской Магнолии`} />
                </Modal>
            }
        </div >
    );
}

export default App;