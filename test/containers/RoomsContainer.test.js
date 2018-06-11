import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'

import {
	mapDispatchToProps,
	mapStateToProps
} from '../../src/client/containers/lobby/rooms/RoomsContainer'
import * as actions from '../../src/client/actions'

describe('Rooms Container', () => {
	describe('mapDispatchToProps', () => {
		it('roomAddUser called with username and roomName', () => {
			const username = 'Wolverine'
			const roomName = 'Danger Room'
			const dispatchSpy = sinon.spy()
			const { roomAddUser } = mapDispatchToProps(dispatchSpy)
			roomAddUser(username, roomName)
			const expectedAction = actions.roomAddUser()
			const spyLastCall = dispatchSpy.args[0][0]
			expect(spyLastCall.type).to.eql(expectedAction.type)
			expect(spyLastCall.roomName).to.equal(roomName)
			expect(spyLastCall.username).to.eql(username)
		})
	})
	describe('mapStateToProps', () => {
		let state = {
			user: {
				username: 'Jen'
			},
			rooms: [
				{
					id: '89dsa987fasf',
					roomName: 'Todd Room',
					creator: 'Todd',
					inSession: false,
					countdown: false,
					members: [
						{
							id: '89dsa987fasf',
							username: 'Todd'
						}
					]
				}
			]
		}
		it('returns global username and rooms list', () => {
			let mappedState = mapStateToProps(state)
			expect(mappedState).to.eql({
				username: state.user.username,
				rooms: state.rooms
			})
		})
	})
})
