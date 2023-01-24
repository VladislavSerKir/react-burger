import { FC } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../pages/spinner/spinner';
import { useTypedSelector } from '../../services/types';
import { IUseParams } from '../../types';

export const IngredientDetails: FC = () => {
    const { id } = useParams<IUseParams>();
    const ingredients = useTypedSelector(store => store.data?.ingredients);

    const ingredientMatch = ingredients?.find(item => {
        return item._id === id
    })

    const { image_large, name, calories, carbohydrates, fat, proteins } = ingredientMatch || {};

    if (ingredientMatch) {
        return (
            <div className={`pl-10 pr-10 ingredient-details`}>
                <div className={`mt-10 ingredient-details__header`}>
                    <h2 className={`text text_type_main-large ingredient-details__title`}>Детали ингредиента</h2>
                </div>
                <img className={`mt-15 mb-15`} src={image_large} alt='Ингредиент' />
                <p className={`text text_type_main-medium mt-4 mb-8`}>{name}</p>
                <ul className={`text text_type_main-default mb-15 ingredient-details__list`}>
                    <li className={`text text_type_main-default ingredient-details__item`}>
                        <p className={`text text_type_main-default`}>Калории,ккал</p>
                        <p className={`ingredient-details__value`}>{calories}</p>
                    </li>
                    <li className={`text text_type_main-default ingredient-details__item`}>
                        <p className={`text text_type_main-default`}>Белки, г</p>
                        <p className={`ingredient-details__value`}>{carbohydrates}</p>
                    </li>
                    <li className={`text text_type_main-default ingredient-details__item`}>
                        <p className={`text text_type_main-default`}>Жиры, г</p>
                        <p className={`ingredient-details__value`}>{fat}</p>
                    </li>
                    <li className={`text text_type_main-default ingredient-details__item`}>
                        <p className={`text text_type_main-default`}>Углеводы, г</p>
                        <p className={`ingredient-details__value`}>{proteins}</p>
                    </li>
                </ul>
            </div>
        );
    } else {
        return (<Spinner />)
    }
}

export default IngredientDetails;