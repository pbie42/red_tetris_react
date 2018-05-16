import * as types from '../constants/ActionTypes'
import { addUserToRoom, removeUserFromRoom } from '../utils'

const rooms = (state = [], action) => {
	let rooms
	switch (action.type) {
		case types.ADD_ROOM:
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
		case types.ADD_USER_TO_ROOM:
			rooms = state
			rooms = addUserToRoom(action.username, action.roomName, rooms)
			return rooms
		case types.REMOVE_USER_FROM_ROOM:
			rooms = state
			rooms = removeUserFromRoom(action.username, action.roomName, rooms)
			return rooms
		default:
			return state
	}
}

export default rooms
