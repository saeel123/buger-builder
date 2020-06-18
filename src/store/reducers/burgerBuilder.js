import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 1,
    bacon: 2,
    cheese: 3,
    meat: 4
}


const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
            return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIngred = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const updatedIngreds = updateObject(state.ingredients, updatedIngred);
            const updatedSt = {
                ingredients: updatedIngreds,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
            return updateObject(state, updatedSt);
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4
            })
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {
                error: true
            })
        default:
            return state; 
    }
}

export default reducer;