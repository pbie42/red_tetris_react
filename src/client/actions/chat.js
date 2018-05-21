import * as types from '../constants/ActionTypes'

let nextMessageId = 0

export const messageReceived = (message, author) => ({
	type: types.MESSAGE_RECEIVED,
	id: nextMessageId++,
	message,
	author
})

export const messageAdd = (message, author) => ({
	type: types.MESSAGE_ADD,
	id: nextMessageId++,
	message,
	author
})
