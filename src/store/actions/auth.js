import * as actionTypes from './actionTypes'
import axios from 'axios'


export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return { 
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime*1000)
    }
} 

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token , userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const setRedirectPath = (path) => {
    return {
        type: actionTypes.SET_REDIRECTPATH,
        path: path
    }
}

export const auth = (email, pwd, isSignup) => {
    return dispatch => {
        dispatch(authStart())
        const authdata = {
            email: email,
            password: pwd,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDNWuvolPWeVaa4YJkG2SYhucucsAND6YM'
        if(!isSignup)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDNWuvolPWeVaa4YJkG2SYhucucsAND6YM'
        axios.post(url, authdata)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token',response.data.idToken)
                localStorage.setItem('expirationDate',expirationDate)
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn)) 
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token)
            dispatch(logout())
        else{    
            const expirationTime = new Date(localStorage.getItem('expirationDate'))    
            if(expirationTime < new Date())
                dispatch(logout())
            else{
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime())/1000))
            }
        }    
    }
}