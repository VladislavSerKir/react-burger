import React from 'react';
// import { initialState } from '../../index';
// import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CLOSE_ALL_MODALS, LOAD_DATA, LOAD_DATA_FAIL, ADD_INGREDIENT_TO_CONSTRUCTOR } from '../../services/actions/actions';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { BASE_URL } from '../../utils/data';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { checkResponse } from '../../utils/utils';
import { getAllIngredients } from '../../services/reducers/dataReducer';
import { closeAllModals } from '../../services/reducers/modalReducer';
import { addIngredient } from '../../services/reducers/constructorReducer';


// export const initialState = {
//     ingredients: [],
//     success: false,
//     ingredientsCurrentTab: 'bun',
//     orderDetails: {
//         isOpened: false,
//         orderNumber: null
//     },
//     ingredientDetails: {
//         isOpened: false,
//         ingredient: null
//     },
//     burgerConstructor: {
//         bun: null,
//         ingredients: [],
//     }
// };


function App() {
    const state = useSelector((store) => { return store })
    console.log(state)
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getAllIngredients());
    }, []);

    const handleDrop = (ingredient) => {
        // dispatch({
        //     type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        //     payload: ingredient
        // })
        dispatch(addIngredient(ingredient))
    }

    const handleCloseModals = () => {
        // dispatch({
        //     type: CLOSE_ALL_MODALS
        // })
        dispatch(closeAllModals())
    }

    // const getData = () => {
    //     return async function (dispatch) {
    //         return fetch(`${BASE_URL}/ingredients`)
    //             .then(checkResponse)
    //             .then((data) => {
    //                 dispatch({
    //                     type: LOAD_DATA,
    //                     payload: data
    //                 })
    //             })
    //             .catch((error) => {
    //                 dispatch({
    //                     type: LOAD_DATA_FAIL
    //                 })
    //                 console.log(error)
    //             })
    //     }
    // }

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
                state.modal.orderDetails?.isOpened &&
                <Modal
                    title={'Детали заказа'}
                    onClick={handleCloseModals}
                    closeModal={handleCloseModals}
                >
                    <OrderDetails orderNumber={state.burgerConstructor?.orderNumber} closeModal={handleCloseModals} />
                </Modal>
            }
            {
                state.modal?.ingredientDetails?.isOpened &&
                <Modal
                    title={'Детали ингредиента'}
                    onClick={handleCloseModals}
                    closeModal={handleCloseModals}
                >
                    <IngredientDetails title={`Детали ингредиента`} ingredientData={state.data.ingredientDetails.ingredient} closeModal={handleCloseModals} name={`Биокотлета из марсианской Магнолии`} />
                </Modal>
            }
        </div >
    );
}

export default App;