function reducer(state, action) {
    switch (action.type) {
        case "ADD":
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
        case "CLOSE_ALL_MODALS":
            return {
                ...state,
                orderDetails: {
                    ...state.orderDetails,
                    isOpened: false
                },
                ingredientDetails: {
                    ...state.ingredientDetails,
                    isOpened: false
                }
            }
        case "LOAD_DATA":
            return {
                ...state,
                ingredients: action.payload.data,
                success: action.payload.success,
            }
        case "LOAD_DATA_FAIL":
            return {
                ...state, success: false
            }
        case "LOAD_CARD_DATA":
            return {
                ...state,
                ingredientDetails: {
                    ...state.ingredientDetails,
                    isOpened: true,
                    ingredient: action.payload
                },
            }
        case "LOAD_SUMMARY_ORDER_DATA":
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

export default reducer;