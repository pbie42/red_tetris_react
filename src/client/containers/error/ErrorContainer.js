import { connect } from 'react-redux'
import ErrorComponent from '../../components/error/ErrorComponent'

export function mapStateToProps(state) {
	return {
		error: state.errors.error,
		errorRoom: state.errors.errorRoom,
		errorName: state.errors.errorName,
		errorTooManyMembers: state.errors.errorTooManyMembers
	}
}

export const ErrorContainer = connect(mapStateToProps)(ErrorComponent)
