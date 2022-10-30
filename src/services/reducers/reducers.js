import { ADD_INGREDIENT_TO_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR, CLOSE_ALL_MODALS, LOAD_DATA, LOAD_DATA_FAIL, LOAD_CARD_DATA, LOAD_SUMMARY_ORDER_DATA, INGREDIENTS_SWITCH_TAB } from '../actions/actions';
import { initialState } from '../../components/app/app';

export const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR:
            if (action.payload.type === 'bun') {
                return {
                    ...state,
                    burgerConstructor: {
                        ...state.burgerConstructor,
                        bun: action.payload
                    }
                };
            }
            return {
                ...state,
                burgerConstructor: {
                    ...state.burgerConstructor,
                    ingredients: [action.payload, ...state.burgerConstructor.ingredients]
                }
            }
        case REMOVE_INGREDIENT_FROM_CONSTRUCTOR:
            return {
                ...state,
                burgerConstructor: {
                    ...state.burgerConstructor,
                    ingredients: [...state.burgerConstructor.ingredients].filter((item, index) => index !== action.payload)
                }
            }
        case CLOSE_ALL_MODALS:
            return {
                ...state,
                orderDetails: {
                    ...state.orderDetails,
                    isOpened: false
                },
                ingredientDetails: {
                    ...state.ingredientDetails,
                    isOpened: false,
                    ingredient: null
                }
            }
        case LOAD_DATA:
            return {
                ...state,
                ingredients: action.payload.data,
                success: action.payload.success,
            }
        case LOAD_DATA_FAIL:
            return {
                ...state, success: false
            }
        case LOAD_CARD_DATA:
            return {
                ...state,
                ingredientDetails: {
                    ...state.ingredientDetails,
                    isOpened: true,
                    ingredient: action.payload
                },
            }
        case LOAD_SUMMARY_ORDER_DATA:
            return {
                ...state,
                orderDetails: {
                    ...state.orderDetails,
                    isOpened: true,
                    orderNumber: action.payload
                },
                burgerConstructor: {
                    bun: null,
                    ingredients: [],
                }
            }
        case INGREDIENTS_SWITCH_TAB:
            return {
                ...state,
                ingredientsCurrentTab: action.payload
            }
        default:
            return {
                ...state
            }
    }
}