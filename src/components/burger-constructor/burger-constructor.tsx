import { useMemo, FC } from 'react';
import { useDrop } from 'react-dnd';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { onPlaceOrder } from '../../services/actions/actions';
import { Ingredient } from '../ingredient/ingredient';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Spinner from '../../pages/spinner/spinner';
import { v4 as uuidv4 } from 'uuid';
import { useTypedSelector } from '../../services/types';
import { useTypedDispatch } from '../../services/types';
import { IUseLocation } from '../../types';
import { TIngredient } from '../../services/types';

interface IBurgerConstructorProps {
    onDropHandler: (mutatedIngredient: TIngredient & { index: string }) => void
}

const BurgerConstructor: FC<IBurgerConstructorProps> = ({ onDropHandler }) => {

    const dispatch = useTypedDispatch();
    const store = useTypedSelector(store => store);
    const user = useTypedSelector(store => store.user.userData.name);
    const orderRequest = useTypedSelector(store => store.burgerConstructor.orderRequest)
    const location = useLocation<IUseLocation>();
    const history = useHistory();
    const { burgerConstructor } = store || {} || undefined;

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        drop: (ingredient: TIngredient) => {
            let index = uuidv4()
            let mutatedIngredient = { index, ...ingredient }
            onDropHandler(mutatedIngredient);
            return { mutatedIngredient }
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
    })

    const hoverDrop = isHover ? `burger-constructor__hover` : `burger-constructor`;
    const isActive = (burgerConstructor.bun && user.length ? true : false)

    const cart = useMemo(() => {
        if (burgerConstructor.bun && burgerConstructor.ingredients)
            return [burgerConstructor?.bun?._id, ...burgerConstructor.ingredients?.map((item) => item?._id), burgerConstructor?.bun._id]
    }, [burgerConstructor.bun, burgerConstructor.ingredients])

    const total = useMemo(() => {
        if (burgerConstructor.bun && burgerConstructor.ingredients) {
            return burgerConstructor?.bun.price * 2 + Array.from(burgerConstructor?.ingredients).reduce((accum: number, item: TIngredient) => {
                if (item) {
                    accum += item.price;
                }
                return accum;
            }, 0)
        }

    }, [burgerConstructor])

    const handlePlaceOrder = (event: React.FormEvent<HTMLFormElement>) => {
        if (!user) {
            history.push('/login')
        } else if (cart) {
            event.preventDefault();
            dispatch(onPlaceOrder(cart))
            history.push({
                pathname: '/order',
                state: {
                    background: location
                }
            })
        }
    }

    if (orderRequest) {
        return (
            <Spinner />
        );
    }

    return (
        <form ref={dropTarget} name='order' action='#' onSubmit={handlePlaceOrder} className={`mt-25 ml-4 ${hoverDrop} `}>
            {
                burgerConstructor?.bun &&
                <div className={`mb-4 pr-2 burger-constructor__item`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${burgerConstructor?.bun?.name} (верх)`}
                        price={burgerConstructor?.bun?.price}
                        thumbnail={burgerConstructor?.bun?.image}
                    />
                </div>
            }
            <ul className={`burger-constructor__list`}>
                {burgerConstructor.ingredients.map((position, index) => <Ingredient key={position.index} id={position.index} position={position} index={index} />)}
            </ul>
            {
                burgerConstructor?.bun &&
                <div className={`mt-4 pr-2 burger-constructor__item`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${burgerConstructor?.bun?.name} (низ)`}
                        price={burgerConstructor?.bun?.price}
                        thumbnail={burgerConstructor?.bun?.image}
                    />
                </div>
            }
            <div className={`mt-10 pb-10 burger-constructor__checkout`}>
                {burgerConstructor?.bun && burgerConstructor?.ingredients &&
                    <div className={`burger-constructor__total`}>
                        <p className={`mr-2 text text_type_main - large burger-constructor__order-sum`}>{total}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                }
                <Button
                    htmlType='submit'
                    type="primary"
                    size="large"
                    disabled={!isActive}
                >
                    Оформить заказ
                </Button>
            </div>
            {!user &&
                <p className={`text text_type_main-default text_color_inactive burger-constructor__text`}>Для того чтобы оформить заказ нужно&nbsp;
                    <Link
                        className={`text text_type_main-default burger-constructor__link`}
                        to={{
                            pathname: `/login`,
                        }}>
                        войти
                    </Link>
                </p>
            }

            {!burgerConstructor.bun &&
                <p className={`mt-5 text text_type_main-default text_color_inactive burger-constructor__text`}>Добавьте булку
                </p>
            }

        </form >
    )
}

export default BurgerConstructor;