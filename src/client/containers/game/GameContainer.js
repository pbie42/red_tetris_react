import { connect } from 'react-redux'
import GameComponent from '../../components/game/GameComponent'
import {
	setUsername,
	addUser,
	addRoom,
	addUserToRoom,
	gameReady,
	removeUser,
	removeUserFromRoom,
	setGameRoom,
	unsetGameRoom,
	errorUsernameTaken,
	errorTooManyMembers
} from '../../actions'

export const mapDispatchToProps = dispatch => ({
	setUsername: username => {
		dispatch(setUsername(username))
	},
	addUser: username => {
		dispatch(addUser(username))
	},
	removeUser: username => {
		dispatch(removeUser(username))
	},
	removeUserFromRoom: (username, roomName) => {
		dispatch(removeUserFromRoom(username, roomName))
	},
	addRoom: (roomName, members) => {
		dispatch(addRoom(roomName, members))
	},
	addUserToRoom: (username, roomName) => {
		dispatch(addUserToRoom(username, roomName))
	},
	errorUsernameTaken: username => {
		dispatch(errorUsernameTaken(username))
	},
	errorTooManyMembers: username => {
		dispatch(errorTooManyMembers(username))
	},
	gameReady: (roomName, members, username) => {
		dispatch(gameReady(roomName, members, username))
	},
	setGameRoom: roomName => {
		dispatch(setGameRoom(roomName))
	},
	unsetGameRoom: roomName => {
		dispatch(unsetGameRoom(roomName))
	}
})

export function mapStateToProps(state) {
	return {
		connection: state.connection.connected,
		roomsReceived: state.connection.rooms,
		usersReceived: state.connection.users,
		username: state.user.username,
		usernameIsSet: state.user.usernameSet,
		users: state.users,
		rooms: state.rooms,
		members: state.games.members,
		roomName: state.games.roomName,
		boards: state.games.boards.filter(
			board => board.username !== state.user.username
		)
	}
}

export const GameContainer = connect(mapStateToProps, mapDispatchToProps)(
	GameComponent
)
