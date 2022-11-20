import { Logo, ProfileIcon, ListIcon, BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import appHeaderStyles from './app-header.module.css';

function AppHeader() {
    const { pathname } = useLocation();

    return (
        <header className={appHeaderStyles.header}>
            <nav className={appHeaderStyles.header__nav}>
                <div className={appHeaderStyles.header__group}>
                    <NavLink to='/' className={`pl-5 pr-5 pt-4 pb-4 mt-4 mb-4 ${appHeaderStyles.header__button}`} activeClassName={appHeaderStyles.active}>
                        <BurgerIcon type={pathname === '/' ? "primary" : "secondary"} />
                        <p className={`text text_type_main-default ml-2`} style={pathname !== '/' ? { color: '#8585AD' } : null}>Конструктор</p>
                    </NavLink>
                    <NavLink to='/feed' className={`pl-5 pr-5 pt-4 pb-4 mt-4 mb-4 ${appHeaderStyles.header__button}`} activeClassName={appHeaderStyles.active}>
                        <ListIcon type={pathname === '/feed' ? "primary" : "secondary"} />
                        <p className={`text text_type_main-default ml-2`} style={pathname !== '/feed' ? { color: '#8585AD' } : null}>Лента заказов</p>
                    </NavLink>
                </div>
                <Logo />
                <NavLink to='/profile' className={`pl-5 pr-5 pt-4 pb-4 mt-4 mb-4 ${appHeaderStyles.header__button}`} activeClassName={appHeaderStyles.active}>
                    <ProfileIcon type={pathname === '/profile' ? "primary" : "secondary"} />
                    <p className={`text text_type_main-default ml-2`} style={pathname !== '/profile' ? { color: '#8585AD' } : null}>Личный кабинет</p>
                </NavLink>
            </nav>
        </header>
    );
}

export default AppHeader;