import * as types from '../constants/ActionTypes'

const user = (state = { usernameSet: false }, action = { type: null }) => {
	switch (action.type) {
		case types.SET_USERNAME:
			return {
				...state,
				username: action.username
			}
		case types.UNSET_USERNAME:
			return {
				...state,
				username: ''
			}
		case types.USERNAME_SET:
			return {
				...state,
				usernameSet: true
			}
		default:
			return state
	}
}

export default user
