import { connect } from 'react-redux'
import BoardComponent from '../../components/game/BoardComponent'
// import {
// 	setUsername,
// 	addUser,
// 	addRoom,
// 	addUserToRoom,
// 	gameReady,
// 	removeUser,
// 	removeUserFromRoom,
// 	setGameRoom,
// 	unsetGameRoom,
// 	usernameSet,
// 	errorUsernameTaken,
// 	errorTooManyMembers
// } from '../../actions'

export const mapDispatchToProps = dispatch => ({})

export function mapStateToProps(state) {
	return {
		username: state.user.username,
		roomName: state.games.roomName
	}
}

export const BoardContainer = connect(mapStateToProps)(BoardComponent)
