import menuHomeStyles from './menu-home.module.css';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function MenuHome() {
    return (
        <button className={menuHomeStyles.menuHome} type='button' >
            <ProfileIcon className={menuHomeStyles.menuHomeImg} type="secondary" />
            <p className={menuHomeStyles.menuHomeText}> Личный кабинет</p>
        </button>
    )
}
export default MenuHome;