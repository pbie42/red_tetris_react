import * as types from '../constants/ActionTypes'
import {
	userAdd,
	addRoom,
	messageReceived,
	populateUsersList,
	populateRoomsList,
	connected,
	usersListReceived,
	roomsListReceived,
	gameSetId,
	userSetId,
	gameMembersUpdate,
	gameBoardsUpdate,
	gamePieceUpdate,
	gamePiecesUpdate,
	usernameSet,
	gameStartCountdown,
	gameStopCountdown
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
		// console.log(`data`, data)
		switch (data.type) {
			case types.MESSAGE_ADD:
				// console.log(`ADD_MESSAGE`)
				if (data.author !== store.getState().user.username)
					dispatch(messageReceived(data.message, data.author))
				break
			case types.USER_ADD_USER:
				console.log(`USER_ADD_USER`)
				dispatch(userAdd(data.username))
				break
			case types.ROOM_ADD_ROOM:
				// console.log(`ROOM_ADD_ROOM`)
				dispatch(addRoom(data.roomName, data.members))
				break
			case types.USER_USERNAME_SET:
				// console.log(`USER_USERNAME_SET`)
				dispatch(usernameSet())
				break
			case types.USERS_LIST:
				// console.log(`USERS_LIST`)
				// console.log(`data.users`, data.users)
				dispatch(populateUsersList(data.users))
				dispatch(usersListReceived())
				break
			case types.ROOMS_LIST:
				// console.log(`ROOMS_LIST`)
				// console.log(`data.rooms`, data.rooms)
				dispatch(populateRoomsList(data.rooms))
				dispatch(roomsListReceived())
				break
			case types.GAME_MEMBERS_UPDATE:
				// console.log(`GAME_MEMBERS_UPDATE`)
				// console.log(`data`, data)
				dispatch(gameMembersUpdate(data.members))
				break
			case types.GAME_PIECE_UPDATE:
				// console.log(`GAME_PIECE_UPDATE`)
				dispatch(gamePieceUpdate(data.piece))
				break
			case types.GAME_PIECES:
				// console.log(`GAME_PIECES`)
				dispatch(gamePiecesUpdate(data.pieces))
				break
			case types.GAME_ID_SET:
				// console.log(`GAME_ID_SET`)
				// console.log(`data`, data)
				dispatch(gameSetId(data.id))
				break
			case types.GAME_BOARDS_UPDATE:
				// console.log(`GAME_BOARDS_UPDATE`)
				// console.log(`data`, data)
				dispatch(gameBoardsUpdate(data.boards))
				break
			case types.USER_SET_ID:
				// console.log(`SET_ID`)
				// console.log(`data`, data)
				dispatch(userSetId(data.id))
				break
			case types.GAME_START_COUNTDOWN:
				// console.log(`GAME_START_COUNTDOWN`)
				// console.log(`data`, data)
				dispatch(gameStartCountdown())
				break
			case types.GAME_STOP_COUNTDOWN:
				// console.log(`GAME_STOP_COUNTDOWN`)
				// console.log(`data`, data)
				dispatch(gameStopCountdown())
				break
			default:
				break
		}
	})

	return socket
}

export default setupSocket
