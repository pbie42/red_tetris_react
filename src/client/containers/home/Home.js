import { connect } from 'react-redux'
import HomeComponent from '../../components/home/Home'
import { setUsername, addUser } from '../../actions'

export function mapStateToProps(state) {
	return {
		username: state.user.username
	}
}

export const HomeContainer = connect(mapStateToProps)(HomeComponent)
