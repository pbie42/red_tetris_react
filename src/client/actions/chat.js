import * as types from '../constants/ActionTypes'

let nextMessageId = 0

export const messageReceived = (message, author) => ({
	type: types.MESSAGE_RECEIVED,
	id: nextMessageId++,
	message,
	author
})

export const addMessage = (message, author) => ({
	type: types.ADD_MESSAGE,
	id: nextMessageId++,
	message,
	author
})
