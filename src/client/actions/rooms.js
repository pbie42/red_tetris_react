import * as types from '../constants/ActionTypes'

export const roomAddUser = (username, roomName) => ({
	type: types.ROOM_ADD_USER,
	roomName,
	username
})

export const roomRemoveUser = (username, roomName) => ({
	type: types.ROOM_REMOVE_USER,
	roomName,
	username
})

export const addRoom = (roomName, members) => ({
	type: types.ROOM_ADD_ROOM,
	roomName,
	members
})

export const roomAdded = (roomName, members) => ({
	type: types.ROOM_ADDED,
	roomName,
	members
})

export const populateRoomsList = rooms => ({
	type: types.ROOMS_LIST,
	rooms
})

export const roomsListReceived = () => ({
	type: types.ROOMS_LIST_RECEIVED,
	rooms: true
})
