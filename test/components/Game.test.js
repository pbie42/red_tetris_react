import React from 'react'
import sinon from 'sinon'
import configureMockStore from 'redux-mock-store'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'

import {
	GameContainer,
	mapDispatchToProps,
	mapStateToProps
} from '../../src/client/containers/game/GameContainer'
import GameComponent from '../../src/client/components/game/GameComponent'
import * as actions from '../../src/client/actions'

const mockStore = configureMockStore()

describe('Game', () => {
	let store
	beforeEach(() => {
		store = mockStore({
			user: {},
			users: []
		})
	})

	it('should render the game component', () => {
		const wrapper = mount(
			<Provider store={store}>
				<GameComponent />
			</Provider>
		)

		expect(wrapper.find(GameComponent).length).to.equal(1)
		// const container = wrapper.find(HomeForm)
		// expect(container.find(GameComponent).length).to.equal(1)
		wrapper.unmount()
	})

	describe('Props', () => {
		const username = 'Dan'
		const roomName = 'Danger Room'
		const members = ['john', 'paul', 'george', 'ringo']

		describe('Dispatch', () => {
			it('addRoom called with properties roomName and members', () => {
				const dispatchSpy = sinon.spy()
				const { addRoom } = mapDispatchToProps(dispatchSpy)
				addRoom(roomName, members)
				const expectedAction = actions.addRoom()
				const spyLastCall = dispatchSpy.args[0][0]
				expect(spyLastCall.type).to.eql(expectedAction.type)
				expect(spyLastCall.roomName).to.equal(roomName)
				expect(spyLastCall.members).to.eql(members)
			})

			it('addUser called with property username', () => {
				const dispatchSpy = sinon.spy()
				const { addUser } = mapDispatchToProps(dispatchSpy)
				addUser(username)
				const expectedAction = actions.addUser()
				const spyLastCall = dispatchSpy.args[0][0]
				expect(spyLastCall.type).to.eql(expectedAction.type)
				expect(spyLastCall.name).to.equal(username)
				expect(spyLastCall.id).to.equal(1)
			})

			it('addUserToRoom called with properties username and roomName', () => {
				const dispatchSpy = sinon.spy()
				const { addUserToRoom } = mapDispatchToProps(dispatchSpy)
				addUserToRoom(username, roomName)
				const expectedAction = actions.addUserToRoom()
				const spyLastCall = dispatchSpy.args[0][0]
				expect(spyLastCall.type).to.eql(expectedAction.type)
				expect(spyLastCall.username).to.equal(username)
				expect(spyLastCall.roomName).to.equal(roomName)
			})

			it('errorTooManyMembers called', () => {
				const dispatchSpy = sinon.spy()
				const { errorTooManyMembers } = mapDispatchToProps(dispatchSpy)
				errorTooManyMembers()
				const expectedAction = actions.errorTooManyMembers()
				const spyLastCall = dispatchSpy.args[0][0]
				expect(spyLastCall.type).to.eql(expectedAction.type)
			})

			it('errorUsernameTaken called with property username', () => {
				const dispatchSpy = sinon.spy()
				const { errorUsernameTaken } = mapDispatchToProps(dispatchSpy)
				errorUsernameTaken(username)
				const expectedAction = actions.errorUsernameTaken()
				const spyLastCall = dispatchSpy.args[0][0]
				expect(spyLastCall.type).to.eql(expectedAction.type)
				expect(spyLastCall.username).to.equal(username)
			})

			it('removeUser called with property username', () => {
				const dispatchSpy = sinon.spy()
				const { removeUser } = mapDispatchToProps(dispatchSpy)
				removeUser(username)
				const expectedAction = actions.removeUser()
				const spyLastCall = dispatchSpy.args[0][0]
				expect(spyLastCall.type).to.eql(expectedAction.type)
				expect(spyLastCall.username).to.equal(username)
			})

			it('removeUserFromRoom called with property username', () => {
				const dispatchSpy = sinon.spy()
				const { removeUserFromRoom } = mapDispatchToProps(dispatchSpy)
				removeUserFromRoom(username, roomName)
				const expectedAction = actions.removeUserFromRoom()
				const spyLastCall = dispatchSpy.args[0][0]
				expect(spyLastCall.type).to.eql(expectedAction.type)
				expect(spyLastCall.username).to.equal(username)
				expect(spyLastCall.roomName).to.equal(roomName)
			})

			it('setUsername called with property username', () => {
				const dispatchSpy = sinon.spy()
				const { setUsername } = mapDispatchToProps(dispatchSpy)
				setUsername(username)
				const expectedAction = actions.setUsername()
				const spyLastCall = dispatchSpy.args[0][0]
				expect(spyLastCall.type).to.eql(expectedAction.type)
				expect(spyLastCall.username).to.equal(username)
			})
		})
	})
})
