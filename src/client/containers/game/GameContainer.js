import { connect } from 'react-redux'
import GameComponent from '../../components/game/GameComponent'
import { setUsername, addUser, addRoom, addUserToRoom } from '../../actions'

export const mapDispatchToProps = dispatch => ({
	setUsername: username => {
		dispatch(setUsername(username))
	},
	addUser: username => {
		dispatch(addUser(username))
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
		connection: state.connection,
		username: state.user.username,
		users: state.users,
		rooms: state.rooms
	}
}

export const GameContainer = connect(mapStateToProps, mapDispatchToProps)(
	GameComponent
)
