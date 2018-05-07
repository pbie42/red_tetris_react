import { connect } from 'react-redux'
import { ChatInputComponent } from '../../../components/lobby/chat/ChatInputComponent'
import { addMessage } from '../../../actions'

const mapDispatchToProps = dispatch => ({
	addMessage: (message, author) => {
		dispatch(addMessage(message, author))
	}
})

const mapStateToProps = state => {
	return {
		username: state.user.username
	}
}

export const ChatInputContainer = connect(mapStateToProps, mapDispatchToProps)(
	ChatInputComponent
)
