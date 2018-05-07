import { connect } from 'react-redux'
import { ChatConversationComponent } from '../../../components/lobby/chat/ChatConversationComponent'

// export function mapStateToProps(state) {
// 	return {
// 		messages: state.messages
// 	}
// }

export const ChatConversationContainer = connect(state => ({
	messages: state.messages
}))(ChatConversationComponent)
