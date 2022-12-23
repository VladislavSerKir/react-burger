import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Spinner from '../../pages/spinner/spinner';
import { Order } from '../order/order';

export const OrdersFeed = () => {

    const location = useLocation();
    const ingredients = useSelector(store => store.data?.ingredients);
    const orders = useSelector(store => store.data?.orders);

    if (orders && ingredients) {
        return (
            <ul className={`orders-feed`}>
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