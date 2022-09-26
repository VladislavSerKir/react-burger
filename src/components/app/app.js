import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import data from '../utils/data';

class App extends React.Component {

    render() {
        return (
            <div className="App" >
                <p>
                    Финальные подготовки
                </p>
                <AppHeader />
                <main>
                    <section><BurgerConstructor /></section>
                    <section><BurgerIngredients /></section>
                </main>
            </div>
        );
    }
}

export default App;