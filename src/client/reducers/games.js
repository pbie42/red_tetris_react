import * as types from '../constants/ActionTypes'

const initialGameState = {
	roomName: '',
	piece: '',
	pieces: [],
	members: [],
	boards: [],
	id: '',
	countDown: false
}

const games = (state = initialGameState, action = { type: null }) => {
	switch (action.type) {
		case types.GAME_BOARDS_UPDATE:
			return { ...state, boards: action.boards }

		case types.GAME_BOARD_UPDATE:
			return state

		case types.GAME_CLEAR:
			return {
				...state,
				boards: [],
				id: '',
				members: [],
				roomName: '',
				piece: ''
			}

		case types.GAME_ID_SET:
			return { ...state, id: action.id }

		case types.GAME_JOINED:
			return state

		case types.GAME_MEMBERS_UPDATE:
			return { ...state, members: action.members }

		case types.GAME_NEW_PIECE:
			return state

		case types.GAME_NEW_PIECES:
			return state

		case types.GAME_PIECES_UPDATE:
			return { ...state, pieces: action.pieces }

		case types.GAME_PIECE_UPDATE:
			return { ...state, piece: action.piece }

		case types.GAME_ROOM_SET:
			return { ...state, roomName: action.roomName }

		case types.GAME_START:
			return state

		case types.GAME_START_COUNTDOWN:
			return { ...state, countDown: true }

		case types.GAME_STOP_COUNTDOWN:
			return { ...state, countDown: false }

		default:
			return state
	}
}

export default games
