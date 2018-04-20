import { expect } from 'chai'
import user from '../../src/client/reducers/user'

describe('User Reducers', () => {
	it('sets username', () => {
		const state = { username: '' }
		const updatedState = user(state, { type: 'SET_USERNAME', username: 'pbie' })
		expect(updatedState.username).to.equal('pbie')
	})
	it('returns state if not valid action type', () => {
		const state = { username: 'pbie' }
		const updatedState = user(state, {
			type: 'TEST_ACTION',
			username: 'jennzmee'
		})
		expect(updatedState.username).to.equal('pbie')
	})
	it('returns empty state if no state is given', () => {
		const action = {
			type: 'TEST_ACTION',
			username: 'jennzmee'
		}
		const state = user(undefined, action)
		expect(state).to.eql({})
	})
	it('returns state if no action is given', () => {
		const state = {}
		const updatedState = user(state, undefined)
		expect(updatedState).to.eql({})
	})
})
