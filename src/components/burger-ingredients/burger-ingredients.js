import React, { useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyles from './burger-ingredients.module.css';

function BurgerIngredients({ data }) {
    const [current, setCurrent] = React.useState('one');
    const bun = data.filter(item => item.type === 'bun');
    const main = data.filter(item => item.type === 'main');
    const sauce = data.filter(item => item.type === 'sauce');
    useEffect(() => {
        console.log(bun, main, sauce);
    })
    return (
        <section className={burgerIngredientsStyles.ingredients}>
            <h1 className={`text text_type_main-large mt-10 mb-5 ${burgerIngredientsStyles.ingredients__title}`}>Соберите бургер</h1>
            <div className={burgerIngredientsStyles.ingredients__switcher}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    One
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Two
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Three
                </Tab>
            </div>

        </section>
    )
}

export default BurgerIngredients;