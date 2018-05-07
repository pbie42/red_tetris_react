import { connect } from 'react-redux'
import { ChatComponent } from '../../../components/lobby/chat/ChatComponent'

export const ChatContainer = connect(state => ({
	username: state.user.username
}))(ChatComponent)
