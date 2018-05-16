import * as types from '../constants/ActionTypes'
let nextUserId = 0

export const addUser = username => ({
	type: types.ADD_USER,
	id: nextUserId++,
	username
})

export const removeUser = username => ({
	type: types.REMOVE_USER,
	username
})

export const setUsername = username => ({
	type: types.SET_USERNAME,
	username
})

export const unsetUsername = username => ({
	type: types.UNSET_USERNAME,
	username
})

export const populateUsersList = users => ({
	type: types.USERS_LIST,
	users
})

export const usersListReceived = () => ({
	type: types.USERS_LIST_RECEIVED,
	users: true
})

export const usernameSet = () => ({
	type: types.USERNAME_SET,
	usernameSet: true
})
