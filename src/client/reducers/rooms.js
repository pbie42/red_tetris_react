import * as types from '../constants/ActionTypes'

const rooms = (state = [], action) => {
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
		default:
			return state
	}
}

export default rooms
