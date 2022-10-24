import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyles from './burger-ingredients.module.css';
import CardsGroup from '../cards-group/cards-group';
import { IngredientsContext } from '../services/ingredientsContext';

function BurgerIngredients({ getCardsData }) {
    const { state } = React.useContext(IngredientsContext);
    const { ingredients } = state;
    // const tabBun = React.useRef(null);
    // const tabSauce = React.useRef(null);
    // const tabMain = React.useRef(null);

    const [current, setCurrent] = React.useState('bun');

    const dataBun = React.useMemo(() => {
        return ingredients.filter(item => item.type === 'bun');
    }, [ingredients])

    const dataMain = React.useMemo(() => {
        return ingredients.filter(item => item.type === 'main');
    }, [ingredients])

    const dataSauce = React.useMemo(() => {
        return ingredients.filter(item => item.type === 'sauce')
    }, [ingredients])

    return (
        <section className={burgerIngredientsStyles.ingredients}>
            <h1 className={`text text_type_main-large mt-10 mb-5 ${burgerIngredientsStyles.ingredients__title}`}>Соберите бургер</h1>
            <div className={`mb-10 ${burgerIngredientsStyles.ingredients__switcher}`}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent} >
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent} >
                    Начинки
                </Tab>
            </div>
            <div className={`${burgerIngredientsStyles.ingredients__content}`}>
                {/* группы карточек по категориям */}
                <CardsGroup data={dataBun} id='bun' title={'Булки'} getCardsData={getCardsData} />
                <CardsGroup data={dataSauce} id='sauce' title={'Соусы'} getCardsData={getCardsData} />
                <CardsGroup data={dataMain} id='main' title={'Начинки'} getCardsData={getCardsData} />
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    getCardsData: PropTypes.func.isRequired
}

export default BurgerIngredients;