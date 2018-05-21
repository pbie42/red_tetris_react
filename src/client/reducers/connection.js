import * as types from '../constants/ActionTypes'

const initialConnectionState = {
	connected: false,
	users: false,
	rooms: false
}

const connection = (state = initialConnectionState, action) => {
	switch (action.type) {
		case types.CONNECTED:
			return { ...state, connected: true }

		case types.DISCONNECTED:
			return { ...state, connected: false }

		case types.ROOMS_LIST_RECEIVED:
			return { ...state, rooms: true }

		case types.USERS_LIST_RECEIVED:
			return { ...state, users: true }

		default:
			return state
	}
}

export default connection
