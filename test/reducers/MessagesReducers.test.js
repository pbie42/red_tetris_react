import { expect } from 'chai'
import messages from '../../src/client/reducers/messages'

describe('Message Reducers', () => {
	it('adds a message to the state', () => {
		const updatedStateAdd = messages([], {
			type: 'MESSAGE_ADD',
			message: 'Suh Dude',
			author: 'Paul',
			id: 1
		})
		const updatedStateReceived = messages([], {
			type: 'MESSAGE_RECEIVED',
			message: 'DUDE SUH!',
			author: 'Tam',
			id: 2
		})
		expect(updatedStateAdd).to.eql([
			{
				message: 'Suh Dude',
				author: 'Paul',
				id: 1
			}
		])
		expect(updatedStateReceived).to.eql([
			{
				message: 'DUDE SUH!',
				author: 'Tam',
				id: 2
			}
		])
	})
	it('returns initial state if no state is given', () => {
		const action = {
			type: 'TEST_ACTION',
			username: 'jennzmee'
		}
		const state = messages(undefined, action)
		expect(state).to.eql([])
	})
	it('returns state if no action is given', () => {
		const updatedState = messages([], undefined)
		expect(updatedState).to.eql([])
	})
})
