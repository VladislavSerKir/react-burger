import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Spinner from '../../pages/spinner/spinner';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect } from 'react';
import { onFetchOrder } from '../../services/actions/actions';

function OrderDetails() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const ingredients = useSelector(store => store.data.ingredients);
    const orders = useSelector(store => store.data.orders?.orders);
    const location = useLocation();
    const background = location.state?.background;

    let orderMatch = null;

    useEffect(() => {
        if (location.pathname.startsWith('/profile') && !background) {
            dispatch(onFetchOrder(id))
        } else if ((location.pathname.startsWith('/feed')) && !background) {
            dispatch(onFetchOrder(id))
        }
    }, [location.pathname]);

    orderMatch = orders?.find(order => order.number.toString() === id)

    const returnIngredientsPrice = useCallback(() => {
        const arrOfIngredientsPrice = orderMatch?.ingredients?.map(ingredient => ingredients.find(item => item._id === ingredient).price);
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

    if (orderMatch) {
        return (
            <div className={`pl-10 pr-10 pb-10 order-details`}>
                <p className={`mt-15 mb-10 text text_type_digits-default`}>
                    {`#${orderMatch.number}`}
                </p>
                <p className={`text text_type_main-medium`}>{`${orderMatch.name}`}</p>
                <p className={`mt-2 mb-15 text text_type_main-small ${orderMatch.status === 'done' ? 'text_color_success' : null}`}>
                    {`${orderMatch.status === 'done' ? 'Выполнен' : 'Готовится'}`}
                </p>
                <p className={`mb-6 text text_type_main-medium`}>Состав:</p>
                <ul className={`order-details__list`}>
                    {
                        returnIngredients().map((ingredient, index) => {
                            return <li key={ingredient._id} className={`order-details__item`} >
                                <div className={`order-details__item-block`}>
                                    <img src={ingredient?.image} alt={ingredient?.name} className={`order-details__item-image`} />
                                    <p className={`text_type_main-small order-details__item-name`}>{ingredient?.name}</p>
                                </div>
                                <div className={`order-details__total`}>
                                    <p className={`mr-2 text text_type_digits-default`}>{`${returnIngredientsQuantity(ingredient?._id)} x ${ingredient?.price}`}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </li>
                        })
                    }
                </ul>

                <div className={`mt-10 order-details__footer`}>
                    <p className={`text text_color_inactive text_type_main-default`}>
                        <FormattedDate date={new Date(orderMatch.createdAt)} /> i-GMT+3
                    </p>
                    <div className={`order-details__total`}>
                        <p className={`mr-2 text text_type_digits-default`}>{returnIngredientsPrice()}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        );
    } else {
        return (<Spinner />)
    }
}

export default OrderDetails;