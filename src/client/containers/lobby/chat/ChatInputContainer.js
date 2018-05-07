import { connect } from 'react-redux'
import { ChatInputComponent } from '../../../components/lobby/chat/ChatInputComponent'
import { addMessage } from '../../../actions'

const mapDispatchToProps = dispatch => ({
	addMessage: (message, author) => {
		dispatch(addMessage(message, author))
	}
})

export const ChatInputContainer = connect(() => ({}), mapDispatchToProps)(
	ChatInputComponent
)
