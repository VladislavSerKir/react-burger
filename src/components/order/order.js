import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback } from 'react';
import orderStyles from './order.module.css';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Spinner from '../../pages/spinner/spinner';

export const Order = ({ orderInfo }) => {

    const ingredients = useSelector(store => store.data?.ingredients);
    const user = useSelector(state => state.user.userData.name);
    const location = useLocation();

    const returnIngredientsPrice = useCallback(() => {
        const arrOfIngredientsPrice = orderInfo?.ingredients?.map(ingredient => {
            if (ingredient !== null) {
                return ingredients?.find(item => item?._id === ingredient)?.price
            } else {
                return 0
            }
        })
        return arrOfIngredientsPrice.reduce((acc, item) => { return acc += item }, 0)
    }, [orderInfo?.ingredients])

    const returnIngredients = useCallback(() => {
        const mutatedIngredients = Array.from(new Set(orderInfo?.ingredients))
        return mutatedIngredients.map((ingredient, index) => {
            return ingredients.find(item => item._id === ingredient)
        })
    }, [orderInfo?.ingredients])

    let offset = -45;

    if (orderInfo && ingredients) {
        return (
            <li className={`pl-6 pr-6 pb-6 mr-2 ${orderStyles.order}`}>
                <div className={`mt-6 ${orderStyles.orderHeader}`}>
                    <p className={`text text_type_digits-default ${orderStyles.orderNumber}`}>
                        {`#${orderInfo?.number}`}
                    </p>
                    <p className={`text text_color_inactive text_type_main-default ${orderStyles.orderNumber}`}>
                        <FormattedDate date={new Date(orderInfo?.createdAt)} /> i-GMT+3
                    </p>
                </div>
                <p className={`text text_type_main-medium ${orderStyles.orderName}`}>{`${orderInfo?.name}`}</p>

                {
                    user && location.pathname === '/profile/orders' && (<p className={`text text_type_main-small ${orderStyles.orderStatus} ${orderInfo?.status === 'done' ? 'text_color_success' : null}`}>{`${orderInfo?.status === 'done' ? 'Выполнен' : 'Готовится'}`}</p>)
                }

                <div className={`mb-6 ${orderStyles.orderContent}`}>
                    <ul className={` ${orderStyles.orderIngredients}`}>

                        {
                            returnIngredients().map((ingredient, index) => {
                                offset = offset + 45;
                                if (index > 5) {
                                    return null
                                } else if (index === 5) {
                                    return <li
                                        key={index}
                                        style={{ zIndex: 6 - index, left: offset + 'px' }}
                                        className={`${orderStyles.orderIngredientElement}`}
                                    >
                                        <img
                                            src={ingredient?.image}
                                            alt={ingredient?.name}
                                            style={{ zIndex: 6 - index, opacity: 0.4 }}
                                            className={`${orderStyles.orderIngredientImage}`}
                                        />
                                        <p className={`text  ${orderStyles.orderIngredientCounter}`} style={{ zIndex: 6 }}>
                                            {`+${returnIngredients().length - index}`}
                                        </p>
                                    </li>
                                } else {
                                    return <li
                                        key={index}
                                        style={{ zIndex: 6 - index, left: offset + 'px' }}
                                        className={`${orderStyles.orderIngredientElement}`}
                                    >
                                        <img
                                            src={ingredient?.image}
                                            alt={ingredient?.name}
                                            style={{ zIndex: 6 - index }}
                                            className={`${orderStyles.orderIngredientImage}`}
                                        />
                                    </li>
                                }
                            })
                        }
                    </ul>
                    <div className={`pt-5 ${orderStyles.orderTotal}`}>
                        <p className={`mr-2 text text_type_digits-default`}>{returnIngredientsPrice()}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </li >
        )
    } else {
        return (
            <Spinner />
        );
    }
}