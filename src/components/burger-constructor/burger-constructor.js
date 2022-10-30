import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { checkResponse } from '../../utils/utils';
import burgerConstructorStyles from './burger-constructor.module.css';
import { BASE_URL } from '../../utils/data';
import { LOAD_SUMMARY_ORDER_DATA, REMOVE_INGREDIENT_FROM_CONSTRUCTOR } from '../../services/actions/actions';

function BurgerConstructor({ onDropHandler }) {
    const dispatch = useDispatch();
    const { ingredients, burgerConstructor } = useSelector(store => store);
    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(ingredient) {
            onDropHandler(ingredient);
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    })
    const hoverDrop = isHover ? burgerConstructorStyles.burgerConstructorHover : burgerConstructorStyles.burgerConstructor;

    const saveOrder = () => {
        return async function (dispatch) {
            return fetch(`${BASE_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    "ingredients": [burgerConstructor?.bun._id, ...burgerConstructor.ingredients?.map((item) => item._id), burgerConstructor?.bun._id]
                })
            })
                .then(checkResponse)
                .then((data) => {
                    dispatch({
                        type: LOAD_SUMMARY_ORDER_DATA,
                        payload: data.order.number
                    })
                })
        }
    }

    const total = useMemo(() => {
        return (burgerConstructor?.bun?.price * 2) + burgerConstructor?.ingredients?.reduce((accum, item) => {
            return accum += item?.price
        }, 0)
    }, [burgerConstructor])

    const handleOrderClick = (event) => {
        event.preventDefault();
        dispatch(saveOrder(ingredients))
    }

    const handleDeleteIngredient = (event, ingredient) => {
        event.preventDefault();
        const index = burgerConstructor.ingredients.indexOf(ingredient)
        dispatch({
            type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
            payload: index
        })
    }

    return (
        <form ref={dropTarget} name='order' action='#' onSubmit={handleOrderClick} className={`mt-25 ml-4 ${hoverDrop} `}>

            {
                burgerConstructor?.bun &&
                <div className={`mb-4 pr-2 ${burgerConstructorStyles.burgerConstructor__item} `}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${burgerConstructor?.bun?.name} (верх)`}
                        price={burgerConstructor?.bun?.price}
                        thumbnail={burgerConstructor?.bun?.image}
                    />
                </div>
            }

            <ul className={`${burgerConstructorStyles.burgerConstructor__listitem} `}>
                {burgerConstructor?.ingredients?.map((position, index) => {
                    return (
                        <li key={index} draggable className={`${burgerConstructorStyles.burgerConstructor__item} `}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                isLocked={false}
                                text={position?.name}
                                price={position?.price}
                                thumbnail={position?.image}
                                handleClose={(event) => handleDeleteIngredient(event, position)}
                            />
                        </li>
                    )
                })}
            </ul>
            {
                burgerConstructor?.bun &&
                <div className={`mt-4 pr-2 ${burgerConstructorStyles.burgerConstructor__item} `}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${burgerConstructor?.bun?.name} (низ)`}
                        price={burgerConstructor?.bun?.price}
                        thumbnail={burgerConstructor?.bun?.image}
                    />
                </div>
            }

            <div className={`mt-10 pb-10 ${burgerConstructorStyles.burgerConstructor__checkout} `}>
                {burgerConstructor?.bun && burgerConstructor?.ingredients &&
                    <div className={`${burgerConstructorStyles.burgerConstructor__total} `}>
                        <p className={`mr-2 text text_type_main - large ${burgerConstructorStyles.burgerConstructor__ordersum} `}>{total}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                }
                <Button htmlType='submit' type="primary" size="large" disabled={!burgerConstructor?.bun}>Оформить заказ</Button>
            </div>
        </form >
    )
}

export default BurgerConstructor;