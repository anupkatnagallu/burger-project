import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

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

const loadIngs = (ings) => {
    return {
        type: actionTypes.LOAD_INGREDIENTS, 
        ings: ings
    }
}

const fetchingError = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const loadIngredients = () => {
    return dispatch => {
        axios.get('ingredients.json')
            .then(response => {
                dispatch(loadIngs(response.data))
            })
            .catch(err => {
                dispatch(fetchingError())
            });
    }
}