import * as actionTypes from '../constants'

export function update(data) {
    return {
        type: actionTypes.USER_LOGIN,
        data
    }
}
