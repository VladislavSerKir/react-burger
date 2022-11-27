import { useMemo } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import cardStyles from './card.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { getCardData } from '../../services/reducers/dataReducer';
import { openIngredient } from '../../services/reducers/modalReducer';

function Card({ cardData }) {

    const dispatch = useDispatch();
    const store = useSelector(store => store);
    const ingredients = store.burgerConstructor.ingredients;

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: cardData
    });

    const getCardsData = (cardData) => {
        console.log(cardData)
        dispatch(getCardData(cardData))
        dispatch(openIngredient())
    }

    const quantity = useMemo(() => {
        return ingredients.filter(ingredient => ingredient._id === cardData._id).length
    }, [ingredients])

    return (
        <li ref={dragRef} tabIndex='0' className={`${cardStyles.card}`} onClick={() => getCardsData(cardData)}>
            {quantity !== 0 && <Counter count={quantity} size="default" />}
            <img src={cardData.image} alt={cardData.name} className={`${cardStyles.card__image}`}></img>
            <div className={`mb-2 ${cardStyles.card__price}`}>
                <p className={`mr-2 ${cardStyles.card__count}`}>{cardData.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-small ${cardStyles.card__description}`}>{cardData.name}</p>
        </li >
    )
}

Card.propTypes = {
    cardData: PropTypes.shape(ingredientType)
}

export default Card;