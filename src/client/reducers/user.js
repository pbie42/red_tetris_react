import * as types from '../constants/ActionTypes'

const initialUserState = {
	usernameSet: false,
	username: '',
	id: ''
}

const user = (state = initialUserState, action = { type: null }) => {
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
		case types.SET_ID:
			return {
				...state,
				id: action.id
			}
		default:
			return state
	}
}

export default user
