import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from 'react-redux';
import constructorStyle from './constructor.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { addIngredient } from '../../services/reducers/constructorReducer';

export const Constructor = () => {
    const dispatch = useDispatch();

    const handleDrop = (ingredient) => {
        dispatch(addIngredient(ingredient))
    }

    return (
        <main className={constructorStyle.main}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients className={constructorStyle.column} />
                <BurgerConstructor
                    onDropHandler={handleDrop}
                    className={constructorStyle.column} />
            </DndProvider>
        </main>
    )
}