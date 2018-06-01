import { expect } from 'chai'
import errors from '../../src/client/reducers/errors'

describe('Error Reducers', () => {
	const initialErrorState = {
		error: false,
		errorName: false,
		errorRoom: false,
		errorTooManyMembers: false
	}
	it('sets errorRoom to true', () => {
		const updatedState = errors(initialErrorState, {
			type: 'ERROR_ROOMNAME_TAKEN',
			errorRoom: true
		})
		expect(updatedState.errorRoom).to.be.true
	})
	it('sets errorTooManyMembers to true', () => {
		const updatedState = errors(initialErrorState, {
			type: 'ERROR_TOO_MANY_MEMBERS',
			errorTooManyMembers: true
		})
		expect(updatedState.errorTooManyMembers).to.be.true
	})
	it('returns state if not valid action type', () => {
		const updatedState = errors(initialErrorState, {
			type: 'TEST_ACTION',
			username: 'jennzmee'
		})
		expect(updatedState).to.eql(initialErrorState)
	})
	it('returns initial state if no state is given', () => {
		const action = {
			type: 'TEST_ACTION',
			username: 'jennzmee'
		}
		const state = errors(undefined, action)
		expect(state).to.eql(initialErrorState)
	})
	it('returns state if no action is given', () => {
		const updatedState = errors(initialErrorState, undefined)
		expect(updatedState).to.eql(initialErrorState)
	})
	it('sets errorName to true', () => {
		const updatedState = errors(initialErrorState, {
			type: 'ERROR_USERNAME_TAKEN',
			errorName: true
		})
		expect(updatedState.errorName).to.be.true
	})
})
