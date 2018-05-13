import * as types from '../constants/ActionTypes'

import { addMessage, messageReceived } from './chat'

import { connected, disconnected } from './connections'

import { errorUsernameTaken, errorTooManyMembers } from './errors'

import {
	gameReady,
	setGameRoom,
	unsetGameRoom,
	updateGameMembers
} from './games'

import {
	addUser,
	populateUsersList,
	removeUser,
	setUsername,
	unsetUsername,
	usersListReceived,
	usernameSet
} from './users'

import {
	addRoom,
	addUserToRoom,
	populateRoomsList,
	removeUserFromRoom,
	roomAdded,
	roomsListReceived
} from './rooms'

export {
	addMessage,
	addRoom,
	addUser,
	addUserToRoom,
	connected,
	disconnected,
	errorTooManyMembers,
	errorUsernameTaken,
	gameReady,
	messageReceived,
	populateRoomsList,
	populateUsersList,
	removeUser,
	removeUserFromRoom,
	roomAdded,
	roomsListReceived,
	setGameRoom,
	setUsername,
	updateGameMembers,
	unsetGameRoom,
	unsetUsername,
	usersListReceived,
	usernameSet
}
