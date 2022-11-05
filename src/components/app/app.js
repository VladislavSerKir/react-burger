import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { getAllIngredients } from '../../services/reducers/dataReducer';
import { closeAllModals } from '../../services/reducers/modalReducer';
import { addIngredient } from '../../services/reducers/constructorReducer';

function App() {
    const state = useSelector((store) => { return store })
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getAllIngredients());
    }, []);

    const handleDrop = (ingredient) => {
        dispatch(addIngredient(ingredient))
    }

    const handleCloseModals = () => {
        dispatch(closeAllModals())
    }

    return (
        <div className={appStyles.body} >
            <AppHeader />
            <main className={appStyles.main}>
                <DndProvider
                    backend={HTML5Backend}
                >
                    <BurgerIngredients
                        className={appStyles.column}
                    />
                    <BurgerConstructor
                        onDropHandler={handleDrop}
                        className={appStyles.column}
                    />
                </DndProvider>
            </main>
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