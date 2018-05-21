import { connect } from 'react-redux'
import HomeFormComponent from '../../components/home/HomeFormComponent'
import { userSetUsername, userAdd } from '../../actions'

export const mapDispatchToProps = dispatch => ({
	userSetUsername: username => {
		dispatch(userSetUsername(username))
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
