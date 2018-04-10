import { connect } from 'react-redux'
import HomeComponent from '../components/Home'
import { setNickname } from '../actions'

const mapDispatchToProps = dispatch => ({
	dispatch: nickname => {
		dispatch(setNickname(nickname))
	}
})

export const Home = connect(() => ({}), mapDispatchToProps)(HomeComponent)
