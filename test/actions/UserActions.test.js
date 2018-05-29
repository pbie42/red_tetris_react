import { expect } from 'chai'
import {
	userAdd,
	userRemove,
	userSetId,
	userSetUsername,
	userUnsetUsername,
	userUsernameSet,
	usersListReceived,
	usersPopulateList
} from '../../src/client/actions'

describe('User Actions', () => {
	const username = 'pbie'
	const roomName = 'Danger Room'
	const users = ['paul', 'jen']
	const members = ['nick', 'josie']
	const rooms = [
		{ roomName: 'test1', members: ['john', 'paul', 'george', 'ringo'] }
	]

	it('userAdd returns an object for the add user action', () => {
		const addUserAction = userAdd(username)
		expect(addUserAction).to.eql({
			type: 'USER_ADD_USER',
			id: 0,
			username: 'pbie'
		})
	})

	it('userSetId returns an object to set the user id', () => {
		const addUserAction = userSetId(0)
		expect(addUserAction).to.eql({
			type: 'USER_SET_ID',
			id: 0
		})
	})

	it('usersPopulateList returns an object for updating users list action', () => {
		const populateUsersListAction = usersPopulateList(users)
		expect(populateUsersListAction).to.eql({
			type: 'USERS_LIST',
			users: ['paul', 'jen']
		})
	})

	it('userRemove returns object to remove a user', () => {
		const removeUserAction = userRemove(username)
		expect(removeUserAction).to.eql({
			type: 'USER_REMOVE_USER',
			username: 'pbie'
		})
	})

	it('userSetUsername returns an object for the set username action', () => {
		const setUsernameAction = userSetUsername(username)
		expect(setUsernameAction).to.eql({
			type: 'USER_SET_USERNAME',
			username: 'pbie'
		})
	})

	it('userUnsetUsername returns an object for the unsetting username action', () => {
		const unsetUsernameAction = userUnsetUsername(username)
		expect(unsetUsernameAction).to.eql({
			type: 'USER_UNSET_USERNAME',
			username: 'pbie'
		})
	})

	it('userUsernameSet returns an object for the updating username set connection action', () => {
		const usernameSetAction = userUsernameSet()
		expect(usernameSetAction).to.eql({
			type: 'USER_USERNAME_SET',
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
