import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { checkResponse } from '../../utils/utils';
import burgerConstructorStyles from './burger-constructor.module.css';
import { BASE_URL } from '../../utils/api';
import { Ingredient } from '../ingredient/ingredient';
import { saveOrderNumber, statusSuccess } from '../../services/reducers/constructorReducer';
import { openOrderModal } from '../../services/reducers/modalReducer';

function BurgerConstructor({ onDropHandler }) {

    const dispatch = useDispatch();
    const store = useSelector(store => store);
    const { ingredients } = store.burgerConstructor;
    const { burgerConstructor } = store;

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(ingredient) {
            onDropHandler(ingredient);
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
    })
    const hoverDrop = isHover ? burgerConstructorStyles.burgerConstructorHover : burgerConstructorStyles.burgerConstructor;

    const placeOrder = () => {
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
                    dispatch(saveOrderNumber(data))
                })
                .then(() => {
                    dispatch(openOrderModal())
                })
                .catch((error) => {
                    dispatch(statusSuccess(error))
                    console.warn(error)
                })
        }
    }

    const total = useMemo(() => {
        return (burgerConstructor?.bun?.price * 2) + burgerConstructor?.ingredients?.reduce((accum, item) => {
            return accum += item?.price
        }, 0)
    }, [burgerConstructor])

    const handlePlaceOrder = (event) => {
        event.preventDefault();
        dispatch(placeOrder(ingredients))
    }

    return (
        <form ref={dropTarget} name='order' action='#' onSubmit={handlePlaceOrder} className={`mt-25 ml-4 ${hoverDrop} `}>
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
                {burgerConstructor?.ingredients?.map((position, index) => <Ingredient key={index} id={position._id} position={position} index={index} />)}
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
                <Button
                    htmlType='submit'
                    type="primary"
                    size="large"
                    disabled={!burgerConstructor?.bun}
                >
                    Оформить заказ
                </Button>
            </div>
        </form >
    )
}

BurgerConstructor.propTypes = {
    onDropHandler: PropTypes.func.isRequired,
}

export default BurgerConstructor;