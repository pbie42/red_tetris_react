import * as types from '../constants/ActionTypes'
import { addUserToRoom, removeUserFromRoom } from '../utils'

const rooms = (state = [], action) => {
	let rooms
	switch (action.type) {
		case types.ROOM_ADD_ROOM:
		case types.ROOM_ADDED:
			return state.concat([
				{
					roomName: action.roomName,
					members: action.members
					// id: action.id
				}
			])
		case types.ROOMS_LIST:
			return action.rooms
		case types.ROOM_ADD_USER:
			rooms = state
			rooms = addUserToRoom(action.username, action.roomName, rooms)
			return rooms
		case types.ROOM_REMOVE_USER:
			rooms = state
			rooms = removeUserFromRoom(action.username, action.roomName, rooms)
			return rooms
		default:
			return state
	}
}

export default rooms
