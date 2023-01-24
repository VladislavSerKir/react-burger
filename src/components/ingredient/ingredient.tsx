import React, { useRef, useCallback, FC, } from 'react';
import { useDrag, useDrop, DropTargetMonitor, XYCoord } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeIngredient, moveIngredient } from '../../services/reducers/constructorReducer';
import { useTypedSelector } from '../../services/types';
import { useTypedDispatch } from '../../services/types';
import { TIngredient } from '../../services/types';

interface IIngredientProps {
    position: TIngredient,
    index: number,
    id?: string
}

type THover = {
    index: number,
    id: string
}

export const Ingredient: FC<IIngredientProps> = ({ position, index, id }) => {

    const ref = useRef<HTMLLIElement>(null);
    const dispatch = useTypedDispatch();
    const { burgerConstructor } = useTypedSelector(store => store);

    const handleDeleteIngredient = (event: React.ChangeEvent<HTMLInputElement>, ingredient: TIngredient) => {
        event.preventDefault();

        const index = Array.from(burgerConstructor.ingredients).indexOf(ingredient);
        dispatch(removeIngredient(index))
    }

    const changeTargetPlace = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch(moveIngredient({ dragIndex, hoverIndex }))
    }, [dispatch])


    const [, drop] = useDrop({
        accept: 'ingredientConstructor',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: any,
            monitor: DropTargetMonitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect() || { bottom: 0, top: 0 };
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
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

    const [, drag] = useDrag({
        type: 'ingredientConstructor',
        item: () => {
            return { id, index, position };
        },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <li
            ref={ref}
            // data-handler-id={handlerId}
            // draggable
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