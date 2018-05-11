import * as types from '../constants/ActionTypes'

const users = (state = [], action) => {
	switch (action.type) {
		case types.ADD_USER:
			return state.concat([
				{
					name: action.name,
					id: action.id
				}
			])
		case types.REMOVE_USER:
			return state.filter(user => user.name === action.username)
		case types.USERS_LIST:
			return action.users
		default:
			return state
	}
}

export default users
