import React from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { BASE_URL } from '../../utils/data';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { CLOSE_ALL_MODALS, LOAD_DATA, LOAD_DATA_FAIL, ADD_INGREDIENT_TO_CONSTRUCTOR } from '../../services/actions/actions';
import { checkResponse } from '../../utils/utils';
import { reducer } from '../../services/reducers/reducers';

export const initialState = {
    ingredients: [],
    success: false,
    ingredientsCurrentTab: 'bun',
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

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
    initialState,
    enhancers: [],
});

function App() {
    const state = useSelector((store) => { return store })
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getData());
    }, []);

    const handleDrop = (ingredient) => {
        dispatch({
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            payload: ingredient
        })
    }

    const closeAllModals = () => {
        dispatch({
            type: CLOSE_ALL_MODALS
        })
    }

    const getData = () => {
        return async function (dispatch) {
            return fetch(`${BASE_URL}/ingredients`)
                .then(checkResponse)
                .then((data) => {
                    dispatch({
                        type: LOAD_DATA,
                        payload: data
                    })
                })
                .catch((error) => {
                    dispatch({
                        type: LOAD_DATA_FAIL
                    })
                    console.log(error)
                })
        }
    }

    return (
        <div className={appStyles.body} >
            <AppHeader />
            <main className={appStyles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients className={appStyles.column} />
                    <BurgerConstructor onDropHandler={handleDrop} className={appStyles.column} />
                </DndProvider>
            </main>
            {
                state.orderDetails?.isOpened &&
                <Modal
                    title={'Детали заказа'}
                    onClick={closeAllModals}
                    closeModal={closeAllModals}
                >
                    <OrderDetails orderNumber={state.orderDetails?.orderNumber} closeModal={closeAllModals} />
                </Modal>
            }
            {
                state.ingredientDetails?.isOpened &&
                <Modal
                    title={'Детали ингредиента'}
                    onClick={closeAllModals}
                    closeModal={closeAllModals}
                >
                    <IngredientDetails title={`Детали ингредиента`} ingredientData={state.ingredientDetails?.ingredient} closeModal={closeAllModals} name={`Биокотлета из марсианской Магнолии`} />
                </Modal>
            }
        </div >
    );
}

export default App;