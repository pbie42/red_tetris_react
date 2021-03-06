import { expect } from 'chai'
import {
	connected,
	disconnected,
	errorTooManyMembers,
	errorUsernameTaken,
	gameBoardUpdate,
	messageAdd,
	messageReceived,
	roomAdd,
	roomAddUser,
	roomAdded,
	roomRemoveUser,
	roomsListReceived,
	roomsPopulateList,
	userAdd,
	userRemove,
	userSetUsername,
	userUnsetUsername,
	userUsernameSet,
	usersListReceived,
	usersPopulateList
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
		it('messageAdd returns an object for the add message action', () => {
			const message = 'hello'
			const addMessageAction = messageAdd(message, username)
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
		it('roomRemoveUser returns an object for the remove user from a room action', () => {
			const userId = '1nhasdli98e3'
			const removeUserFromRoomAction = roomRemoveUser(username, userId, roomName)
			expect(removeUserFromRoomAction).to.eql({
				type: 'ROOM_REMOVE_USER',
				roomName,
				username,
				userId
			})
		})
		it('roomAdd returns an object for the add a room to rooms array action', () => {
			const addRoomAction = roomAdd(roomName, members)
			expect(addRoomAction).to.eql({
				type: 'ROOM_ADD_ROOM',
				roomName,
				members
			})
		})
		it('roomsPopulateList returns an object for updating rooms array action', () => {
			const populateRoomsListAction = roomsPopulateList(rooms)
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
})
