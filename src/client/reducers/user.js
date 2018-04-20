import * as types from '../constants/ActionTypes'

const user = (state = {}, action = { type: null }) => {
	switch (action.type) {
		case types.SET_USERNAME:
			return {
				...state,
				username: action.username
			}
		default:
			return state
	}
}

export default user
