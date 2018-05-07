import { connect } from 'react-redux'
import { ChatConversationComponent } from '../../../components/lobby/chat/ChatConversationComponent'

export const ChatConversationContainer = connect(state => ({
	messages: state.messages,
	username: state.user.username
}))(ChatConversationComponent)
