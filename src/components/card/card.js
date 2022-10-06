import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import cardStyles from './card.module.css';

function Card({ cardData, getCardsData }) {

    return (
        <li key={cardData._id} className={`${cardStyles.card}`} onClick={() => getCardsData(cardData)}>
            <Counter count={1} size="default" />
            <img src={cardData.image} alt={cardData.name} className={`${cardStyles.card__image}`}></img>
            <div className={`mb-2 ${cardStyles.card__price}`}>
                <p className={`mr-2 ${cardStyles.card__count}`}>{cardData.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-small ${cardStyles.card__description}`}>{cardData.name}</p>
        </li>
    )
}
export default Card;