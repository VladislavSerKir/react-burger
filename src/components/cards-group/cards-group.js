import React from 'react';
import cardsGroupStyles from './cards-group.module.css';
import Card from '../card/card';

function CardsGroup({ data, title }) {
    return (
        <div className={cardsGroupStyles.cards}>
            <h3 className={`text text_type_main-medium ${cardsGroupStyles.cards__title}`}>{title}</h3>
            <ul className={`ml-4 mt-6 mb-10 ${cardsGroupStyles.cards__list}`}>
                {/* отрисовка каждой карточки */}
                {data.map((card) => {
                    return (
                        <Card key={card._id} cardData={card} />
                    )
                })}
            </ul>
        </div>
    )
}

export default CardsGroup;
