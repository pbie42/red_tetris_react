import { expect } from 'chai'
import users from '../../src/client/reducers/users'

let usersList = [
	{ username: 'John' },
	{ username: 'Paul' },
	{ username: 'George' },
	{ username: 'Ringo' }
]

describe('Users Reducers', () => {
	it('adds user to users state', () => {
		const updatedState = users([], {
			type: 'USER_ADD_USER',
			username: 'Todd',
			id: 0
		})
		expect(updatedState).to.eql([{ username: 'Todd', id: 0 }])
	})
	it('removes user from users state', () => {
		const updatedState = users(usersList, {
			type: 'USER_REMOVE_USER',
			username: 'Paul'
		})
		expect(updatedState).to.eql([
			{ username: 'John' },
			{ username: 'George' },
			{ username: 'Ringo' }
		])
	})
	it('updates users list', () => {
		const updatedState = users([], {
			type: 'USERS_LIST',
			users: usersList
		})
		expect(updatedState).to.eql(usersList)
	})
	it('returns initial state if no state is given', () => {
		const action = {
			type: 'TEST_ACTION',
			username: 'jennzmee'
		}
		const state = users(undefined, action)
		expect(state).to.eql([])
	})
	it('returns state if no action is given', () => {
		const updatedState = users([], undefined)
		expect(updatedState).to.eql([])
	})
})
