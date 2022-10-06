import PropTypes from 'prop-types';
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyles from './burger-constructor.module.css';

function BurgerConstructor({ data, openOrder }) {

    return (
        <form name='order' action='#' className={`mt-25 ml-4 ${burgerConstructorStyles.burgerConstructor}`}>
            {data[0] &&
                <div className={`mb-4 pr-2 ${burgerConstructorStyles.burgerConstructor__item}`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${data[0].name} (верх)`}
                        price={data[0].price}
                        thumbnail={data[0].image}
                    />
                </div>
            }
            <ul className={`${burgerConstructorStyles.burgerConstructor__listitem}`}>
                {data.map((position) => {
                    return (
                        <li key={position._id} className={`${burgerConstructorStyles.burgerConstructor__item}`}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                isLocked={false}
                                text={position.name}
                                price={position.price}
                                thumbnail={position.image}
                            />
                        </li>
                    )
                })}
            </ul>
            {data[data.length - 1] &&
                <div className={`mt-4 pr-2 ${burgerConstructorStyles.burgerConstructor__item}`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${data[data.length - 1].name} (низ)`}
                        price={data[data.length - 1].price}
                        thumbnail={data[data.length - 1].image}
                    />
                </div>
            }
            <div className={`mt-10 pb-10 ${burgerConstructorStyles.burgerConstructor__checkout}`}>
                <div className={`${burgerConstructorStyles.burgerConstructor__total}`}>
                    <p className={`mr-2 text text_type_main-large ${burgerConstructorStyles.burgerConstructor__ordersum}`}>610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType='submit' type="primary" size="large" onClick={openOrder}>Оформить заказ</Button>
            </div>
        </form>
    )
}

BurgerConstructor.propTypes = {
    openOrder: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        _id: PropTypes.string
    }))
}

export default BurgerConstructor;