import { combineReducers } from 'redux'
import messages from './messages'
import rooms from './rooms'
import users from './users'
import user from './user'

const chat = combineReducers({
	messages,
	rooms,
	users,
	user
})

export default chat
