import { combineReducers } from 'redux'
import connection from './connection'
import messages from './messages'
import rooms from './rooms'
import users from './users'
import user from './user'

const chat = combineReducers({
	connection,
	messages,
	rooms,
	users,
	user
})

export default chat
