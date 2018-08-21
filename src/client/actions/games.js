import * as types from '../constants/ActionTypes'

export const gameAddLines = (roomName, username, lines) => ({
	type: types.GAME_ADD_LINES,
	roomName,
	username,
	lines
})

export const gameBoardUpdate = (board, id, roomName, username) => ({
	type: types.GAME_BOARD_UPDATE,
	board,
	id,
	roomName,
	username
})

export const gameBoardsUpdate = boards => ({
	type: types.GAME_BOARDS_UPDATE,
	boards
})

export const gameClear = () => ({
	type: types.GAME_CLEAR
})

export const gameJoined = roomName => ({
	type: types.GAME_JOINED,
	roomName
})

export const gameLobbyNewMessage = (message, roomName) => ({
	type: types.GAME_LOBBY_NEW_MESSAGE,
	message,
	roomName
})

export const gameMembersUpdate = members => ({
	type: types.GAME_MEMBERS_UPDATE,
	members
})

export const gameNewPiece = (id, roomName, username) => ({
	type: types.GAME_NEW_PIECE,
	id,
	roomName,
	username
})

export const gameNewPieces = (id, roomName) => ({
	type: types.GAME_NEW_PIECES,
	id,
	roomName
})

export const gamePieceUpdate = piece => ({
	type: types.GAME_PIECE_UPDATE,
	piece
})

export const gamePiecesUpdate = pieces => ({
	type: types.GAME_PIECES_UPDATE,
	pieces
})

export const gameRoomSet = roomName => ({
	type: types.GAME_ROOM_SET,
	roomName
})

export const gameIdSet = id => ({
	type: types.GAME_ID_SET,
	id
})

export const gameSetBoard = board => ({
	type: types.GAME_SET_BOARD,
	board
})

export const gameStart = (roomName, userId) => ({
	type: types.GAME_START,
	roomName,
	userId
})

export const gameStartCountdown = () => ({
	type: types.GAME_START_COUNTDOWN
})

export const gameStopCountdown = () => ({
	type: types.GAME_STOP_COUNTDOWN
})
