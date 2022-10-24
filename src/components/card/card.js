import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import cardStyles from './card.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types'

function Card({ cardData, getCardsData }) {

    return (
        <li tabIndex='0' className={`${cardStyles.card}`} onClick={() => getCardsData(cardData)}>
            {cardData.quantity && <Counter count={0} size="default" />}
            <img src={cardData.image} alt={cardData.name} className={`${cardStyles.card__image}`}></img>
            <div className={`mb-2 ${cardStyles.card__price}`}>
                <p className={`mr-2 ${cardStyles.card__count}`}>{cardData.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-small ${cardStyles.card__description}`}>{cardData.name}</p>
        </li>
    )
}

Card.propTypes = {
    getCardsData: PropTypes.func.isRequired,
    cardData: PropTypes.shape(ingredientType)
}

export default Card;