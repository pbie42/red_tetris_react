import { connect } from 'react-redux'
import { RoomsComponent } from '../../../components/lobby/rooms/RoomsComponent'
import { addRoom } from '../../../actions'

// const mapDispatchToProps = dispatch => ({
// 	addRoom: (roomName, members) => {
// 		dispatch(addRoom(roomName, members))
// 	}
// })

const mapStateToProps = state => {
	return {
		username: state.user.username,
		rooms: state.rooms
	}
}

export const RoomsContainer = connect(mapStateToProps)(RoomsComponent)
