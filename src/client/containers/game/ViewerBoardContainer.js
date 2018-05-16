import { connect } from 'react-redux'
import ViewerBoardComponent from '../../components/game/ViewerBoardComponent'

export function mapStateToProps(state) {
	return {
		boards: state.games.boards
	}
}

export const ViewerBoardContainer = connect(mapStateToProps)(
	ViewerBoardComponent
)
