import * as types from '../constants/ActionTypes'

const user = (state = {}, action) => {
	switch (action.type) {
		case types.SET_NICKNAME:
			return {
				...state,
				nickname: action.nickname
			}
		default:
			return state
	}
}

export default user
