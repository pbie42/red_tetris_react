import { expect } from 'chai'
import user from '../../src/client/reducers/user'

describe('User Reducers', () => {
	it('sets username', () => {
		const state = { username: '' }
		const updatedState = user(state, {
			type: 'USER_SET_USERNAME',
			username: 'pbie'
		})
		expect(updatedState.username).to.equal('pbie')
	})
	it('makes usernameSet equal true', () => {
		const state = { usernameSet: false }
		const updatedState = user(state, {
			type: 'USER_USERNAME_SET',
			usernameSet: true
		})
		expect(updatedState).to.eql({ usernameSet: true })
	})
	it('returns state if not valid action type', () => {
		const state = { username: 'pbie' }
		const updatedState = user(state, {
			type: 'TEST_ACTION',
			username: 'jennzmee'
		})
		expect(updatedState.username).to.equal('pbie')
	})
	it('returns initial state if no state is given', () => {
		const initialState = {
			usernameSet: false,
			username: '',
			id: ''
		}
		const action = {
			type: 'TEST_ACTION',
			username: 'jennzmee'
		}
		const state = user(undefined, action)
		expect(state).to.eql(initialState)
	})
	it('returns state if no action is given', () => {
		const state = {}
		const updatedState = user(state, undefined)
		expect(updatedState).to.eql({})
	})
	it('unsets username', () => {
		const state = { username: 'pbie' }
		const updatedState = user(state, {
			type: 'USER_UNSET_USERNAME',
			username: 'pbie'
		})
		expect(updatedState.username).to.equal('')
	})
	it('sets user ID', () => {
		const state = { id: '' }
		const updatedState = user(state, {
			type: 'USER_SET_ID',
			id: '5sg15fg3'
		})
		expect(updatedState.id).to.equal('5sg15fg3')
	})
})
