import { expect } from 'chai'
import rooms from '../../src/client/reducers/rooms'

let members = ['John', 'Paul', 'George', 'Ringo']
let roomsList = [{ roomName: 'Todd Room', members }]

describe('Room Reducers', () => {
	it('adds boards to game state', () => {
		const updatedState = rooms([], {
			type: 'ROOM_ADD_ROOM',
			roomName: 'Todd Room',
			members
		})
		expect(updatedState).to.eql([{ roomName: 'Todd Room', members }])
	})
	it('adds user to a room', () => {
		const updatedState = rooms(roomsList, {
			type: 'ROOM_ADD_USER',
			roomName: 'Todd Room',
			username: 'Todd'
		})
		expect(updatedState).to.eql([
			{
				roomName: 'Todd Room',
				members: ['John', 'Paul', 'George', 'Ringo', 'Todd']
			}
		])
	})

	it('removes user from a room', () => {
		const updatedState = rooms(roomsList, {
			type: 'ROOM_REMOVE_USER',
			roomName: 'Todd Room',
			username: 'Paul'
		})
		expect(updatedState).to.eql([
			{
				roomName: 'Todd Room',
				members: ['John', 'George', 'Ringo', 'Todd']
			}
		])
	})

	it('updates the rooms list', () => {
		const updatedState = rooms([], {
			type: 'ROOMS_LIST',
			rooms: roomsList
		})
		expect(updatedState).to.eql(roomsList)
	})
	it('returns initial state if no state is given', () => {
		const action = {
			type: 'TEST_ACTION',
			username: 'jennzmee'
		}
		const state = rooms(undefined, action)
		expect(state).to.eql([])
	})
	it('returns state if no action is given', () => {
		const updatedState = rooms([], undefined)
		expect(updatedState).to.eql([])
	})
})
