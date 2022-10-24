import { useContext, useMemo } from 'react';
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyles from './burger-constructor.module.css';
import { IngredientsContext } from '../services/ingredientsContext';
import { BASE_URL } from '../../utils/data';
import { LOAD_SUMMARY_ORDER_DATA } from '../services/actions/actions';
import { checkResponse } from '../../utils/utils';

function BurgerConstructor() {
    const { state, dispatch } = useContext(IngredientsContext);
    const { ingredients, burgerConstructor } = state;

    const saveOrder = async () => {
        return fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "ingredients": [burgerConstructor.bun._id, ...burgerConstructor.ingredients.map((item) => item._id), burgerConstructor.bun._id]
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

    const total = useMemo(() => {
        return (burgerConstructor.bun?.price * 2) + burgerConstructor.ingredients?.reduce((accum, item) => {
            return accum += item?.price
        }, 0)
    }, [burgerConstructor])

    const handleOrderClick = (event) => {
        event.preventDefault();
        saveOrder(ingredients)
    }

    return (
        <form name='order' action='#' onSubmit={handleOrderClick} className={`mt-25 ml-4 ${burgerConstructorStyles.burgerConstructor}`}>
            {
                burgerConstructor.bun &&
                <div className={`mb-4 pr-2 ${burgerConstructorStyles.burgerConstructor__item}`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${burgerConstructor.bun?.name} (верх)`}
                        price={burgerConstructor.bun?.price}
                        thumbnail={burgerConstructor.bun?.image}
                    />
                </div>
            }

            <ul className={`${burgerConstructorStyles.burgerConstructor__listitem}`}>
                {burgerConstructor.ingredients.map((position, index) => {
                    return (
                        <li key={index} className={`${burgerConstructorStyles.burgerConstructor__item}`}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                isLocked={false}
                                text={position.name}
                                price={position.price}
                                thumbnail={position.image}
                            />
                        </li>
                    )
                })}
            </ul>
            {
                burgerConstructor.bun &&
                <div className={`mt-4 pr-2 ${burgerConstructorStyles.burgerConstructor__item}`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${burgerConstructor.bun?.name} (низ)`}
                        price={burgerConstructor.bun?.price}
                        thumbnail={burgerConstructor.bun?.image}
                    />
                </div>
            }

            <div className={`mt-10 pb-10 ${burgerConstructorStyles.burgerConstructor__checkout}`}>
                {burgerConstructor.bun && burgerConstructor.ingredients &&
                    <div className={`${burgerConstructorStyles.burgerConstructor__total}`}>
                        <p className={`mr-2 text text_type_main-large ${burgerConstructorStyles.burgerConstructor__ordersum}`}>{total}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                }
                <Button htmlType='submit' type="primary" size="large" disabled={!burgerConstructor.bun}>Оформить заказ</Button>
            </div>
        </form >
    )
}

export default BurgerConstructor;