import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyles from './burger-ingredients.module.css';
import CardsGroup from '../cards-group/cards-group';
import { IngredientsContext } from '../services/ingredientsContext';

function BurgerIngredients({ getCardsData }) {

    const { state } = React.useContext(IngredientsContext);
    const { ingredients } = state;

    const [current, setCurrent] = React.useState('one');

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
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent} >
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent} >
                    Начинки
                </Tab>
            </div>
            <div className={`${burgerIngredientsStyles.ingredients__content}`}>
                {/* группы карточек по категориям */}
                <CardsGroup data={dataBun} title={'Булки'} getCardsData={getCardsData} />
                <CardsGroup data={dataSauce} title={'Соусы'} getCardsData={getCardsData} />
                <CardsGroup data={dataMain} title={'Начинки'} getCardsData={getCardsData} />
            </div>
        </section>
    )
}

// проверка пропов типов данных массива и его свойств
BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        _id: PropTypes.string
    }))
}

export default BurgerIngredients;