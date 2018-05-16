import { connect } from 'react-redux'
import BoardComponent from '../../components/game/BoardComponent'
import { updateGameBoard } from '../../actions'

export const mapDispatchToProps = dispatch => ({
	updateGameBoard: (board, id, roomName, username) => {
		dispatch(updateGameBoard(board, id, roomName, username))
	}
})

export function mapStateToProps(state) {
	return {
		username: state.user.username,
		roomName: state.games.roomName,
		roomId: state.games.id
	}
}

export const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(
	BoardComponent
)
