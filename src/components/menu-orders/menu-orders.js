import menuOrdersStyles from './menu-orders.module.css';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function MenuOrders() {
    return (
        <button className={menuOrdersStyles.menuOrders} type='button'>
            <ListIcon className={menuOrdersStyles.menuOrdersImg} type="secondary" />
            <p className={menuOrdersStyles.menuOrdersText}> Лента заказов</p>
        </button>
    )
}
export default MenuOrders;