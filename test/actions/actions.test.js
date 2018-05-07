import { expect } from 'chai'
import { setUsername, addUser, addMessage } from '../../src/client/actions'

describe('Actions', () => {
	it('setUsername returns an object for the set username action', () => {
		const username = 'pbie'
		const setUsernameAction = setUsername(username)
		expect(setUsernameAction).to.eql({
			type: 'SET_USERNAME',
			username: 'pbie'
		})
	})

	it('addUser returns an object for the add user action', () => {
		const username = 'pbie'
		const addUserAction = addUser(username)
		expect(addUserAction).to.eql({
			type: 'ADD_USER',
			id: 0,
			name: 'pbie'
		})
	})

	it('addMessage returns an object for the add message action', () => {
		const username = 'pbie'
		const message = 'hello'
		const addUserAction = addMessage(message, username)
		expect(addUserAction).to.eql({
			type: 'ADD_MESSAGE',
			id: 0,
			author: 'pbie',
			message: 'hello'
		})
	})
})
