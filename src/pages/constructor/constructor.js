import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from 'react-redux';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { addIngredient } from '../../services/reducers/constructorReducer';

export const Constructor = () => {
    const dispatch = useDispatch();

    const handleDrop = (ingredient) => {
        dispatch(addIngredient(ingredient))
    }

    return (
        <main className={`constructor`}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients className={`constructor__column`} />
                <BurgerConstructor
                    onDropHandler={handleDrop}
                    className={`constructor__column`} />
            </DndProvider>
        </main>
    )
}