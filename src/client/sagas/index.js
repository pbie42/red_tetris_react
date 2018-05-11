import { takeEvery } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes'

const handleNewMessage = function* handleNewMessage(params) {
	yield takeEvery(types.ADD_MESSAGE, action => {
		console.log(`action`, action)
		params.socket.emit('message', JSON.stringify(action))
	})
}

const handleNewUser = function* handleNewUser(params) {
	yield takeEvery(types.ADD_USER, action => {
		params.socket.emit('message', JSON.stringify(action))
	})
}

const handleRemoveUser = function* handleRemoveUser(params) {
	yield takeEvery(types.REMOVE_USER, action => {
		params.socket.emit('message', JSON.stringify(action))
	})
}

const handleNewRoom = function* handleNewRoom(params) {
	yield takeEvery(types.ADD_ROOM, action => {
		params.socket.emit('message', JSON.stringify(action))
	})
}

const handleAddUserToRoom = function* handleAddUserToRoom(params) {
	yield takeEvery(types.ADD_USER_TO_ROOM, action => {
		params.socket.emit('message', JSON.stringify(action))
	})
}

export {
	handleNewMessage,
	handleNewUser,
	handleNewRoom,
	handleAddUserToRoom,
	handleRemoveUser
}
