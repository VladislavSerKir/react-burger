import orderDetailsStyles from './order-details.module.css';
import { useSelector } from 'react-redux';
import { useLocation, useParams, useRouteMatch } from 'react-router-dom';
import Spinner from '../../pages/spinner/spinner';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

function OrderDetails() {

    const user = useSelector(state => state.user.userData.name);
    const location = useLocation();
    const { id } = useParams();
    const ingredients = useSelector(store => store.data.ingredients);
    const orders = useSelector(store => store.data.orders.orders);
    const userOrders = useSelector(store => store.data.userOrders.orders);
    // const concattedOrders = [...orders, ...userOrders]

    // const isProfile = useRouteMatch("/profile");

    // if (location.pathname.startsWith('/profile')) {
    //     const orderMatch = userOrders.find(item => {
    //         return item._id === id
    //     })
    // } else {
    //     const orderMatch = orders.find(item => {
    //         return item._id === id
    //     })
    // }

    // const orderMatch = () => {
    //     if (location.pathname.startsWith('/profile')) {
    //         userOrders.find(item => {
    //             return item._id === id
    //         })
    //     } else {
    //         orders.find(item => {
    //             return item._id === id
    //         })
    //     }
    // }

    // const orderMatch = (location.pathname.startsWith('/profile') ? userOrders : orders).find(item => {
    //     return item._id === id
    // })

    // console.log(orders, userOrders, id);
    let orderMatch = null;

    if (location.pathname.startsWith('/profile')) {
        orderMatch = userOrders?.find(item => item._id === id)
    }

    if (location.pathname.startsWith('/feed')) {
        orderMatch = orders?.find(item => item._id === id)
    }

    // const orderMatch = concattedOrders.find(item => item._id === id)

    // const orderMatch = orders.find(item => item._id === id)

    // const orderMatch = useMemo(() => {
    //     return orders.find(item => item._id === id)
    // }, [orders])

    // console.log(orderMatch, orders, id, concattedOrders);

    const returnIngredientsPrice = useCallback(() => {
        const arrOfIngredientsPrice = orderMatch?.ingredients.map(ingredient => ingredients.find(item => item._id === ingredient).price);
        return arrOfIngredientsPrice.reduce((acc, item) => { return acc += item }, 0)
    }, [orderMatch?.ingredients])

    const returnIngredientsQuantity = useCallback((id) => {
        let ingredientsQuantity = 0
        orderMatch?.ingredients.map(ingredientId => {
            if (ingredientId === id) ingredientsQuantity++
        })
        return ingredientsQuantity
    }, [orderMatch?.ingredients])

    const returnIngredients = useCallback(() => {
        const mutatedIngredients = Array.from(new Set(orderMatch?.ingredients))
        return mutatedIngredients.map((ingredient, index) => {
            return ingredients.find(item => item._id === ingredient)
        })
    }, [orderMatch?.ingredients])

    if (!orderMatch) {
        return (<Spinner />)
    } else {
        return (
            <div className={`pl-10 pr-10 pb-10 ${orderDetailsStyles.order}`}>
                <p className={`mt-15 mb-10 text text_type_digits-default ${orderDetailsStyles.orderNumber}`}>
                    {`#${orderMatch.number}`}
                </p>

                <p className={`text text_type_main-medium ${orderDetailsStyles.orderName}`}>{`${orderMatch.name}`}</p>

                <p className={`mt-2 mb-15 text text_type_main-small ${orderDetailsStyles.orderStatus} ${orderMatch.status === 'done' ? 'text_color_success' : null}`}>{`${orderMatch.status === 'done' ? 'Выполнен' : 'Готовится'}`}</p>

                <p className={`mb-6 text text_type_main-medium ${orderDetailsStyles.orderName}`}>Состав:</p>

                <ul className={` ${orderDetailsStyles.orderIngredients}`}>
                    {
                        returnIngredients().map((ingredient, index) => {
                            return <li key={uuidv4()} className={`${orderDetailsStyles.ingredientElement}`} >
                                <div className={`${orderDetailsStyles.ingredientImageBlock}`}>
                                    <img src={ingredient.image} alt={ingredient.name} className={`${orderDetailsStyles.ingredientImage}`} />
                                    <p className={`text_type_main-small ${orderDetailsStyles.ingredientName}`}>{ingredient.name}</p>
                                </div>
                                <div className={`${orderDetailsStyles.ingredientTotal}`}>
                                    <p className={`mr-2 text text_type_digits-default`}>{`${returnIngredientsQuantity(ingredient._id)} x ${ingredient.price}`}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </li>
                        })
                    }
                </ul>

                <div className={`mt-10 ${orderDetailsStyles.orderHeader}`}>
                    <p className={`text text_color_inactive text_type_main-default ${orderDetailsStyles.orderNumber}`}>
                        <FormattedDate date={new Date(orderMatch.createdAt)} /> i-GMT+3
                    </p>
                    <div className={`${orderDetailsStyles.orderTotal}`}>
                        <p className={`mr-2 text text_type_digits-default`}>{returnIngredientsPrice()}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderDetails;