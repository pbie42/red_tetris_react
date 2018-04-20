import { connect } from 'react-redux'
import HomeFormComponent from '../../components/home/HomeForm'
import { setNickname } from '../../actions'

export const mapDispatchToProps = dispatch => ({
	setNickname: nickname => {
		dispatch(setNickname(nickname))
	}
})

export const HomeFormContainer = connect(() => ({}), mapDispatchToProps)(
	HomeFormComponent
)
