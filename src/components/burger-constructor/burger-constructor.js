import { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyles from './burger-constructor.module.css';
import { IngredientsContext } from '../services/ingredientsContext';
import { urlOrder } from '../../utils/data';

function BurgerConstructor() {
    const { state, dispatch } = useContext(IngredientsContext);
    const { ingredients, burgerConstructor } = state;

    const saveOrder = async () => {
        return fetch(urlOrder, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "ingredients": [burgerConstructor.bun._id, ...burgerConstructor.ingredients.map((item) => item._id), burgerConstructor.bun._id]
            })
        })
            .then((response) => {
                return response.ok ? response.json() : null;
            })
            .then((data) => {
                dispatch({
                    type: 'LOAD_SUMMARY_ORDER_DATA',
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
        <form name='order' action='#' className={`mt-25 ml-4 ${burgerConstructorStyles.burgerConstructor}`}>
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
                {burgerConstructor.ingredients.map((position) => {
                    return (
                        <li key={position._id} className={`${burgerConstructorStyles.burgerConstructor__item}`}>
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
                <Button htmlType='submit' type="primary" size="large" onClick={handleOrderClick}>Оформить заказ</Button>
            </div>
        </form >
    )
}

BurgerConstructor.propTypes = {
    // openOrderModal: PropTypes.func.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        _id: PropTypes.string
    })),
    burgerConstructor: PropTypes.arrayOf(PropTypes.shape({
        bun: PropTypes.object,
        ingredients: PropTypes.array
    }))
}

export default BurgerConstructor;