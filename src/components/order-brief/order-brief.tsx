import orderAcceptedImg from '../../images/graphics.svg';
import { useTypedSelector } from '../../services/types';
import { FC } from 'react';

export const OrderBrief: FC = () => {
    const orderNumber = useTypedSelector(store => store.burgerConstructor.orderNumber)

    return (
        <div className={`order-brief`}>
            <h2 className={`text text_type_digits-large mt-30 mb-8 order-brief__title`}>{orderNumber}</h2>
            <p className={`text text_type_main-medium`}>Идентификатор заказа</p>
            <img className={`mt-15 mb-15`} src={orderAcceptedImg} alt='Ваш заказ принят' />
            <p className={`text text_type_main-default`}>Ваш заказ начали готовить</p>
            <p className={`text text_type_main-default mt-2 mb-30 order-brief__status`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderBrief;