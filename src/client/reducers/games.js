import * as types from '../constants/ActionTypes'

const initialGameState = {
	roomName: '',
	piece: '',
	members: [],
	boards: [],
	id: '',
	countDown: false
}

const games = (state = initialGameState, action) => {
	console.log(`action`, action)
	switch (action.type) {
		case types.GAME_READY:
			return { ...state, countDown: true }
		case types.GAME_ROOM_SET:
			return { ...state, roomName: action.roomName }
		case types.GAME_ROOM_UNSET:
			return { ...state, roomName: '' }
		case types.GAME_PIECE:
			return { ...state, piece: action.piece }
		case types.GAME_MEMBERS_UPDATE:
			return { ...state, members: action.members }
		case types.GAME_BOARD_UPDATE:
			return state
		case types.GAME_ID_SET:
			console.log(`action`, action)
			return { ...state, id: action.id }

		default:
			return state
	}
}

export default games
