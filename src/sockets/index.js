import * as types from '../constants/ActionTypes'
import { addUser, messageReceived, populateUsersList } from '../actions'

import openSocket from 'socket.io-client'

const setupSocket = (dispatch, username) => {
	const socket = openSocket('http://localhost:8000')

	socket.on('connect', () => {
		console.log(`connected`)
		socket.emit(
			'message',
			JSON.stringify({
				type: types.ADD_USER,
				name: username
			})
		)
	})

	socket.on('message', event => {
		console.log(`message`)
		console.log(`event`, event)
		const data = JSON.parse(event)
		console.log(`data`, data)
		switch (data.type) {
			case types.ADD_MESSAGE:
				console.log(`ADD_MESSAGE`)
				if (data.author !== username)
					dispatch(messageReceived(data.message, data.author))
				break
			case types.ADD_USER:
				console.log(`ADD_USER`)
				dispatch(addUser(data.name))
				break
			case types.USERS_LIST:
				console.log(`USERS_LIST`)
				console.log(`data.users`, data.users)
				dispatch(populateUsersList(data.users))
				break
			default:
				break
		}
	})

	return socket
}

export default setupSocket
