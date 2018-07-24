import * as types from '../constants/ActionTypes'
import { roomAddUser, roomRemoveUser, roomLobbyMessageUpdate } from '../utils'

const rooms = (state = [], action = { type: null }) => {
	let rooms
	switch (action.type) {
		case types.ROOM_ADD_ROOM:
			return state.concat([
				{
					roomName: action.roomName,
					members: action.members
				}
			])

		case types.ROOM_ADD_USER:
			rooms = state
			rooms = roomAddUser(action.username, action.roomName, rooms)
			return rooms

		case types.ROOMS_LIST:
			return action.rooms


		case types.ROOM_LOBBY_MESSAGE_UPDATE:
			rooms = state
			console.log(`rooms before message update`, JSON.stringify(rooms))
			rooms = roomLobbyMessageUpdate(action.roomId, action.roomName, action.message, rooms)
			console.log(`rooms AFTER message update`, JSON.stringify(rooms))
			return rooms

		case types.ROOM_REMOVE_USER:
			rooms = state
			rooms = roomRemoveUser(action.username, action.roomName, rooms)
			return rooms

		default:
			return state
	}
}

export default rooms
