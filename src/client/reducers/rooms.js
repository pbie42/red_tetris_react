import * as types from '../constants/ActionTypes'

// const testRooms = [
// 	{ roomName: 'test1', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test2', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test3', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test4', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test5', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test6', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test7', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test8', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test9', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test1', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test2', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test3', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test4', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test5', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test6', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test7', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test8', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test9', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test1', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test2', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test3', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test4', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test5', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test6', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test7', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test8', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test9', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test1', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test2', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ roomName: 'test3', members: ['john', 'paul', 'george', 'ringo'] }
// ]

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
		case types.ADD_USER_TO_ROOM:
			const rooms = state
			const index = rooms.findIndex(room => room.roomName === action.roomName)
			if (
				index >= 0 &&
				!rooms[index].members.find(member => member === action.username)
			) {
				rooms[index].members.push(action.username)
				return rooms
			}
			return state
		default:
			return state
	}
}

export default rooms
