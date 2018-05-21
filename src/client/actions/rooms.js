import * as types from '../constants/ActionTypes'

export const roomAdd = (roomName, members) => ({
	type: types.ROOM_ADD_ROOM,
	roomName,
	members
})

export const roomAddUser = (username, roomName) => ({
	type: types.ROOM_ADD_USER,
	roomName,
	username
})

export const roomAdded = (roomName, members) => ({
	type: types.ROOM_ADDED,
	roomName,
	members
})

export const roomRemoveUser = (username, roomName) => ({
	type: types.ROOM_REMOVE_USER,
	roomName,
	username
})

export const roomsListReceived = () => ({
	type: types.ROOMS_LIST_RECEIVED,
	rooms: true
})

export const roomsPopulateList = rooms => ({
	type: types.ROOMS_LIST,
	rooms
})
