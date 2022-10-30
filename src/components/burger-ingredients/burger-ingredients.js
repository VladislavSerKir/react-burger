import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyles from './burger-ingredients.module.css';
import CardsGroup from '../cards-group/cards-group';
import { useDispatch, useSelector } from 'react-redux';
import { INGREDIENTS_SWITCH_TAB } from '../../services/actions/actions';

const BurgerIngredients = () => {
    const { ingredients, ingredientsCurrentTab } = useSelector(store => store);
    const dispatch = useDispatch();

    const onTabClick = (tab) => {
        dispatch({
            type: INGREDIENTS_SWITCH_TAB,
            payload: tab
        })
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    const [bunsRef, inViewBuns] = useInView({
        threshold: 0,
    });

    const [mainsRef, inViewFilling] = useInView({
        threshold: 0,
    });

    const [saucesRef, inViewSauces] = useInView({
        threshold: 0,
    });

    React.useEffect(() => {
        if (inViewBuns) {
            dispatch({
                type: INGREDIENTS_SWITCH_TAB,
                payload: 'bun'
            })
        } else if (inViewSauces) {
            dispatch({
                type: INGREDIENTS_SWITCH_TAB,
                payload: 'sauce'
            })
        } else if (inViewFilling) {
            dispatch({
                type: INGREDIENTS_SWITCH_TAB,
                payload: 'main'
            })
        }
    }, [ingredientsCurrentTab, inViewBuns, inViewFilling, inViewSauces]);

    const dataBun = React.useMemo(() => {
        return ingredients?.filter(item => item.type === 'bun');
    }, [ingredients])

    const dataMain = React.useMemo(() => {
        return ingredients?.filter(item => item.type === 'main');
    }, [ingredients])

    const dataSauce = React.useMemo(() => {
        return ingredients?.filter(item => item.type === 'sauce')
    }, [ingredients])

    return (
        <section className={burgerIngredientsStyles.ingredients}>
            <h1 className={`text text_type_main-large mt-10 mb-5 ${burgerIngredientsStyles.ingredients__title}`}>Соберите бургер</h1>
            <div className={`mb-10 ${burgerIngredientsStyles.ingredients__switcher}`}>
                <Tab value="bun" active={ingredientsCurrentTab === 'bun'} onClick={() => { onTabClick('bun') }}>
                    Булки
                </Tab>
                <Tab value="sauce" active={ingredientsCurrentTab === 'sauce'} onClick={() => { onTabClick('sauce') }} >
                    Соусы
                </Tab>
                <Tab value="main" active={ingredientsCurrentTab === 'main'} onClick={() => { onTabClick('main') }} >
                    Начинки
                </Tab>
            </div>
            <div className={`${burgerIngredientsStyles.ingredients__content}`}>
                {/* группы карточек по категориям */}
                <CardsGroup ref={bunsRef} data={dataBun} titleId='bun' title={'Булки'} />
                <CardsGroup ref={saucesRef} data={dataSauce} titleId='sauce' title={'Соусы'} />
                <CardsGroup ref={mainsRef} data={dataMain} titleId='main' title={'Начинки'} />
            </div>
        </section>
    )
}

export default BurgerIngredients;