import ingredientDetailsStyles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../../pages/spinner/spinner';

function IngredientDetails() {
    const { id } = useParams();
    const ingredients = useSelector(store => store.data.ingredients);

    const ingredient = ingredients.find(item => {
        return item._id === id
    })

    const { image_large, name, calories, carbohydrates, fat, proteins } = ingredient;

    if (!ingredient) {
        return (<Spinner />)
    } else {
        return (
            <div className={`pl-10 pr-10 ${ingredientDetailsStyles.ingredient}`}>
                <div className={`mt-10 ${ingredientDetailsStyles.ingredient__header}`}>
                    <h2 className={`text text_type_main-large ${ingredientDetailsStyles.ingredient__title}`}>Детали ингредиента</h2>
                </div>
                <img className={`mt-15 mb-15 ${ingredientDetailsStyles.ingredient__image}`} src={image_large} alt='Ингредиент' />
                <p className={`text text_type_main-medium mt-4 mb-8 ${ingredientDetailsStyles.ingredient__name}`}>{name}</p>
                <ul className={`text text_type_main-default mb-15 ${ingredientDetailsStyles.ingredient__listItem}`}>
                    <li className={`text text_type_main-default ${ingredientDetailsStyles.ingredient__item}`}>
                        <p className={`text text_type_main-default ${ingredientDetailsStyles.ingredient__itemText}`}>Калории,ккал</p>
                        <p className={`${ingredientDetailsStyles.ingredient__itemValue}`}>{calories}</p>
                    </li>
                    <li className={`text text_type_main-default ${ingredientDetailsStyles.ingredient__item}`}>
                        <p className={`text text_type_main-default ${ingredientDetailsStyles.ingredient__itemText}`}>Белки, г</p>
                        <p className={`${ingredientDetailsStyles.ingredient__itemValue}`}>{carbohydrates}</p>
                    </li>
                    <li className={`text text_type_main-default ${ingredientDetailsStyles.ingredient__item}`}>
                        <p className={`text text_type_main-default ${ingredientDetailsStyles.ingredient__itemText}`}>Жиры, г</p>
                        <p className={`${ingredientDetailsStyles.ingredient__itemValue}`}>{fat}</p>
                    </li>
                    <li className={`text text_type_main-default ${ingredientDetailsStyles.ingredient__item}`}>
                        <p className={`text text_type_main-default ${ingredientDetailsStyles.ingredient__itemText}`}>Углеводы, г</p>
                        <p className={`${ingredientDetailsStyles.ingredient__itemValue}`}>{proteins}</p>
                    </li>
                </ul>
            </div>
        );
    }
}

export default IngredientDetails;