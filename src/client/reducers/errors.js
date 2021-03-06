import * as types from '../constants/ActionTypes'

const initialErrorState = {
	error: false,
	errorName: false,
	errorRoom: false,
	errorTooManyMembers: false
}

const errors = (state = initialErrorState, action = { type: null }) => {
	switch (action.type) {
		case types.ERROR_ROOMNAME_TAKEN:
			return { ...state, errorRoom: true }

		case types.ERROR_TOO_MANY_MEMBERS:
			return { ...state, errorTooManyMembers: true }

		case types.ERROR_USERNAME_TAKEN:
			return { ...state, errorName: true }

		default:
			return state
	}
}

export default errors
