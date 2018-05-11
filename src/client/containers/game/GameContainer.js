import { connect } from 'react-redux'
import GameComponent from '../../components/game/GameComponent'
import {
	setUsername,
	addUser,
	addRoom,
	addUserToRoom,
	removeUser,
	removeUserFromRoom
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
	addUserToRoom: (roomName, members) => {
		dispatch(addUserToRoom(roomName, members))
	}
})

export function mapStateToProps(state) {
	return {
		connection: state.connection.connected,
		roomsReceived: state.connection.rooms,
		usersReceived: state.connection.users,
		username: state.user.username,
		users: state.users,
		rooms: state.rooms
	}
}

export const GameContainer = connect(mapStateToProps, mapDispatchToProps)(
	GameComponent
)
