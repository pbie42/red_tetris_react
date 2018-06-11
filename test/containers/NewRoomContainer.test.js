import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'

import {
	mapDispatchToProps,
	mapStateToProps
} from '../../src/client/containers/lobby/new_room/NewRoomContainer'
import * as actions from '../../src/client/actions'

describe('Rooms Container', () => {
	describe('mapDispatchToProps', () => {
		it('roomAdd called with members and roomName', () => {
			const members = ['Wolverine']
			const roomName = 'Danger Room'
			const dispatchSpy = sinon.spy()
			const { roomAdd } = mapDispatchToProps(dispatchSpy)
			roomAdd(roomName, members)
			const expectedAction = actions.roomAdd()
			const spyLastCall = dispatchSpy.args[0][0]
			expect(spyLastCall.type).to.eql(expectedAction.type)
			expect(spyLastCall.roomName).to.equal(roomName)
			expect(spyLastCall.members).to.eql(members)
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
