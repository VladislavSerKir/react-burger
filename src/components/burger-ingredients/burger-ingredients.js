import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyles from './burger-ingredients.module.css';
import CardsGroup from '../cards-group/cards-group';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIngredientsTab } from '../../services/reducers/dataReducer';

const BurgerIngredients = () => {

    const store = useSelector(store => store);
    const { ingredients, ingredientsCurrentTab } = store.data;
    const dispatch = useDispatch();

    const handleTabClick = (tab) => {
        dispatch(toggleIngredientsTab(tab))
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
            dispatch(toggleIngredientsTab('bun'))
        } else if (inViewSauces) {
            dispatch(toggleIngredientsTab('sauce'))
        } else if (inViewFilling) {
            dispatch(toggleIngredientsTab('main'))
        }
    }, [ingredientsCurrentTab, inViewBuns, inViewFilling, inViewSauces, dispatch]);

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
                <Tab
                    value="bun"
                    active={ingredientsCurrentTab === 'bun'}
                    onClick={() => { handleTabClick('bun') }}
                >
                    Булки
                </Tab>
                <Tab
                    value="sauce"
                    active={ingredientsCurrentTab === 'sauce'}
                    onClick={() => { handleTabClick('sauce') }}
                >
                    Соусы
                </Tab>
                <Tab
                    value="main"
                    active={ingredientsCurrentTab === 'main'}
                    onClick={() => { handleTabClick('main') }}
                >
                    Начинки
                </Tab>
            </div>
            <div className={`${burgerIngredientsStyles.ingredients__content}`}>
                {/* группы карточек по категориям */}
                <CardsGroup
                    ref={bunsRef}
                    data={dataBun}
                    titleId='bun'
                    title={'Булки'}
                />
                <CardsGroup
                    ref={saucesRef}
                    data={dataSauce}
                    titleId='sauce'
                    title={'Соусы'}
                />
                <CardsGroup
                    ref={mainsRef}
                    data={dataMain}
                    titleId='main'
                    title={'Начинки'}
                />
            </div>
        </section>
    )
}

export default BurgerIngredients;