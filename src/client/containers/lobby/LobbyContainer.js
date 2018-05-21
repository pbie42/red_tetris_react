import { connect } from 'react-redux'
import LobbyComponent from '../../components/lobby/LobbyComponent'
import { userRemove } from '../../actions/index'

const mapDispatchToProps = dispatch => ({
	userRemove: username => {
		dispatch(userRemove(username))
	}
})

export const LobbyContainer = connect(
	state => ({
		username: state.user.username
	}),
	mapDispatchToProps
)(LobbyComponent)
