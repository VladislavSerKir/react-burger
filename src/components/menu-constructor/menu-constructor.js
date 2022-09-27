import menuConstructorStyles from './menu-constructor.module.css';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function MenuConstructor() {
    return (
        <button className={menuConstructorStyles.menuConstructor} type='button'>
            <BurgerIcon className={menuConstructorStyles.menuConstructorImg} type="secondary" />
            <p className={menuConstructorStyles.menuConstructorText}>Конструктор</p>
        </button>
    )
}
export default MenuConstructor;