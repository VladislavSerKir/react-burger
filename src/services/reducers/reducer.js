import { ADD_INGREDIENT_TO_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR, CLOSE_ALL_MODALS, LOAD_DATA, LOAD_DATA_FAIL, LOAD_CARD_DATA, LOAD_SUMMARY_ORDER_DATA, INGREDIENTS_SWITCH_TAB, CHANGE_TARGET_PLACE_IN_CONSTRUCTOR } from '../actions/actions';


export const initialState = {
    ingredients: [],
    success: false,
    ingredientsCurrentTab: 'bun',
    orderDetails: {
        isOpened: false,
        orderNumber: null
    },
    ingredientDetails: {
        isOpened: false,
        ingredient: null
    },
    burgerConstructor: {
        bun: null,
        ingredients: [],
    }
};



export function dataReducer(state = initialState, action = {}) {
    switch (action.type) {
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
        default:
            return {
                ...state
            }
    }
}

export function modalReducer(state = initialState, action = {}) {
    switch (action.type) {
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
        default:
            return {
                ...state
            }
    }
}

export function ingredientReducer(state = initialState, action = {}) {
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
        case CHANGE_TARGET_PLACE_IN_CONSTRUCTOR: {
            const ingredients = [...state.burgerConstructor.ingredients];
            ingredients.splice(action.targetIndex, 0, ingredients.splice(action.initialIndex, 1)[0]);
            return {
                ...state,
                burgerConstructor: {
                    ...state.burgerConstructor,
                    ingredients: ingredients
                }
            };
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

