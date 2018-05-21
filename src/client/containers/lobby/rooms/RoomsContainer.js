import { connect } from 'react-redux'
import { RoomsComponent } from '../../../components/lobby/rooms/RoomsComponent'
import { roomAddUser, gameJoined } from '../../../actions'

const mapDispatchToProps = dispatch => ({
	roomAddUser: (username, roomName) => {
		dispatch(roomAddUser(username, roomName))
	},
	gameJoined: roomName => {
		dispatch(gameJoined(roomName))
	}
})

const mapStateToProps = state => {
	return {
		username: state.user.username,
		rooms: state.rooms
	}
}

export const RoomsContainer = connect(mapStateToProps, mapDispatchToProps)(
	RoomsComponent
)
