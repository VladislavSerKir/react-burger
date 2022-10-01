import React from 'react';
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyles from './burger-constructor.module.css';

function BurgerConstructor() {
    return (
        <div className={`mt-25 ml-4 ${burgerConstructorStyles.burgerConstructor}`}>
            <div className={`mb-4 pr-2 ${burgerConstructorStyles.burgerConstructor__item}`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                />
            </div>
            <ul className={`${burgerConstructorStyles.burgerConstructor__listitem}`}>
                <li className={`${burgerConstructorStyles.burgerConstructor__item}`}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        isLocked={false}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </li>
                <li className={`${burgerConstructorStyles.burgerConstructor__item}`}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        isLocked={false}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </li>
                <li className={`${burgerConstructorStyles.burgerConstructor__item}`}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        isLocked={false}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </li>
                <li className={`${burgerConstructorStyles.burgerConstructor__item}`}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        isLocked={false}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </li>
                <li className={`${burgerConstructorStyles.burgerConstructor__item}`}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        isLocked={false}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </li>
                <li className={`${burgerConstructorStyles.burgerConstructor__item}`}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        isLocked={false}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </li>
                <li className={`${burgerConstructorStyles.burgerConstructor__item}`}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        isLocked={false}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </li>
                <li className={`${burgerConstructorStyles.burgerConstructor__item}`}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        isLocked={false}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </li>
                <li className={`${burgerConstructorStyles.burgerConstructor__item}`}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        isLocked={false}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </li>
                <li className={`${burgerConstructorStyles.burgerConstructor__item}`}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        isLocked={false}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </li>
            </ul>
            <div className={`mt-4 pr-2 ${burgerConstructorStyles.burgerConstructor__item}`}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                />
            </div>
            <div className={`mt-10 pb-10 ${burgerConstructorStyles.burgerConstructor__checkout}`}>
                <div className={`${burgerConstructorStyles.burgerConstructor__total}`}>
                    <p className={`mr-2 text text_type_main-large ${burgerConstructorStyles.burgerConstructor__ordersum}`}>610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType='button' type="primary" size="large">Оформить заказ</Button>
            </div>
        </div>
    )
}

export default BurgerConstructor;