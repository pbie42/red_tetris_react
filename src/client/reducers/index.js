import { combineReducers } from 'redux'
import connection from './connection'
import messages from './messages'
import errors from './errors'
import rooms from './rooms'
import users from './users'
import user from './user'

const chat = combineReducers({
	connection,
	messages,
	errors,
	rooms,
	users,
	user
})

export default chat
