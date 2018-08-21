import { connect } from 'react-redux'
import BoardComponent from '../../components/game/BoardComponent'
import {
	gameAddLines,
	gameBoardUpdate,
	gameNewPieces,
	gameNewPiece,
	gameSetBoard
} from '../../actions'

export const mapDispatchToProps = dispatch => ({
	gameAddLines: (roomName, username, lines) => {
		dispatch(gameAddLines(roomName, username, lines))
	},
	gameBoardUpdate: (board, id, roomName, username) => {
		dispatch(gameBoardUpdate(board, id, roomName, username))
	},
	gameNewPieces: (id, roomName) => {
		dispatch(gameNewPieces(id, roomName))
	},
	gameNewPiece: (id, roomName, username) => {
		dispatch(gameNewPiece(id, roomName, username))
	},
	gameSetBoard: board => {
		dispatch(gameSetBoard(board))
	}
})

export function mapStateToProps(state) {
	return {
		username: state.user.username,
		roomName: state.games.roomName,
		roomId: state.games.id,
		userId: state.user.id,
		piece: state.games.piece,
		countDown: state.games.countDown,
		board: state.games.board
	}
}

export const BoardContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(BoardComponent)
