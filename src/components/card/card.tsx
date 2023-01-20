import { useMemo, FC } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd';
import { getCardData } from '../../services/reducers/dataReducer';
import { openIngredient } from '../../services/reducers/modalReducer';
import { useTypedSelector } from '../../services/types';
import { useTypedDispatch } from '../../services/types';
import { TIngredient } from '../../services/types';

interface ICardProps {
    cardData: TIngredient
}

const Card: FC<ICardProps> = ({ cardData }) => {

    const dispatch = useTypedDispatch();
    const store = useTypedSelector(store => store);
    const ingredients = store.burgerConstructor.ingredients;

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: cardData,
    });

    const getCardsData = (cardData: TIngredient) => {
        dispatch(getCardData(cardData))
        dispatch(openIngredient)
    }

    const quantity = useMemo(() => {
        return ingredients.filter(ingredient => ingredient._id === cardData._id).length
    }, [ingredients])

    return (
        <li ref={dragRef} tabIndex={0} className={`card`} onClick={() => getCardsData(cardData)}>
            {quantity !== 0 && <Counter count={quantity} size="default" />}
            <img src={cardData.image} alt={cardData.name} className={`card__image`}></img>
            <div className={`mb-2 card__price`}>
                <p className={`mr-2 card__count`}>{cardData.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-small card__description`}>{cardData.name}</p>
        </li >
    )
}

export default Card;