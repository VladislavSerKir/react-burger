import { useEffect, FC } from 'react';
import { OrdersFeed } from '../../components/orders-feed/orders-feed';
import { OrdersSummary } from '../../components/orders-summary/orders-summary';
import { setWebsocketConnection, setWebsocketOffline } from '../../services/reducers/dataReducer';
import { BASE_WSS } from '../../utils/utils';
import Spinner from '../spinner/spinner';
import { useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../services/types';
import { useTypedDispatch } from '../../services/types';
import { IUseLocation } from '../../types';

export const Feed: FC = () => {

    const dispatch = useTypedDispatch();
    const orders = useTypedSelector(store => store.data?.orders);
    const location = useLocation<IUseLocation>();

    useEffect(() => {
        dispatch(setWebsocketConnection(`${BASE_WSS}/orders/all`))
        return () => {
            dispatch(setWebsocketOffline())
        }
    }, [location.pathname])

    return (
        <section className={`feed`}>
            <h3 className={`mt-10 mb-5 text text_type_main-large feed__title`}> Лента заказов </h3>
            <div className={`feed__container`}>
                {!orders ? <Spinner /> : (
                    <>
                        <div className={`feed__orders`}>
                            <OrdersFeed />
                        </div>
                        <div>
                            <OrdersSummary />
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}