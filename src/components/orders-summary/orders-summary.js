import { useCallback } from 'react';
import ordersSummaryStyles from './orders-summary.module.css';

export const OrdersSummary = ({ orders }) => {

    const totalOrders = orders?.total;
    const totalOrdersToday = orders?.totalToday
    // console.log(orders?.orders);

    const readyOrders = useCallback(() => {
        return orders?.orders.filter(order => order.status === 'done').map(order => order.number)
    }, [orders?.orders]);

    const notReadyOrders = useCallback(() => {
        return orders?.orders.filter(order => order.status !== 'done').map(order => order.number)
    }, [orders?.orders]);

    // console.log(readyOrders());

    return (
        <div className={` ${ordersSummaryStyles.ordersSummaryContainer}`}>
            <article className={`mb-15 ${ordersSummaryStyles.ordersBoard}`}>
                <div className={` ${ordersSummaryStyles.board}`}>
                    <p className={`mb-6 text text_type_main-medium ${ordersSummaryStyles.boardTitle}`}> Готовы:</p>
                    <ul className={` ${ordersSummaryStyles.boardList}`}>
                        {
                            readyOrders()?.map((order, index) => {
                                if (index < 20) {
                                    return (<li key={order} className={`text text_type_digits-default text_color_success ${ordersSummaryStyles.boardItem}`}>{order}</li>)
                                }
                            }
                            )
                        }
                    </ul>
                </div>
                <div className={` ${ordersSummaryStyles.board}`}>
                    <p className={`mb-6 text text_type_main-medium ${ordersSummaryStyles.boardTitle}`}> В работе:</p>
                    <ul className={` ${ordersSummaryStyles.boardList}`}>
                        {
                            notReadyOrders()?.map((order, index) => {
                                if (index < 20) {
                                    return (<li key={order} className={`text text_type_digits-default ${ordersSummaryStyles.boardItem}`}>{order}</li>)
                                }
                            }
                            )
                        }
                    </ul>
                </div>
            </article>
            <p className={`text text_type_main-medium`}>Выполнено за все время:</p>
            <p className={`mb-15 text text_type_digits-large ${ordersSummaryStyles.ordersNumber}`} >{totalOrders}</p>
            <p className={`text text_type_main-medium`}>Выполнено за сегодня:</p>
            <p className={`mb-15 text text_type_digits-large ${ordersSummaryStyles.ordersNumber}`} >{totalOrdersToday}</p>
        </div>
    )
}
