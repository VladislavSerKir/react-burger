import React, { useRef, useCallback, FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeIngredient, moveIngredient } from '../../services/reducers/constructorReducer';
import { useTypedSelector } from '../../services/types';
import { useTypedDispatch } from '../../services/types';
import { TIngredient } from '../../services/types';

interface IIngredientProps {
    position: TIngredient,
    index: number,
    id: string | undefined
}

export const Ingredient: FC<IIngredientProps> = ({ position, index, id }) => {

    const refWithin = useRef(null);
    const dispatch = useTypedDispatch();
    const { burgerConstructor } = useTypedSelector(store => store);

    const handleDeleteIngredient = (event: React.ChangeEvent<HTMLInputElement>, ingredient: never) => {
        event.preventDefault();
        const index = burgerConstructor.ingredients.indexOf(ingredient)
        dispatch(removeIngredient(index))
    }

    const changeTargetPlace = useCallback((dragIndex: number, hoverIndex: number | string) => {
        dispatch(moveIngredient({ dragIndex, hoverIndex }))
    }, [dispatch])


    const [{ handlerId }, dropWithin] = useDrop({
        accept: 'ingredientConstructor',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!refWithin.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = refWithin.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            changeTargetPlace(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [, dragWithin] = useDrag({
        type: 'ingredientConstructor',
        item: () => {
            return { id, index, position };
        },
    });

    dragWithin(dropWithin(refWithin));

    return (
        <li
            ref={refWithin}
            data-handler-id={handlerId}
            draggable
            className={`ingredient`}>
            <DragIcon type="primary" />
            <ConstructorElement
                isLocked={false}
                text={position?.name}
                price={position?.price}
                thumbnail={position?.image}
                handleClose={(event) => handleDeleteIngredient(event, position)}
            // handleClose={handleDeleteIngredient}

            />
        </li>
    )
}