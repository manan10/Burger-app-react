import * as actionType from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initState = {
    ingridients: null,
    totalprice: 4,
    error: false,
    building: false
}


const INGRIEDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addIngridient = (state, action) => {
    const updatedIngridient = {[action.ingridientName]: state.ingridients[action.ingridientName] + 1}
            const updatedIngridients = updateObject(state.ingridients , updatedIngridient)
            const updatedState = {
                ingridients: updatedIngridients,
                totalprice: state.totalprice + INGRIEDIENT_PRICES[action.ingridientName],
                building: true
            }
            return updateObject(state, updatedState)
}

const removeIngridient = (state, action) => {
    const updatedIngridient1 = {[action.ingridientName]: state.ingridients[action.ingridientName] - 1}
    const updatedIngridients1 = updateObject(state.ingridients , updatedIngridient1)
    const updatedState1 = {
        ingridients: updatedIngridients1,
        totalprice: state.totalprice - INGRIEDIENT_PRICES[action.ingridientName],
        building: true  
    }
    return updateObject(state, updatedState1)
}

const setIngridients = (state, action) => {
    return updateObject(state, {
        totalprice: 4,
        ingridients: {
            salad: action.ingridients.salad,
            bacon: action.ingridients.bacon,
            cheese: action.ingridients.cheese,
            meat: action.ingridients.meat
        },
        building: false,
        error: false
    })
}

const setError = (state, action) => {
    return updateObject(state, {error: true})
}

const reducer = (state = initState, action) =>{
    switch(action.type){
        case actionType.ADD_INGRIDIENT: return addIngridient(state, action)
        case actionType.REMOVE_INGRIDIENT: return removeIngridient(state, action)
        case actionType.SET_INGRIDIENTS: return setIngridients(state, action)
        case actionType.SET_ERROR: return setError(state, action)
        default: return state    
    }
}

export default reducer;