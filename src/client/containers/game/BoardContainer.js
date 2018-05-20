import { connect } from 'react-redux'
import BoardComponent from '../../components/game/BoardComponent'
import { updateGameBoard, gameNewPieces, requestNextPiece } from '../../actions'

export const mapDispatchToProps = dispatch => ({
	updateGameBoard: (board, id, roomName, username) => {
		dispatch(updateGameBoard(board, id, roomName, username))
	},
	gameNewPieces: (id, roomName) => {
		dispatch(gameNewPieces(id, roomName))
	},
	requestNextPiece: (id, roomName, username) => {
		dispatch(requestNextPiece(id, roomName, username))
	}
})

export function mapStateToProps(state) {
	return {
		username: state.user.username,
		roomName: state.games.roomName,
		roomId: state.games.id,
		userId: state.user.id,
		piece: state.games.piece,
		countDown: state.games.countDown
	}
}

export const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(
	BoardComponent
)
