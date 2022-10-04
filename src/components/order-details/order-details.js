import orderDetailsStyles from './order-details.module.css';

function OrderDetails() {

    return (
        <div className={orderDetailsStyles.order}>
            <p className="text text_type_digits-large">1234567890</p>
        </div>
    )
}

export default OrderDetails;