import { connect } from 'react-redux'
import HomeFormComponent from '../../components/home/HomeForm'
import { setNickname } from '../../actions'

const mapDispatchToProps = dispatch => ({
	setNickname: nickname => {
		dispatch(setNickname(nickname))
	}
})

export const HomeFormContainer = connect(() => ({}), mapDispatchToProps)(
	HomeFormComponent
)
