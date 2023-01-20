import { useCallback, FC } from 'react';
import { useTypedSelector } from '../../services/types';

export const OrdersSummary: FC = () => {

    const orders = useTypedSelector(store => store.data?.orders)
    const totalOrders = orders?.total;
    const totalOrdersToday = orders?.totalToday

    const readyOrders = useCallback(() => {
        return orders?.orders?.filter(order => order.status === 'done').map(order => order.number)
    }, [orders?.orders]);

    const notReadyOrders = useCallback(() => {
        return orders?.orders?.filter(order => order.status !== 'done').map(order => order.number)
    }, [orders?.orders]);

    return (
        <div className={`orders-summary feed__summary`}>
            <article className={`mb-15 orders-summary__container`}>
                <div className={`orders-summary__board`}>
                    <p className={`mb-6 text text_type_main-medium`}> Готовы:</p>
                    <ul className={`orders-summary__board-list`}>
                        {
                            readyOrders()?.map((order, index) => {
                                if (index < 20) {
                                    return (<li key={order} className={`text text_type_digits-default text_color_success orders-summary__board-item`}>{order}</li>)
                                }
                            }
                            )
                        }
                    </ul>
                </div>
                <div className={`orders-summary__board`}>
                    <p className={`mb-6 text text_type_main-medium`}> В работе:</p>
                    <ul className={`orders-summary__board-list`}>
                        {
                            notReadyOrders()?.map((order, index) => {
                                if (index < 20) {
                                    return (<li key={order} className={`text text_type_digits-default orders-summary__board-item`}>{order}</li>)
                                }
                            }
                            )
                        }
                    </ul>
                </div>
            </article>
            <p className={`text text_type_main-medium`}>Выполнено за все время:</p>
            <p className={`mb-15 text text_type_digits-large orders-summary__number`} >{totalOrders}</p>
            <p className={`text text_type_main-medium`}>Выполнено за сегодня:</p>
            <p className={`mb-15 text text_type_digits-large orders-summary__number`} >{totalOrdersToday}</p>
        </div>
    )
}
