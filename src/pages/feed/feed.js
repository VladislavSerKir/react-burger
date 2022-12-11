import { useSelector } from 'react-redux';
import { OrdersFeed } from '../../components/orders-feed/orders-feed';
import { OrdersSummary } from '../../components/orders-summary/orders-summary';
import feedStyles from './feed.module.css';


export const Feed = () => {

    const orders = useSelector(store => store.data?.orders)

    return (
        <section className={` ${feedStyles.feed}`}>
            <h3 className={`mt-10 mb-5 text text_type_main-large ${feedStyles.title}`}>Лента заказов</h3>
            <div className={` ${feedStyles.feedContainer}`}>
                <OrdersFeed className={` ${feedStyles.ordersFeed}`} orders={orders} />
                {/* <OrdersFeed className={` ${feedStyles.ordersFeed}`} /> */}

                <OrdersSummary className={` ${feedStyles.ordersSummary}`} orders={orders} />
            </div>
        </section>
    )
}