import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOAD_USER, AUTH_FAIL, LOGIN_FAIL, LOGOUT } from './types';
import axios from 'axios';
import { setAlert } from './AlertActions';
import setAuthToken from '../utils/setAuthToken'


// :load user
export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth')
        dispatch({
            type: LOAD_USER,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_FAIL
        })
    }
}

// :register
export const register = ({ name, email, password, kind }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password, kind })

    try {
        const res = await axios.post('/api/users', body, config);
        
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error', 'filled')))
        }
        
        dispatch({
            type: REGISTER_FAIL
        })
    }
}


// :login
export const login = ( email, password ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post('/api/auth', body, config);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'error', 'filled')))
        }
        
        dispatch({
            type: LOGIN_FAIL
        })
    }
}


// :logout
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT    
    })
}