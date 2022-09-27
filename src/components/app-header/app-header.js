import React, { useEffect } from 'react';
import MenuConstructor from '../menu-constructor/menu-constructor';
import MenuOrders from '../menu-orders/menu-orders';
import MenuHome from '../menu-home/menu-home';
import appHeaderStyles from './app-header.module.css';
import headerLogo from '../../images/header-logo.png';

function AppHeader() {
    // const [state, setState] = React.useState({ menuActive: 'constructor' })

    // useEffect((menu) => {
    //     setState(menu)
    //     console.log(state)
    // }, [state])

    // const activeMenu = (menu) => {
    //     setState({ ...state, menuActive: menu });
    // }

    return (
        <header className={appHeaderStyles.appHeader}>
            <nav className={appHeaderStyles.appHeaderNav}>
                <MenuConstructor />
                <MenuOrders />
            </nav>
            <img className={appHeaderStyles.appHeaderLogo} src={headerLogo} alt='Stellar burgers' />
            {/* <MenuHome activeMenu={activeMenu} /> */}
            <MenuHome />

        </header>
    );

}

export default AppHeader;