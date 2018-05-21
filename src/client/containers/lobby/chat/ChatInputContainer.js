import { connect } from 'react-redux'
import { ChatInputComponent } from '../../../components/lobby/chat/ChatInputComponent'
import { messageAdd } from '../../../actions'

const mapDispatchToProps = dispatch => ({
	messageAdd: (message, author) => {
		dispatch(messageAdd(message, author))
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
