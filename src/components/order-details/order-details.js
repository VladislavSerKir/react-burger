import PropTypes from 'prop-types';
import orderDetailsStyles from './order-details.module.css';
import orderAcceptedImg from '../../images/graphics.svg';
import closeButtonImg from '../../images/close-button.png';

function OrderDetails({ orderId, closeModal }) {

    return (
        <div className={orderDetailsStyles.order}>
            <button onClick={closeModal} type='button' className={`${orderDetailsStyles.order__closeButton}`}><img src={closeButtonImg} alt='Закрыть окно' /></button>
            <h2 className={`text text_type_digits-large mt-30 mb-8 ${orderDetailsStyles.order__title}`}>{orderId}</h2>
            <p className={`text text_type_main-medium ${orderDetailsStyles.order__id}`}>Идентификатор заказа</p>
            <img className={`mt-15 mb-15 ${orderDetailsStyles.order__image}`} src={orderAcceptedImg} alt='Ваш заказ принят' />
            <p className={`text text_type_main-default ${orderDetailsStyles.order__description}`}>Ваш заказ начали готовить</p>
            <p className={`text text_type_main-default mt-2 mb-30 ${orderDetailsStyles.order__descriptionReady}`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    orderId: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired
}

export default OrderDetails;