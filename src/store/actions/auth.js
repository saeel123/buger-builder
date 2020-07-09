import * as actionTypes from './actionsTypes';
import axios from 'axios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());

        const payload = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCmXaoDWDc6jjBBKqyyG0AYE-1xKVv7Ask';
        if (isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCmXaoDWDc6jjBBKqyyG0AYE-1xKVv7Ask';
        }

        axios.post(url, payload).then((response) => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        }).catch(err => {
            dispatch(authFail(err.response.data.error));
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}