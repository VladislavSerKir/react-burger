import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
// import data from '../utils/data';



function App() {

    return (
        <div className={appStyles.body} >
            <AppHeader />
            <main>
                <section><BurgerConstructor /></section>
                <section><BurgerIngredients /></section>
            </main>
        </div>
    );
}

export default App;