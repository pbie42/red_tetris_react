import { connect } from 'react-redux'
import LobbyComponent from '../../components/lobby/Lobby'

export const LobbyContainer = connect(state => ({
	username: state.user.username
}))(LobbyComponent)
