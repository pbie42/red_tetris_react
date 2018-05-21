import { expect } from 'chai'
import {
	userSetUsername,
	userAdd,
	addRoom,
	roomAdded,
	roomAddUser,
	removeUserFromRoom,
	userRemove,
	addMessage,
	userUnsetUsername,
	usersPopulateList,
	usersListReceived,
	userUsernameSet,
	connected,
	disconnected,
	errorTooManyMembers,
	errorUsernameTaken,
	populateRoomsList,
	roomsListReceived,
	messageReceived
} from '../../src/client/actions'

describe('Actions', () => {
	const username = 'pbie'
	const roomName = 'Danger Room'
	const users = ['paul', 'jen']
	const members = ['nick', 'josie']
	const rooms = [
		{ roomName: 'test1', members: ['john', 'paul', 'george', 'ringo'] }
	]

	describe('Chat', () => {
		it('addMessage returns an object for the add message action', () => {
			const message = 'hello'
			const addMessageAction = addMessage(message, username)
			expect(addMessageAction).to.eql({
				type: 'MESSAGE_ADD',
				id: 0,
				author: 'pbie',
				message: 'hello'
			})
		})
		it('messageReceived returns an object for the message received action', () => {
			const message = 'hello'
			const messageReceivedAction = messageReceived(message, username)
			expect(messageReceivedAction).to.eql({
				type: 'MESSAGE_RECEIVED',
				id: 1,
				author: 'pbie',
				message: 'hello'
			})
		})
	})

	describe('Connections', () => {
		it('connected returns an object for the update connection action', () => {
			const connectedAction = connected()
			expect(connectedAction).to.eql({
				type: 'CONNECTED',
				connected: true
			})
		})
		it('disconnected returns an object for the update connection action', () => {
			const disconnectedAction = disconnected()
			expect(disconnectedAction).to.eql({
				type: 'DISCONNECTED',
				connected: false
			})
		})
	})

	describe('Errors', () => {
		it('errorTooManyMembers returns an object for the too many members error action', () => {
			const errorTooManyMembersAction = errorTooManyMembers()
			expect(errorTooManyMembersAction).to.eql({
				type: 'ERROR_TOO_MANY_MEMBERS'
			})
		})
		it('errorUsernameTaken returns an object for the username taken error action', () => {
			const errorUsernameTakenAction = errorUsernameTaken(username)
			expect(errorUsernameTakenAction).to.eql({
				type: 'ERROR_USERNAME_TAKEN',
				username
			})
		})
	})

	describe('Rooms', () => {
		it('roomAddUser returns an object for the add user to room action', () => {
			const addUserToRoomAction = roomAddUser(username, roomName)
			expect(addUserToRoomAction).to.eql({
				type: 'ROOM_ADD_USER',
				roomName,
				username
			})
		})
		it('removeUserFromRoom returns an object for the remove user from a room action', () => {
			const removeUserFromRoomAction = removeUserFromRoom(username, roomName)
			expect(removeUserFromRoomAction).to.eql({
				type: 'ROOM_REMOVE_USER',
				roomName,
				username
			})
		})
		it('addRoom returns an object for the add a room to rooms array action', () => {
			const addRoomAction = addRoom(roomName, members)
			expect(addRoomAction).to.eql({
				type: 'ROOM_ADD_ROOM',
				roomName,
				members
			})
		})
		it('roomAdded returns an object for the room added action', () => {
			const roomAddedAction = roomAdded(roomName, members)
			expect(roomAddedAction).to.eql({
				type: 'ROOM_ADDED',
				roomName,
				members
			})
		})
		it('populateRoomsList returns an object for updating rooms array action', () => {
			const populateRoomsListAction = populateRoomsList(rooms)
			expect(populateRoomsListAction).to.eql({
				type: 'ROOMS_LIST',
				rooms
			})
		})
		it('roomsListReceived returns an object for rooms list received boolean action', () => {
			const roomsListReceivedAction = roomsListReceived()
			expect(roomsListReceivedAction).to.eql({
				type: 'ROOMS_LIST_RECEIVED',
				rooms: true
			})
		})
	})

	describe('User', () => {
		it('userAdd returns an object for the add user action', () => {
			const addUserAction = userAdd(username)
			expect(addUserAction).to.eql({
				type: 'USER_ADD_USER',
				id: 0,
				username: 'pbie'
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
})
