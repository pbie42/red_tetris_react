import React from 'react'
import sinon from 'sinon'
import configureMockStore from 'redux-mock-store'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'

import {
	HomeFormContainer,
	mapDispatchToProps
} from '../../src/client/containers/home/HomeFormContainer'
import HomeForm from '../../src/client/components/home/HomeFormComponent'
import * as actions from '../../src/client/actions'

const mockStore = configureMockStore()

describe('HomeForm', () => {
	let store
	beforeEach(() => {
		store = mockStore({
			user: {},
			users: []
		})
	})

	it('should render the container component', () => {
		const userSetUsernameSpy = sinon.spy()
		const userAddSpy = sinon.spy()
		const preventSpy = sinon.spy()
		const pageChangeSpy = sinon.spy()
		const wrapper = mount(
			<Provider store={store}>
				<HomeFormContainer
					users={[{ id: 0, name: 'Jen' }]}
					store={store}
					history={[]}
					userAdd={userAddSpy}
					userSetUsername={userSetUsernameSpy}
					pageChange={pageChangeSpy}
				/>
			</Provider>
		)

		expect(wrapper.find(HomeFormContainer).length).to.equal(1)
		const container = wrapper.find(HomeForm)
		expect(container.find(HomeForm).length).to.equal(1)
		wrapper.unmount()
	})

	describe('Methods', () => {
		describe('enterUsername', () => {
			const userSetUsernameSpy = sinon.spy()
			const userAddSpy = sinon.spy()
			const preventSpy = sinon.spy()
			const pageChangeSpy = sinon.spy()
			const wrapper = mount(
				<HomeForm
					users={[{ id: 0, name: 'Jen' }]}
					store={store}
					history={[]}
					userAdd={userAddSpy}
					userSetUsername={userSetUsernameSpy}
					pageChange={pageChangeSpy}
				/>
			)
			it('calls userSetUsername dispatch', () => {
				wrapper.update()
				wrapper.ref('input').value = 'test'
				wrapper
					.instance()
					.enterUsername({ key: 'Enter', preventDefault: preventSpy })
				expect(userSetUsernameSpy.called).to.be.true
				expect(preventSpy.called).to.be.true
			})
			it('calls userAdd dispatch', () => {
				expect(userAddSpy.called).to.be.true
			})
			it('pushes new page route "/lobby" into history', done => {
				setTimeout(function() {
					expect(wrapper.instance().props.history[0]).to.equal('/lobby')
					done()
				}, 800)
			})
			it('resets ref value to "" if Enter key is pressed', () => {
				expect(wrapper.ref('input').value).to.equal('')
			})
			it('does not change ref value if another key is pressed', () => {
				wrapper.ref('input').value = 'test'
				wrapper
					.instance()
					.enterUsername({ key: 'Delete', preventDefault: preventSpy })
				expect(wrapper.ref('input').value).to.equal('test')
			})
		})

		describe('noError', () => {
			const userSetUsernameSpy = sinon.spy()
			const userAddSpy = sinon.spy()
			const preventSpy = sinon.spy()
			const pageChangeSpy = sinon.spy()
			const wrapper = mount(
				<HomeForm
					users={[{ id: 0, name: 'Jen' }]}
					store={store}
					history={[]}
					userAdd={userAddSpy}
					userSetUsername={userSetUsernameSpy}
					pageChange={pageChangeSpy}
				/>
			)
			it('sets state.error to false', () => {
				wrapper.update()
				wrapper.instance().setState({ error: true })
				wrapper.instance().noError()
				expect(wrapper.instance().state.error).to.be.false
			})
		})

		describe('placeHolder', () => {
			const userSetUsernameSpy = sinon.spy()
			const userAddSpy = sinon.spy()
			const preventSpy = sinon.spy()
			const pageChangeSpy = sinon.spy()
			const wrapper = mount(
				<HomeForm
					users={[{ id: 0, name: 'Jen' }]}
					store={store}
					history={[]}
					userAdd={userAddSpy}
					userSetUsername={userSetUsernameSpy}
					pageChange={pageChangeSpy}
				/>
			)
			it('sets state.placeholder to "Choose a username to begin" if placeholder is currently ""', () => {
				wrapper.update()
				wrapper.instance().setState({ placeholder: '' })
				wrapper.instance().placeHolder()
				expect(wrapper.instance().state.placeholder).to.equal(
					'Choose a username to begin'
				)
			})
			it('sets state.placeholder to "" if placeholder is currently "Choose a username to begin"', () => {
				wrapper
					.instance()
					.setState({ placeholder: 'Choose a username to begin' })
				wrapper.instance().placeHolder()
				expect(wrapper.instance().state.placeholder).to.equal('')
			})
			it('sets state.placeholder to "Username already taken" if state.error is true', () => {
				wrapper
					.instance()
					.setState({ placeholder: 'Choose a username to begin' })
				wrapper.instance().setState({ error: true })
				wrapper.instance().placeHolder()
				expect(wrapper.instance().state.placeholder).to.equal(
					'Username already taken'
				)
			})
		})

		describe('submitUsername', () => {
			const userSetUsernameSpy = sinon.spy()
			const userAddSpy = sinon.spy()
			const preventSpy = sinon.spy()
			const pageChangeSpy = sinon.spy()
			const verifyUsernameSpy = sinon.spy()
			const wrapper = mount(
				<HomeForm
					store={store}
					history={[]}
					userAdd={userAddSpy}
					userSetUsername={userSetUsernameSpy}
					verifyUsername={verifyUsernameSpy}
					users={[{ id: 0, name: 'Jen' }]}
					pageChange={pageChangeSpy}
				/>
			)
			wrapper.update()
			wrapper.ref('input').value = 'test'
			wrapper.instance().submitUsername({ value: 'test' })
			it('calls userSetUsername dispatch', () => {
				expect(userSetUsernameSpy.called).to.be.true
			})
			it('calls userAdd dispatch', () => {
				expect(userAddSpy.called).to.be.true
			})
			it('pushes new page route "/lobby" into history', () => {
				expect(wrapper.instance().props.history[0]).to.equal('/lobby')
			})
			it('resets input value to ""', () => {
				expect(wrapper.ref('input').value).to.equal('')
			})
		})

		describe('verifyUsername', () => {
			const userSetUsernameSpy = sinon.spy()
			const userAddSpy = sinon.spy()
			const preventSpy = sinon.spy()
			const pageChangeSpy = sinon.spy()
			const wrapper = mount(
				<HomeForm
					users={[{ id: 0, username: 'Jen' }]}
					store={store}
					history={[]}
					userAdd={userAddSpy}
					userSetUsername={userSetUsernameSpy}
					pageChange={pageChangeSpy}
				/>
			)
			wrapper.update()
			it('returns true if new username is unique', () => {
				const result = wrapper.instance().verifyUsername('Paul')
				expect(result).to.be.true
			})
			it('returns false if new username is not unique', () => {
				const result = wrapper.instance().verifyUsername('Jen')
				expect(result).to.be.false
			})
		})
	})

	describe('Store', () => {
		it('should show user value as empty object in state', () => {
			const userSetUsernameSpy = sinon.spy()
			const userAddSpy = sinon.spy()
			const preventSpy = sinon.spy()
			const pageChangeSpy = sinon.spy()
			const wrapper = mount(
				<Provider store={store}>
					<HomeFormContainer
						users={[{ id: 0, name: 'Jen' }]}
						store={store}
						history={[]}
						userAdd={userAddSpy}
						userSetUsername={userSetUsernameSpy}
						pageChange={pageChangeSpy}
					/>
				</Provider>
			)
			wrapper.update()
			const state = wrapper.props().store.getState()
			expect(state).to.eql({ user: {}, users: [] })
			wrapper.unmount()
		})

		describe('Dispatch', () => {
			it('should call dispatch userSetUsername with property username', () => {
				const dispatchSpy = sinon.spy()
				const { userSetUsername } = mapDispatchToProps(dispatchSpy)
				userSetUsername('Paul')
				const expectedAction = actions.userSetUsername()
				const spyLastCall = dispatchSpy.args[0][0]
				expect(spyLastCall.type).to.eql(expectedAction.type)
				expect(spyLastCall.username).to.equal('Paul')
			})

			it('should call dispatch userAdd with property username', () => {
				const dispatchSpy = sinon.spy()
				const { userAdd } = mapDispatchToProps(dispatchSpy)
				userAdd('Dan')
				const expectedAction = actions.userAdd()
				const spyLastCall = dispatchSpy.args[0][0]
				expect(spyLastCall.type).to.eql(expectedAction.type)
				expect(spyLastCall.username).to.equal('Dan')
				expect(spyLastCall.id).to.equal(3)
			})
		})
	})

	describe('User Events', () => {
		it('should call submitUsername onClick', () => {
			const userSetUsernameSpy = sinon.spy()
			const userAddSpy = sinon.spy()
			const preventSpy = sinon.spy()
			const pageChangeSpy = sinon.spy()
			const wrapper = mount(
				<HomeForm
					users={[{ id: 0, name: 'Jen' }]}
					store={store}
					history={[]}
					userAdd={userAddSpy}
					userSetUsername={userSetUsernameSpy}
					pageChange={pageChangeSpy}
					submitUsername={() => {}}
				/>
			)
			const submitUsername = sinon.spy(wrapper.instance(), 'submitUsername')
			wrapper.update()
			wrapper.find('.username-button').simulate('click')
			expect(submitUsername.calledOnce).to.be.true
			wrapper.unmount()
		})

		it('should call enterUsername onKeyPress', () => {
			const userSetUsernameSpy = sinon.spy()
			const userAddSpy = sinon.spy()
			const preventSpy = sinon.spy()
			const pageChangeSpy = sinon.spy()
			const wrapper = mount(
				<HomeForm
					users={[{ id: 0, name: 'Jen' }]}
					store={store}
					history={[]}
					userAdd={userAddSpy}
					userSetUsername={userSetUsernameSpy}
					pageChange={pageChangeSpy}
					enterUsername={e => {}}
				/>
			)
			const enterUsername = sinon.spy(wrapper.instance(), 'enterUsername')
			wrapper.update()
			wrapper.find('.usernameinput').simulate('keypress', { key: 'Enter' })
			expect(enterUsername.calledOnce).to.be.true
			wrapper.unmount()
		})

		it('should call noError method onChange', () => {
			const userSetUsernameSpy = sinon.spy()
			const userAddSpy = sinon.spy()
			const preventSpy = sinon.spy()
			const pageChangeSpy = sinon.spy()
			const wrapper = mount(
				<HomeForm
					noError={() => {}}
					users={[{ id: 0, name: 'Jen' }]}
					store={store}
					history={[]}
					userAdd={userAddSpy}
					userSetUsername={userSetUsernameSpy}
					pageChange={pageChangeSpy}
					enterUsername={e => {}}
				/>
			)
			// expect(userAddSpy.called).to.be.true
			const noError = sinon.spy(wrapper.instance(), 'noError')
			wrapper.update()
			wrapper.find('input').simulate('change')
			expect(noError.calledOnce).to.be.true
			wrapper.unmount()
		})
	})
})
