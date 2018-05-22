import * as types from '../constants/ActionTypes'

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

export const gameJoined = roomName => ({
	type: types.GAME_JOINED,
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

export const gameRemoveBoards = () => ({
	type: types.GAME_REMOVE_BOARDS
})

export const gameRemoveId = () => ({
	type: types.GAME_REMOVE_ID
})

export const gameRemoveMembers = () => ({
	type: types.GAME_REMOVE_MEMBERS
})

export const gameRoomSet = roomName => ({
	type: types.GAME_ROOM_SET,
	roomName
})

export const gameRoomUnset = roomName => ({
	type: types.GAME_ROOM_UNSET,
	roomName
})

export const gameSetId = id => ({ type: types.GAME_ID_SET, id })

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
