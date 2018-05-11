import { connect } from 'react-redux'
import HomeComponent from '../../components/home/Home'

export function mapStateToProps(state) {
	return {
		username: state.user.username,
		connection: state.connection
	}
}

export const HomeContainer = connect(mapStateToProps)(HomeComponent)
