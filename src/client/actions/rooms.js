import * as types from '../constants/ActionTypes'

export const addUserToRoom = (username, roomName) => ({
	type: types.ADD_USER_TO_ROOM,
	roomName,
	username
})

export const removeUserFromRoom = (username, roomName) => ({
	type: types.REMOVE_USER_FROM_ROOM,
	roomName,
	username
})

export const addRoom = (roomName, members) => ({
	type: types.ADD_ROOM,
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
