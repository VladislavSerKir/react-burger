import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { addIngredient } from '../../services/reducers/constructorReducer';
import { useTypedDispatch } from '../../services/types';
import { TIngredient } from '../../services/types';

export const Constructor = () => {
    const dispatch = useTypedDispatch();

    const handleDrop = (ingredient: TIngredient) => {
        dispatch(addIngredient(ingredient))
    }

    return (
        <main className={`constructor`}>
            <DndProvider backend={HTML5Backend}>
                <div className={`constructor__column`}> <BurgerIngredients /></div>
                <div className={`constructor__column`}>
                    <BurgerConstructor
                        onDropHandler={handleDrop}
                    />
                </div>

            </DndProvider>
        </main>
    )
}