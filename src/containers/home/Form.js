import { connect } from 'react-redux'
import FormComponent from '../../components/home/FormHome'
import { setNickname } from '../../actions'

const mapDispatchToProps = dispatch => ({
	dispatch: nickname => {
		dispatch(setNickname(nickname))
	}
})

export const Form = connect(() => ({}), mapDispatchToProps)(FormComponent)
