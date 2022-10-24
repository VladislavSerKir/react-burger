import cardsGroupStyles from './cards-group.module.css';
import Card from '../card/card';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types'

function CardsGroup({ data, title, getCardsData }) {

    return (
        <div className={cardsGroupStyles.cards}>
            <h3 className={`text text_type_main-medium ${cardsGroupStyles.cards__title}`}>{title}</h3>
            <ul className={`ml-4 mt-6 mb-10 ${cardsGroupStyles.cards__list}`}>
                {/* отрисовка каждой карточки */}
                {data.map((card) => {
                    return (
                        <Card key={card._id} cardData={card} getCardsData={getCardsData} />
                    )
                })}
            </ul>
        </div>
    )
}

CardsGroup.propTypes = {
    getCardsData: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape(ingredientType))
}

export default CardsGroup;
