import { connect } from 'react-redux'
import HomeComponent from '../../components/home/HomeComponent'

export function mapStateToProps(state) {
	return {
		username: state.user.username,
		connection: state.connection
	}
}

export const HomeContainer = connect(mapStateToProps)(HomeComponent)
