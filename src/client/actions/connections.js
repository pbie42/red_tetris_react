import * as types from '../constants/ActionTypes'

export const connected = () => ({
	type: types.CONNECTED,
	connected: true
})

export const disconnected = () => ({
	type: types.DISCONNECTED,
	connected: false
})
