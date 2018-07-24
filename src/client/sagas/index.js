import { takeEvery } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes'

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

const handleGameLobbyNewMessage = function* handlegameLobbyNewMessage(params) {
	yield takeEvery(types.GAME_LOBBY_NEW_MESSAGE, action => {
		params.socket.emit('game', JSON.stringify(action))
	})
}

const handleGameNewPiece = function* handleGameNewPiece(params) {
	yield takeEvery(types.GAME_NEW_PIECE, action => {
		params.socket.emit('game', JSON.stringify(action))
	})
}

const handleGameNewPieces = function* handleGameNewPieces(params) {
	yield takeEvery(types.GAME_NEW_PIECES, action => {
		params.socket.emit('game', JSON.stringify(action))
	})
}

const handleGameStart = function* handleGameStart(params) {
	yield takeEvery(types.GAME_START, action => {
		params.socket.emit('game', JSON.stringify(action))
	})
}

const handleMessageAdd = function* handleMessageAdd(params) {
	yield takeEvery(types.MESSAGE_ADD, action => {
		params.socket.emit('message', JSON.stringify(action))
	})
}

const handleRoomAddition = function* handleRoomAddition(params) {
	yield takeEvery(types.ROOM_ADD_ROOM, action => {
		params.socket.emit('room', JSON.stringify(action))
	})
}

const handleRoomUserAddition = function* handleRoomUserAddition(params) {
	yield takeEvery(types.ROOM_ADD_USER, action => {
		params.socket.emit('room', JSON.stringify(action))
	})
}

const handleRoomUserRemoval = function* handleRoomUserRemoval(params) {
	yield takeEvery(types.ROOM_REMOVE_USER, action => {
		params.socket.emit('room', JSON.stringify(action))
	})
}

const handleUserAddition = function* handleUserAddition(params) {
	yield takeEvery(types.USER_ADD_USER, action => {
		params.socket.emit('user', JSON.stringify(action))
	})
}

const handleUserRemoval = function* handleUserRemoval(params) {
	yield takeEvery(types.USER_REMOVE_USER, action => {
		params.socket.emit('user', JSON.stringify(action))
	})
}

export {
	handleGameBoardUpdate,
	handleGameJoined,
	handleGameLobbyNewMessage,
	handleGameNewPiece,
	handleGameNewPieces,
	handleGameStart,
	handleMessageAdd,
	handleRoomAddition,
	handleRoomUserAddition,
	handleRoomUserRemoval,
	handleUserAddition,
	handleUserRemoval
}
