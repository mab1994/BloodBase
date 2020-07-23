import { SET_ALERT } from './types'

export const setAlert = (msg, type, fillness, id) => dispatch => {
    dispatch({
        type: SET_ALERT,
        payload: { msg, type, fillness, id }
    })
}