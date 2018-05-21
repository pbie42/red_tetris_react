import { connect } from 'react-redux'
import HomeFormComponent from '../../components/home/HomeForm'
import { setUsername, userAdd } from '../../actions'

export const mapDispatchToProps = dispatch => ({
	setUsername: username => {
		dispatch(setUsername(username))
	},
	userAdd: username => {
		dispatch(userAdd(username))
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
