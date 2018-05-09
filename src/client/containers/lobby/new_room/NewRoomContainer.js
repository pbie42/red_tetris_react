import { connect } from 'react-redux'
import { NewRoomComponent } from '../../../components/lobby/new_room/NewRoomComponent'
import { addRoom } from '../../../actions'

const mapDispatchToProps = dispatch => ({
	addRoom: (roomName, members) => {
		dispatch(addRoom(roomName, members))
	}
})

const mapStateToProps = state => {
	return {
		username: state.user.username,
		rooms: state.rooms
	}
}

export const NewRoomContainer = connect(mapStateToProps, mapDispatchToProps)(
	NewRoomComponent
)
