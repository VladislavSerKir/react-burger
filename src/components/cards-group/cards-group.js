import React from 'react';
import cardsGroupStyles from './cards-group.module.css';
import Card from '../card/card';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types'

const CardsGroup = React.forwardRef((props, ref) => {

    return (
        <div className={cardsGroupStyles.cards}>
            <h3 className={`text text_type_main-medium ${cardsGroupStyles.cards__title}`} id={props.titleId} ref={ref}>{props.title}</h3>
            <ul className={`ml-4 mt-6 mb-10 ${cardsGroupStyles.cards__list}`}>
                {/* отрисовка каждой карточки */}
                {props.data?.map((card) => {
                    return (
                        <Card key={card._id} cardData={card} />
                    )
                })}
            </ul>
        </div>
    )
}
)

CardsGroup.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape(ingredientType))
}


export default CardsGroup;
