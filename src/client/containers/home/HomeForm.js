import { connect } from 'react-redux'
import HomeFormComponent from '../../components/home/HomeForm'
import { setUsername, addUser } from '../../actions'

export const mapDispatchToProps = dispatch => ({
	setUsername: username => {
		dispatch(setUsername(username))
	},
	addUser: username => {
		dispatch(addUser(username))
	}
})

export function mapStateToProps(state) {
	return {
		username: state.user.username,
		users: state.users
	}
}

export const HomeFormContainer = connect(mapStateToProps, mapDispatchToProps)(
	HomeFormComponent
)
