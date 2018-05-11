import { connect } from 'react-redux'
import LobbyComponent from '../../components/lobby/Lobby'
import { removeUser } from '../../actions/index'

const mapDispatchToProps = dispatch => ({
	removeUser: username => {
		dispatch(removeUser(username))
	}
})

export const LobbyContainer = connect(
	state => ({
		username: state.user.username
	}),
	mapDispatchToProps
)(LobbyComponent)
