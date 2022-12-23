import React from 'react';
import Card from '../card/card';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types'
import { Link, useLocation } from 'react-router-dom';

const CardsGroup = React.forwardRef((props, ref) => {
    const location = useLocation()

    return (
        <div className={`cards`}>
            <h3 className={`text text_type_main-medium`} id={props.titleId} ref={ref}>{props.title}</h3>
            <ul className={`ml-4 mt-6 mb-10 cards__list`}>
                {/* отрисовка каждой карточки */}

                {props.data?.map((card) => {
                    return (
                        <Link className={`text text_type_main-small cards__link`} key={card._id} to={{
                            pathname: `/ingredients/${card._id}`,
                            state: { background: location }
                        }}>
                            <Card key={card._id} cardData={card} />
                        </Link>
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
