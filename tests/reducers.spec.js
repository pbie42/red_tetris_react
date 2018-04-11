import { expect } from 'chai'
import user from '../src/reducers/user'

describe('user reducers', () => {
	it('sets nickname', () => {
		const state = { nickname: '' }
		const updatedState = user(state, { type: 'SET_NICKNAME', nickname: 'pbie' })
		expect(updatedState.nickname).to.equal('pbie')
	})
	it('returns state if not valid action type', () => {
		const state = { nickname: 'pbie' }
		const updatedState = user(state, {
			type: 'TEST_ACTION',
			nickname: 'jennzmee'
		})
		expect(updatedState.nickname).to.equal('pbie')
	})
	it('returns empty state if no state is given', () => {
		const action = {
			type: 'TEST_ACTION',
			nickname: 'jennzmee'
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
