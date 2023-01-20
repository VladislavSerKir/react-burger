import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Spinner from '../../pages/spinner/spinner';
import { Order } from '../order/order';
import { useTypedSelector } from '../../services/types';

export const OrdersFeed: FC = () => {

    const location = useLocation();
    const ingredients = useTypedSelector(store => store.data?.ingredients);
    const orders = useTypedSelector(store => store.data?.orders);

    if (orders && ingredients) {
        return (
            <ul className={`orders-feed mt-10 profile__orders`}>
                {
                    orders?.orders?.map(order => (
                        <Link className={`text text_type_main-small orders-feed__link`} key={order.number} to={{
                            pathname: location.pathname.startsWith('/profile') ? `/profile/orders/${order.number}` : `/feed/${order.number}`,
                            state: { background: location }
                        }}>
                            <Order orderInfo={order} />
                        </Link>
                    ))
                }
            </ul>
        )
    } else {
        return (
            <Spinner />
        );
    }
}