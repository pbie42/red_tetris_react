import { connect } from 'react-redux'
import { RoomsComponent } from '../../../components/lobby/rooms/RoomsComponent'
import { addUserToRoom } from '../../../actions'

const mapDispatchToProps = dispatch => ({
	addUserToRoom: (username, roomName) => {
		dispatch(addUserToRoom(username, roomName))
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
