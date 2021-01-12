import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    meat: 0.6,
    cheese: 0.4,
    salad: 0.5,
    bacon: 1.3
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ings.salad,
                    bacon: action.ings.bacon,
                    cheese: action.ings.cheese,
                    meat: action.ings.meat
                },
                totalPrice: 4,
                error: false
            }

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }

        case actionTypes.ADD_INGREDIENT:
            const oldCount = state.ingredients[action.ingType];
            const newCount = oldCount + 1;
            const newList = {
                ...state.ingredients
            };

            newList[action.ingType] = newCount;

            const individualPrice = INGREDIENT_PRICES[action.ingType];
            let totPrice = state.totalPrice + individualPrice;
            totPrice = parseFloat(totPrice.toFixed(2));

            return {
                ...state,
                ingredients: newList,
                totalPrice: totPrice
            }

        case actionTypes.REMOVE_INGREDIENT:
            const oldCountR = state.ingredients[action.ingType];

            if (oldCountR <= 0) {
                return;
            }

            const newCountR = oldCountR - 1;

            const newListR = {
                ...state.ingredients
            };

            newListR[action.ingType] = newCountR;

            const individualPriceR = INGREDIENT_PRICES[action.ingType];
            let totPriceR = state.totalPrice - individualPriceR;
            totPriceR = parseFloat(totPriceR.toFixed(2));

            return {
                ...state,
                ingredients: newListR,
                totalPrice: totPriceR
            }
        default:
            return state;

    }
}

export default reducer;