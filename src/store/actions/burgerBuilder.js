import * as actionTypes from './actionTypes';

export const addIngredient = ingType => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingType: ingType
    }
}

export const removeIngredient = ingType => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingType: ingType
    }
}

export const loadIngs = (ings) => {
    return {
        type: actionTypes.LOAD_INGREDIENTS, 
        ings: ings
    }
}

export const fetchingError = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const loadIngredients = () => {
    return {
        type: actionTypes.INIT_LOAD_INGREDIENTS
    }
}