import { connect } from 'react-redux'
import HomeFormComponent from '../../components/home/HomeForm'
import { setNickname, addUser } from '../../actions'

export const mapDispatchToProps = dispatch => ({
	setNickname: nickname => {
		dispatch(setNickname(nickname))
	},
	addUser: nickname => {
		dispatch(addUser(nickname))
	}
})

export function mapStateToProps(state) {
	return {
		nickname: state.user.nickname,
		users: state.users
	}
}

export const HomeFormContainer = connect(mapStateToProps, mapDispatchToProps)(
	HomeFormComponent
)
