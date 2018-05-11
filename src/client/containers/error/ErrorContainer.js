import { connect } from 'react-redux'
import ErrorComponent from '../../components/error/ErrorComponent'
// import {
// 	setUsername,
// 	addUser,
// 	addRoom,
// 	addUserToRoom,
// 	removeUser,
// 	removeUserFromRoom,
// 	usernameSet
// } from '../../actions'

// export const mapDispatchToProps = dispatch => ({
// 	setUsername: username => {
// 		dispatch(setUsername(username))
// 	},
// 	addUser: username => {
// 		dispatch(addUser(username))
// 	},
// 	removeUser: username => {
// 		dispatch(removeUser(username))
// 	},
// 	removeUserFromRoom: (username, roomName) => {
// 		dispatch(removeUserFromRoom(username, roomName))
// 	},
// 	addRoom: (roomName, members) => {
// 		dispatch(addRoom(roomName, members))
// 	},
// 	addUserToRoom: (roomName, members) => {
// 		dispatch(addUserToRoom(roomName, members))
// 	}
// })

export function mapStateToProps(state) {
	return {
		error: state.errors.error,
		errorRoom: state.errors.errorRoom,
		errorName: state.errors.errorName,
		errorTooManyMembers: state.errors.errorTooManyMembers
	}
}

export const ErrorContainer = connect(mapStateToProps)(ErrorComponent)
