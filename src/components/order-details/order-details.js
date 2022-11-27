import orderDetailsStyles from './order-details.module.css';
import orderAcceptedImg from '../../images/graphics.svg';
import { useSelector } from 'react-redux';

function OrderDetails() {
    const orderNumber = useSelector(store => store.burgerConstructor.orderNumber)

    return (
        <div className={orderDetailsStyles.order}>
            <h2 className={`text text_type_digits-large mt-30 mb-8 ${orderDetailsStyles.order__title}`}>{orderNumber}</h2>
            <p className={`text text_type_main-medium ${orderDetailsStyles.order__id}`}>Идентификатор заказа</p>
            <img className={`mt-15 mb-15 ${orderDetailsStyles.order__image}`} src={orderAcceptedImg} alt='Ваш заказ принят' />
            <p className={`text text_type_main-default ${orderDetailsStyles.order__description}`}>Ваш заказ начали готовить</p>
            <p className={`text text_type_main-default mt-2 mb-30 ${orderDetailsStyles.order__descriptionReady}`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;