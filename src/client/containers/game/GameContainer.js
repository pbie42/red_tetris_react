import { connect } from 'react-redux'
import GameComponent from '../../components/game/GameComponent'
import {
	errorTooManyMembers,
	errorUsernameTaken,
	gameJoined,
	gameRemoveBoards,
	gameRemoveId,
	gameRemoveMembers,
	gameRoomSet,
	gameRoomUnset,
	gameStart,
	roomAdd,
	roomAddUser,
	roomRemoveUser,
	userAdd,
	userSetUsername
} from '../../actions'

export const mapDispatchToProps = dispatch => ({
	userSetUsername: username => {
		dispatch(userSetUsername(username))
	},
	userAdd: username => {
		dispatch(userAdd(username))
	},
	roomRemoveUser: (username, roomName) => {
		dispatch(roomRemoveUser(username, roomName))
	},
	roomAdd: (roomName, members) => {
		dispatch(roomAdd(roomName, members))
	},
	roomAddUser: (username, roomName) => {
		dispatch(roomAddUser(username, roomName))
	},
	errorUsernameTaken: username => {
		dispatch(errorUsernameTaken(username))
	},
	errorTooManyMembers: username => {
		dispatch(errorTooManyMembers(username))
	},
	gameStart: (roomName, userId) => {
		dispatch(gameStart(roomName, userId))
	},
	gameRoomSet: roomName => {
		dispatch(gameRoomSet(roomName))
	},
	gameRoomUnset: roomName => {
		dispatch(gameRoomUnset(roomName))
	},
	gameJoined: roomName => {
		dispatch(gameJoined(roomName))
	},
	gameRemoveBoards: () => {
		dispatch(gameRemoveBoards())
	},
	gameRemoveId: () => {
		dispatch(gameRemoveId())
	},
	gameRemoveMembers: () => {
		dispatch(gameRemoveMembers())
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
		countDown: state.games.countDown,
		roomId: state.games.id,
		userId: state.user.id,
		boards: state.games.boards.filter(
			board => board.username !== state.user.username
		)
	}
}

export const GameContainer = connect(mapStateToProps, mapDispatchToProps)(
	GameComponent
)
