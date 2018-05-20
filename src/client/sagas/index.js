import { takeEvery } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes'

const handleNewMessage = function* handleNewMessage(params) {
	yield takeEvery(types.MESSAGE_ADD, action => {
		params.socket.emit('message', JSON.stringify(action))
	})
}

const handleNewUser = function* handleNewUser(params) {
	yield takeEvery(types.USER_ADD_USER, action => {
		params.socket.emit('message', JSON.stringify(action))
	})
}

const handleRemoveUser = function* handleRemoveUser(params) {
	yield takeEvery(types.USER_REMOVE_USER, action => {
		params.socket.emit('message', JSON.stringify(action))
	})
}

const handleRemoveUserFromRoom = function* handleRemoveUserFromRoom(params) {
	yield takeEvery(types.ROOM_REMOVE_USER, action => {
		params.socket.emit('room', JSON.stringify(action))
	})
}

const handleNewRoom = function* handleNewRoom(params) {
	yield takeEvery(types.ROOM_ADD_ROOM, action => {
		params.socket.emit('room', JSON.stringify(action))
	})
}

const handleAddUserToRoom = function* handleAddUserToRoom(params) {
	yield takeEvery(types.ROOM_ADD_USER, action => {
		params.socket.emit('room', JSON.stringify(action))
	})
}

const handleGameBoardUpdate = function* handleGameBoardUpdate(params) {
	yield takeEvery(types.GAME_BOARD_UPDATE, action => {
		params.socket.emit('game', JSON.stringify(action))
	})
}

const handleGameJoined = function* handleGameJoined(params) {
	yield takeEvery(types.GAME_JOINED, action => {
		params.socket.emit('game', JSON.stringify(action))
	})
}

const handleNewPieces = function* handleNewPieces(params) {
	yield takeEvery(types.GAME_NEW_PIECES, action => {
		params.socket.emit('game', JSON.stringify(action))
	})
}

const handleNewPieceRequest = function* handleNewPieceRequest(params) {
	yield takeEvery(types.GAME_NEW_PIECE, action => {
		params.socket.emit('game', JSON.stringify(action))
	})
}

const handleStartGame = function* handleStartGame(params) {
	yield takeEvery(types.GAME_START, action => {
		params.socket.emit('game', JSON.stringify(action))
	})
}

export {
	handleAddUserToRoom,
	handleGameJoined,
	handleGameBoardUpdate,
	handleNewMessage,
	handleNewPieces,
	handleNewPieceRequest,
	handleNewRoom,
	handleNewUser,
	handleRemoveUser,
	handleRemoveUserFromRoom,
	handleStartGame
}
