import * as types from '../constants/ActionTypes'

const connection = (state = false, action) => {
	switch (action.type) {
		case types.CONNECTED:
			return true
		case types.DISCONNECTED:
			return false

		default:
			return state
	}
}

export default connection
