import { combineReducers } from 'redux'
import messages from './messages'
import users from './users'
import user from './user'

const chat = combineReducers({
	messages,
	users,
	user
})

export default chat
