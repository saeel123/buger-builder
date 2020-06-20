import * as actionTypes from './actionsTypes';
import axios from 'axios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        const payload = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        console.log(payload);
        

        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCmXaoDWDc6jjBBKqyyG0AYE-1xKVv7Ask', payload).then((response) => {
            console.log(response);
            dispatch(authSuccess(response.data));
        }).catch((error) => {
            dispatch(authFail(error));
        })
    }
}