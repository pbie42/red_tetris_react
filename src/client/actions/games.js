import * as types from '../constants/ActionTypes'

export const gameStart = (roomName, userId) => ({
	type: types.GAME_START,
	roomName,
	userId
})

export const gameRoomSet = roomName => ({
	type: types.GAME_ROOM_SET,
	roomName
})

export const gameMembersUpdate = members => ({
	type: types.GAME_MEMBERS_UPDATE,
	members
})

export const updateGamePiece = piece => ({
	type: types.GAME_PIECE_UPDATE,
	piece
})

export const updateGamePieces = pieces => ({
	type: types.GAME_PIECES_UPDATE,
	pieces
})

export const gameRoomUnset = roomName => ({
	type: types.GAME_ROOM_UNSET,
	roomName
})

export const setGameId = id => ({
	type: types.GAME_ID_SET,
	id
})

export const updateGameBoard = (board, id, roomName, username) => ({
	type: types.GAME_BOARD_UPDATE,
	board,
	id,
	roomName,
	username
})

export const gameJoined = roomName => ({
	type: types.GAME_JOINED,
	roomName
})

export const updateGameBoards = boards => ({
	type: types.GAME_BOARDS_UPDATE,
	boards
})

export const newPieces = (id, roomName) => ({
	type: types.GAME_NEW_PIECES,
	id,
	roomName
})

export const requestNextPiece = (id, roomName, username) => ({
	type: types.GAME_NEW_PIECE,
	id,
	roomName,
	username
})

export const gameStartCountdown = () => ({
	type: types.GAME_START_COUNTDOWN
})

export const gameStopCountdown = () => ({
	type: types.GAME_STOP_COUNTDOWN
})

export const removeBoards = () => ({
	type: types.GAME_REMOVE_BOARDS
})

export const removeId = () => ({
	type: types.GAME_REMOVE_ID
})

export const removeCountdown = () => ({
	type: types.GAME_REMOVE_COUNTDOWN
})
