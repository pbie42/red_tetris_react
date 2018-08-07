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
		const gameRoomUnsetSpy = sinon.spy()
		const roomRemoveUserSpy = sinon.spy()
		const gameRemoveBoardsSpy = sinon.spy()
		const gameRemoveIdSpy = sinon.spy()
		const gameClearSpy = sinon.spy()
		const wrapper = mount(
			<Provider store={store}>
				<GameComponent
					match={{ params: { game: 'go[Paul]' } }}
					gameClear={gameClearSpy}
					gameRoomUnset={gameRoomUnsetSpy}
					roomRemoveUser={roomRemoveUserSpy}
					gameRemoveBoards={gameRemoveBoardsSpy}
					gameRemoveId={gameRemoveIdSpy}
				/>
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
			it('roomAdd called with properties roomName and members', () => {
				const dispatchSpy = sinon.spy()
				const { roomAdd } = mapDispatchToProps(dispatchSpy)
				roomAdd(roomName, members)
				const expectedAction = actions.roomAdd()
				const spyLastCall = dispatchSpy.args[0][0]
				expect(spyLastCall.type).to.eql(expectedAction.type)
				expect(spyLastCall.roomName).to.equal(roomName)
				expect(spyLastCall.members).to.eql(members)
			})

			it('userAdd called with property username', () => {
				const dispatchSpy = sinon.spy()
				const { userAdd } = mapDispatchToProps(dispatchSpy)
				userAdd(username)
				const expectedAction = actions.userAdd()
				const spyLastCall = dispatchSpy.args[0][0]
				expect(spyLastCall.type).to.eql(expectedAction.type)
				expect(spyLastCall.username).to.equal(username)
				expect(spyLastCall.id).to.equal(1)
			})

			it('roomAddUser called with properties username and roomName', () => {
				const dispatchSpy = sinon.spy()
				const { roomAddUser } = mapDispatchToProps(dispatchSpy)
				roomAddUser(username, roomName)
				const expectedAction = actions.roomAddUser()
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

			it('roomRemoveUser called with property username', () => {
				const userId = '1nhasdli98e3'
				const dispatchSpy = sinon.spy()
				const { roomRemoveUser } = mapDispatchToProps(dispatchSpy)
				roomRemoveUser(username, userId, roomName)
				const expectedAction = actions.roomRemoveUser()
				const spyLastCall = dispatchSpy.args[0][0]
				expect(spyLastCall.type).to.eql(expectedAction.type)
				expect(spyLastCall.username).to.equal(username)
				expect(spyLastCall.userId).to.equal(userId)
				expect(spyLastCall.roomName).to.equal(roomName)
			})

			it('userSetUsername called with property username', () => {
				const dispatchSpy = sinon.spy()
				const { userSetUsername } = mapDispatchToProps(dispatchSpy)
				userSetUsername(username)
				const expectedAction = actions.userSetUsername()
				const spyLastCall = dispatchSpy.args[0][0]
				expect(spyLastCall.type).to.eql(expectedAction.type)
				expect(spyLastCall.username).to.equal(username)
			})
		})
	})
})
