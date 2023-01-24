import React from 'react';
import Card from '../card/card';
import { Link, useLocation } from 'react-router-dom';
import { IUseLocation } from '../../types';
import { TIngredient } from '../../services/types';

type TCardsGroupProps = {
    titleId: string
    title: string
    data: Array<TIngredient> | undefined
}

const CardsGroup = React.forwardRef<HTMLHeadingElement, TCardsGroupProps>((props, ref) => {
    const location = useLocation<IUseLocation>()

    return (
        <div className={`cards`}>
            <h3 className={`text text_type_main-medium`} id={props.titleId} ref={ref}>{props.title}</h3>
            <ul className={`ml-4 mt-6 mb-10 cards__list`}>
                {/* отрисовка каждой карточки */}

                {props.data?.map((card: TIngredient) => {
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

export default CardsGroup;
