import * as types from '../constants/ActionTypes'
import { roomAddUser, roomRemoveUser } from '../utils'

const rooms = (state = [], action) => {
	let rooms
	switch (action.type) {
		case types.ROOM_ADDED:
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

		case types.ROOM_REMOVE_USER:
			rooms = state
			rooms = roomRemoveUser(action.username, action.roomName, rooms)
			return rooms

		default:
			return state
	}
}

export default rooms
