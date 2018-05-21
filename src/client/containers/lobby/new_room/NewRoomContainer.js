import { connect } from 'react-redux'
import { NewRoomComponent } from '../../../components/lobby/new_room/NewRoomComponent'
import { roomAdd } from '../../../actions'

const mapDispatchToProps = dispatch => ({
	roomAdd: (roomName, members) => {
		dispatch(roomAdd(roomName, members))
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
