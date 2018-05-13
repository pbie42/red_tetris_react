import * as types from '../constants/ActionTypes'

const initialGameState = {
	roomName: '',
	members: [],
	boards: [],
	countDown: false
}

const games = (state = initialGameState, action) => {
	switch (action.type) {
		case types.GAME_READY:
			return { ...state, countDown: true }
		case types.GAME_ROOM_SET:
			return { ...state, roomName: action.roomName }
		case types.GAME_ROOM_UNSET:
			return { ...state, roomName: '' }
		case types.GAME_MEMBERS_UPDATE:
			return { ...state, members: action.members }

		default:
			return state
	}
}

export default games
