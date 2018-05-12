import { expect } from 'chai'
import {
	setUsername,
	addUser,
	removeUser,
	addMessage,
	unsetUsername,
	populateUsersList,
	usersListReceived,
	usernameSet,
	connected,
	disconnected
} from '../../src/client/actions'

describe('Actions', () => {
	const username = 'pbie'
	const users = ['paul', 'jen']

	describe('Chat', () => {
		it('addMessage returns an object for the add message action', () => {
			const message = 'hello'
			const addMessageAction = addMessage(message, username)
			expect(addMessageAction).to.eql({
				type: 'ADD_MESSAGE',
				id: 0,
				author: 'pbie',
				message: 'hello'
			})
		})
	})

	describe('Connections', () => {
		it('connected returns an object for the update connection action', () => {
			const addUserAction = addUser(username)
			expect(addUserAction).to.eql({
				type: 'ADD_USER',
				id: 0,
				name: 'pbie'
			})
		})
	})

	describe('User', () => {
		it('addUser returns an object for the add user action', () => {
			const addUserAction = addUser(username)
			expect(addUserAction).to.eql({
				type: 'ADD_USER',
				id: 0,
				name: 'pbie'
			})
		})

		it('populateUsersList returns an object for updating users list action', () => {
			const populateUsersListAction = populateUsersList(users)
			expect(populateUsersListAction).to.eql({
				type: 'USERS_LIST',
				users: ['paul', 'jen']
			})
		})

		it('removeUser returns object to remove a user', () => {
			const removeUserAction = removeUser(username)
			expect(removeUserAction).to.eql({
				type: 'REMOVE_USER',
				username: 'pbie'
			})
		})

		it('setUsername returns an object for the set username action', () => {
			const setUsernameAction = setUsername(username)
			expect(setUsernameAction).to.eql({
				type: 'SET_USERNAME',
				username: 'pbie'
			})
		})

		it('unsetUsername returns an object for the unsetting username action', () => {
			const unsetUsernameAction = unsetUsername(username)
			expect(unsetUsernameAction).to.eql({
				type: 'UNSET_USERNAME',
				username: 'pbie'
			})
		})

		it('usernameSet returns an object for the updating username set connection action', () => {
			const usernameSetAction = usernameSet()
			expect(usernameSeAction).to.eql({
				type: 'USERNAME_SET',
				usernameSet: true
			})
		})

		it('usersListReceived returns an object for the updating users list connection action', () => {
			const usersListAction = usersListReceived()
			expect(usersListAction).to.eql({
				type: 'USERS_LIST_RECEIVED',
				users: true
			})
		})
	})
})
