import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, FC } from 'react';
import { useLocation } from 'react-router-dom';
import Spinner from '../../pages/spinner/spinner';
import { useTypedSelector } from '../../services/types';
import { IUseLocation } from '../../types';
import { TOrder } from '../../services/types';

interface IOrderProps {
    orderInfo: TOrder
}

export const Order: FC<IOrderProps> = ({ orderInfo }) => {

    const ingredients = useTypedSelector(store => store.data?.ingredients);
    const user = useTypedSelector(state => state.user.userData.name);
    const location = useLocation<IUseLocation>();

    const returnIngredientsPrice = useCallback(() => {
        const arrOfIngredientsPrice = orderInfo?.ingredients?.map(ingredient => {
            if (ingredient !== null) {
                return ingredients?.find(item => item?._id === ingredient)?.price
            } else {
                return 0
            }
        })

        return arrOfIngredientsPrice.reduce((acc: number, item: number | undefined) => {
            if (item) {
                acc += item
            }
            return acc
        }, 0)
    }, [orderInfo?.ingredients])

    const returnIngredients = useCallback(() => {
        const mutatedIngredients = Array.from(new Set(orderInfo?.ingredients))
        return mutatedIngredients.map((ingredient, index) => {
            return ingredients?.find(item => item._id === ingredient)
        })
    }, [orderInfo?.ingredients])

    let offset = -45;

    if (orderInfo && ingredients) {
        return (
            <li className={`pl-6 pr-6 pb-6 mr-2 order`}>
                <div className={`mt-6 order__header`}>
                    <p className={`text text_type_digits-default`}>
                        {`#${orderInfo?.number}`}
                    </p>
                    <p className={`text text_color_inactive text_type_main-default`}>
                        <FormattedDate date={new Date(orderInfo?.createdAt)} /> i-GMT+3
                    </p>
                </div>
                <p className={`text text_type_main-medium`}>{`${orderInfo?.name}`}</p>

                {
                    user && location.pathname === '/profile/orders' && (<p className={`text text_type_main-small ${orderInfo?.status === 'done' ? 'text_color_success' : null}`}>{`${orderInfo?.status === 'done' ? 'Выполнен' : 'Готовится'}`}</p>)
                }

                <div className={`mb-6 order__content`}>
                    <ul className={`order__ingredients`}>

                        {
                            returnIngredients().map((ingredient, index) => {
                                offset = offset + 45;
                                if (index > 5) {
                                    return null
                                } else if (index === 5) {
                                    return <li
                                        key={index}
                                        style={{ zIndex: 6 - index, left: offset + 'px' }}
                                        className={`order__ingredient`}
                                    >
                                        <img
                                            src={ingredient?.image}
                                            alt={ingredient?.name}
                                            style={{ zIndex: 6 - index, opacity: 0.4 }}
                                            className={`order__ingredient-image`}
                                        />
                                        <p className={`text order__ingredient-counter`} style={{ zIndex: 6 }}>
                                            {`+${returnIngredients().length - index}`}
                                        </p>
                                    </li>
                                } else {
                                    return <li
                                        key={index}
                                        style={{ zIndex: 6 - index, left: offset + 'px' }}
                                        className={`order__ingredient`}
                                    >
                                        <img
                                            src={ingredient?.image}
                                            alt={ingredient?.name}
                                            style={{ zIndex: 6 - index }}
                                            className={`order__ingredient-image`}
                                        />
                                    </li>
                                }
                            })
                        }
                    </ul>
                    <div className={`pt-5 order__total`}>
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