import * as types from '../constants/ActionTypes'

export const gameReady = (roomName, members) => ({
	type: types.GAME_READY,
	roomName,
	members
})

export const setGameRoom = roomName => ({
	type: types.GAME_ROOM_SET,
	roomName
})

export const updateGameMembers = members => ({
	type: types.GAME_MEMBERS_UPDATE,
	members
})

export const unsetGameRoom = roomName => ({
	type: types.GAME_ROOM_UNSET,
	roomName
})
