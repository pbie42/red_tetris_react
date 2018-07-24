import { connect } from 'react-redux'
import GameComponent from '../../components/game/GameComponent'
import {
	errorTooManyMembers,
	errorUsernameTaken,
	gameClear,
	gameJoined,
	gameLobbyNewMessage,
	gameRoomSet,
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
	roomRemoveUser: (username, userId, roomName) => {
		dispatch(roomRemoveUser(username, userId, roomName))
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
	gameClear: () => {
		dispatch(gameClear())
	},
	gameStart: (roomName, userId) => {
		dispatch(gameStart(roomName, userId))
	},
	gameRoomSet: roomName => {
		dispatch(gameRoomSet(roomName))
	},
	gameJoined: roomName => {
		dispatch(gameJoined(roomName))
	},
	gameLobbyNewMessage: (message, roomName) => {
		dispatch(gameLobbyNewMessage(message, roomName))
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
