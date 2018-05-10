import * as types from '../constants/ActionTypes'

let nextMessageId = 0
let nextUserId = 0

export const addMessage = (message, author) => ({
	type: types.ADD_MESSAGE,
	id: nextMessageId++,
	message,
	author
})

export const addUser = name => ({
	type: types.ADD_USER,
	id: nextUserId++,
	name
})

export const addUserToRoom = (username, roomName) => ({
	type: types.ADD_USER_TO_ROOM,
	roomName,
	username
})

export const messageReceived = (message, author) => ({
	type: types.MESSAGE_RECEIVED,
	id: nextMessageId++,
	message,
	author
})

export const populateUsersList = users => ({
	type: types.USERS_LIST,
	users
})

export const populateRoomsList = rooms => ({
	type: types.ROOMS_LIST,
	rooms
})

export const setUsername = username => ({
	type: types.SET_USERNAME,
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

export const connected = () => ({
	type: types.CONNECTED,
	connected: true
})

export const disconnected = () => ({
	type: types.DISCONNECTED,
	connected: false
})
