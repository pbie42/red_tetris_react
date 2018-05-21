import * as types from '../constants/ActionTypes'
let nextUserId = 0

export const userAdd = username => ({
	type: types.USER_ADD_USER,
	id: nextUserId++,
	username
})

export const userRemove = username => ({
	type: types.USER_REMOVE_USER,
	username
})

export const setUsername = username => ({
	type: types.USER_SET_USERNAME,
	username
})

export const setId = id => ({
	type: types.USER_SET_ID,
	id
})

export const unsetUsername = username => ({
	type: types.USER_UNSET_USERNAME,
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
	type: types.USER_USERNAME_SET,
	usernameSet: true
})
