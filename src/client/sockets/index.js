import * as types from '../constants/ActionTypes'
import {
	addUser,
	addRoom,
	messageReceived,
	populateUsersList,
	populateRoomsList,
	connected,
	usersListReceived,
	roomsListReceived,
	updateGameMembers,
	updateGamePiece,
	usernameSet
} from '../actions'
import { store } from '../../index'

import openSocket from 'socket.io-client'

const setupSocket = dispatch => {
	const socket = openSocket('http://localhost:8000')

	socket.on('connect', () => {
		console.log(`connected`)
		dispatch(connected())
	})

	socket.on('message', event => {
		// console.log(`message`)
		// console.log(`event`, event)
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
				dispatch(addUser(data.username))
				break
			case types.ADD_ROOM:
				console.log(`ADD_ROOM`)
				dispatch(addRoom(data.roomName, data.members))
				break
			case types.USERNAME_SET:
				console.log(`USERNAME_SET`)
				dispatch(usernameSet())
				break
			case types.USERS_LIST:
				console.log(`USERS_LIST`)
				// console.log(`data.users`, data.users)
				dispatch(populateUsersList(data.users))
				dispatch(usersListReceived())
				break
			case types.ROOMS_LIST:
				console.log(`ROOMS_LIST`)
				// console.log(`data.rooms`, data.rooms)
				dispatch(populateRoomsList(data.rooms))
				dispatch(roomsListReceived())
				break
			case types.GAME_MEMBERS_UPDATE:
				console.log(`GAME_MEMBERS_UPDATE`)
				// console.log(`data.members`, data.members)
				dispatch(updateGameMembers(data.members))
				break
			case types.GAME_PIECE:
				console.log(`GAME_PIECE`)
				dispatch(updateGamePiece(data.piece))
				break
			default:
				break
		}
	})

	return socket
}

export default setupSocket
