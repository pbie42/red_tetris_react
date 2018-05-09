import * as types from '../constants/ActionTypes'
import {
	addUser,
	addRoom,
	messageReceived,
	populateUsersList,
	populateRoomsList
} from '../actions'
import { store } from '../../index'

import openSocket from 'socket.io-client'

const setupSocket = dispatch => {
	const socket = openSocket('http://localhost:8000')

	socket.on('connect', () => {
		console.log(`connected`)
		// socket.emit(
		// 	'message',
		// 	JSON.stringify({
		// 		type: types.ADD_USER,
		// 		name: 'test'
		// 	})
		// )
	})

	socket.on('message', event => {
		console.log(`message`)
		console.log(`event`, event)
		const data = JSON.parse(event)
		console.log(`data`, data)
		switch (data.type) {
			case types.ADD_MESSAGE:
				console.log(`ADD_MESSAGE`)
				if (data.author !== store.getState().user.username)
					dispatch(messageReceived(data.message, data.author))
				break
			case types.ADD_USER:
				console.log(`ADD_USER`)
				dispatch(addUser(data.name))
				break
			case types.ADD_ROOM:
				console.log(`ADD_ROOM`)
				dispatch(addRoom(data.roomName, data.members))
				break
			case types.USERS_LIST:
				console.log(`USERS_LIST`)
				console.log(`data.users`, data.users)
				dispatch(populateUsersList(data.users))
				break
			case types.ROOMS_LIST:
				console.log(`ROOMS_LIST`)
				console.log(`data.rooms`, data.rooms)
				dispatch(populateRoomsList(data.rooms))
				break
			default:
				break
		}
	})

	return socket
}

export default setupSocket
