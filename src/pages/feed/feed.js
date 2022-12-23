import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrdersFeed } from '../../components/orders-feed/orders-feed';
import { OrdersSummary } from '../../components/orders-summary/orders-summary';
import { setWebsocketConnection, setWebsocketOffline } from '../../services/reducers/dataReducer';
import { BASE_WSS } from '../../utils/utils';
import Spinner from '../spinner/spinner';
import { useLocation } from 'react-router-dom';

export const Feed = () => {

    const dispatch = useDispatch();
    const orders = useSelector(store => store.data?.orders);
    const location = useLocation();

    useEffect(() => {
        dispatch(setWebsocketConnection(`${BASE_WSS}/orders/all`))
        return () => {
            dispatch(setWebsocketOffline())
        }
    }, [location.pathname])

    return (
        <section className={`feed`}>
            <h3 className={`mt-10 mb-5 text text_type_main-large feed__title`}>Лента заказов</h3>
            <div className={`feed__container`}>
                {!orders ? <Spinner /> : (
                    <>
                        <OrdersFeed className={`feed__orders`} />
                        <OrdersSummary className={`feed__summary`} />
                    </>
                )}
            </div>
        </section>
    )
}