import * as types from '../constants/ActionTypes'

const initialErrorState = {
	error: false,
	errorName: false,
	errorRoom: false
}

const errors = (state = initialErrorState, action) => {
	switch (action.type) {
		case types.USERNAME_TAKEN:
			return { ...state, errorName: true }
		case types.ROOMNAME_TAKEN:
			return { ...state, errorRoom: true }

		default:
			return state
	}
}

export default errors
