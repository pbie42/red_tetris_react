import { expect } from 'chai'
import connection from '../../src/client/reducers/connection'

describe('Connection Reducers', () => {
	const initialConnectionState = {
		connected: false,
		users: false,
		rooms: false
	}
	it('sets connected to true', () => {
		const state = { connected: false }
		const updatedState = connection(state, {
			type: 'CONNECTED',
			connected: true
		})
		expect(updatedState.connected).to.be.true
	})
	it('sets connected to false', () => {
		const state = { connected: true }
		const updatedState = connection(state, {
			type: 'DISCONNECTED',
			connected: false
		})
		expect(updatedState.connected).to.be.false
	})
	it('returns state if not valid action type', () => {
		const updatedState = connection(initialConnectionState, {
			type: 'TEST_ACTION',
			username: 'jennzmee'
		})
		expect(updatedState).to.eql(initialConnectionState)
	})
	it('returns initial state if no state is given', () => {
		const action = {
			type: 'TEST_ACTION',
			username: 'jennzmee'
		}
		const state = connection(undefined, action)
		expect(state).to.eql(initialConnectionState)
	})
	it('returns state if no action is given', () => {
		const updatedState = connection(initialConnectionState, undefined)
		expect(updatedState).to.eql(initialConnectionState)
	})
	it('sets rooms to true if ROOMS_LIST was received', () => {
		const updatedState = connection(initialConnectionState, {
			type: 'ROOMS_LIST_RECEIVED',
			rooms: true
		})
		expect(updatedState.rooms).to.be.true
	})
	it('sets users to true if USERS_LIST was received', () => {
		const updatedState = connection(initialConnectionState, {
			type: 'USERS_LIST_RECEIVED',
			users: true
		})
		expect(updatedState.users).to.be.true
	})
})
