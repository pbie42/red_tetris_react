import * as types from '../constants/ActionTypes'

const messages = (state = [], action = { type: null }) => {
	switch (action.type) {
		case types.MESSAGE_ADD:
		case types.MESSAGE_RECEIVED:
			return state.concat([
				{
					message: action.message,
					author: action.author,
					id: action.id
				}
			])

		default:
			return state
	}
}

export default messages
