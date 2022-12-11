import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import Spinner from '../../pages/spinner/spinner';
import { Order } from '../order/order';
import ordersFeedStyles from './orders-feed.module.css';

export const OrdersFeed = ({ orders }) => {
    // export const OrdersFeed = () => {


    // const { id } = useParams();
    const location = useLocation();
    const ingredients = useSelector(store => store.data?.ingredients)
    const userOrders = useSelector(store => store.data.userOrders)
    // const orders = useSelector(store => store.data.orders)


    // console.log(location.pathname, orders.orders, location.pathname.startsWith('/profile'));


    if (!orders || !userOrders) {
        return (
            <Spinner />
        );
    }

    // if (location.pathname.startsWith('/profile')) {
    //     return (
    //         <ul className={` ${ordersFeedStyles.list}`}>
    //             {
    //                 orders?.orders?.map(order => (
    //                     <Link className={`text text_type_main-small ${ordersFeedStyles.order__link}`} key={order._id} to={{
    //                         pathname: `/profile/orders/${order._id}`,
    //                         state: { background: location }
    //                     }}>
    //                         <Order key={order._id} orderInfo={order} ingredients={ingredients} />
    //                     </Link>
    //                 ))
    //             }
    //         </ul>
    //     )
    // }

    return (
        location.pathname.startsWith('/profile')
            ?
            (
                <ul className={` ${ordersFeedStyles.list}`}>
                    {
                        orders?.orders?.map(order => (
                            <Link className={`text text_type_main-small ${ordersFeedStyles.order__link}`} key={order._id} to={{
                                pathname: `/profile/orders/${order._id}`,
                                state: { background: location }
                            }}>
                                <Order key={order._id} orderInfo={order} ingredients={ingredients} />
                            </Link>
                        ))
                    }
                </ul>
            )
            :
            (
                <ul className={` ${ordersFeedStyles.list}`}>
                    {
                        orders?.orders?.map(order => (
                            <Link className={`text text_type_main-small ${ordersFeedStyles.order__link}`} key={order._id} to={{
                                pathname: `/feed/${order._id}`,
                                state: { background: location }
                            }}>
                                <Order key={order._id} orderInfo={order} ingredients={ingredients} />
                            </Link>
                        ))
                    }
                </ul>
            )

        // <ul className={` ${ordersFeedStyles.list}`}>
        //     {
        //         orders?.orders?.map(order => (
        //             <Link className={`text text_type_main-small ${ordersFeedStyles.order__link}`} key={order._id} to={{
        //                 pathname: location.pathname.startsWith('/profile') ? `/profile/orders/${order._id}` : `/feed/${order._id}`,
        //                 state: { background: location }
        //             }}>
        //                 <Order key={order._id} orderInfo={order} ingredients={ingredients} />
        //             </Link>
        //         ))
        //     }
        // </ul>

        // <ul className={` ${ordersFeedStyles.list}`}>
        //     {
        //         orders?.orders?.map(order => (
        //             <Link className={`text text_type_main-small ${ordersFeedStyles.order__link}`} key={order._id} to={{
        //                 pathname: `/feed/${order._id}`,
        //                 state: { background: location }
        //             }}>
        //                 <Order key={order._id} orderInfo={order} ingredients={ingredients} />
        //             </Link>
        //         ))
        //     }
        // </ul>

    )
}