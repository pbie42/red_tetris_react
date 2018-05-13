import * as types from '../constants/ActionTypes'

export const gameReady = (roomName, members, username) => ({
	type: types.GAME_READY,
	roomName,
	members,
	username
})

export const setGameRoom = roomName => ({
	type: types.GAME_ROOM_SET,
	roomName
})

export const updateGameMembers = members => ({
	type: types.GAME_MEMBERS_UPDATE,
	members
})

export const updateGamePiece = piece => ({
	type: types.GAME_PIECE,
	piece
})

export const unsetGameRoom = roomName => ({
	type: types.GAME_ROOM_UNSET,
	roomName
})
