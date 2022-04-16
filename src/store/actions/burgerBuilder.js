import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngrideient = (name) => {
    return {
        type: actionTypes.ADD_INGRIDIENT,
        ingridientName: name,
    }
}

export const removeIngrideient = (name) => {
    return {
        type: actionTypes.REMOVE_INGRIDIENT,
        ingridientName: name,
    }
}

export const setIngridients = (ingridients) => {
    return{
        type: actionTypes.SET_INGRIDIENTS,
        ingridients: ingridients
    }
}

export const setError = () => {
    return{
        type: actionTypes.SET_ERROR
    }
}

export const initIngridients = () => {
    return dispatch => {
        axios.get('https://burger-app-react-4a46b.firebaseio.com/ingridients.json')
        .then(response => {
            dispatch(setIngridients(response.data))
        })
        .catch(error => {
            dispatch(setError())    
        })
    }
}