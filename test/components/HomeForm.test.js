import React from 'react'
import sinon from 'sinon'
import configureMockStore from 'redux-mock-store'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'

import {
	HomeFormContainer,
	mapDispatchToProps
} from '../../src/client/containers/home/HomeForm'
import HomeForm from '../../src/client/components/home/HomeForm'
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
		const wrapper = mount(
			<Provider store={store}>
				<HomeFormContainer />
			</Provider>
		)

		expect(wrapper.find(HomeFormContainer).length).to.equal(1)
		const container = wrapper.find(HomeForm)
		expect(container.find(HomeForm).length).to.equal(1)
		wrapper.unmount()
	})

	describe('Methods', () => {
		describe('enterUsername', () => {
			const setUsernameSpy = sinon.spy()
			const addUserSpy = sinon.spy()
			const preventSpy = sinon.spy()
			const wrapper = mount(
				<HomeForm
					users={[{ id: 0, name: 'Jen' }]}
					store={store}
					history={[]}
					addUser={addUserSpy}
					setUsername={setUsernameSpy}
				/>
			)

			it('calls setUsername dispatch', () => {
				wrapper.update()
				wrapper.ref('input').value = 'test'
				wrapper
					.instance()
					.enterUsername({ key: 'Enter', preventDefault: preventSpy })
				expect(setUsernameSpy.called).to.be.true
				expect(preventSpy.called).to.be.true
			})

			it('calls addUser dispatch', () => {
				expect(addUserSpy.called).to.be.true
			})

			it('pushes new page route "/lobby" into history', () => {
				expect(wrapper.instance().props.history[0]).to.equal('/lobby')
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
			const wrapper = mount(
				<HomeForm users={[{ id: 0, name: 'Jen' }]} store={store} />
			)
			it('sets state.error to false', () => {
				wrapper.update()
				wrapper.instance().setState({ error: true })
				wrapper.instance().noError()
				expect(wrapper.instance().state.error).to.be.false
			})
		})

		describe('placeHolder', () => {
			const wrapper = mount(
				<HomeForm users={[{ id: 0, name: 'Jen' }]} store={store} />
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
			const setUsernameSpy = sinon.spy()
			const addUserSpy = sinon.spy()
			const verifyUsernameSpy = sinon.spy()
			const wrapper = mount(
				<HomeForm
					store={store}
					history={[]}
					addUser={addUserSpy}
					setUsername={setUsernameSpy}
					verifyUsername={verifyUsernameSpy}
					users={[{ id: 0, name: 'Jen' }]}
				/>
			)
			wrapper.update()
			wrapper.ref('input').value = 'test'
			wrapper.instance().submitUsername({ value: 'test' })

			it('calls setUsername dispatch', () => {
				expect(setUsernameSpy.called).to.be.true
			})

			it('calls addUser dispatch', () => {
				expect(addUserSpy.called).to.be.true
			})

			it('pushes new page route "/lobby" into history', () => {
				expect(wrapper.instance().props.history[0]).to.equal('/lobby')
			})

			it('resets input value to ""', () => {
				expect(wrapper.ref('input').value).to.equal('')
			})
		})

		describe('verifyUsername', () => {
			const wrapper = mount(
				<HomeForm store={store} history={[]} users={[{ id: 0, name: 'Jen' }]} />
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
			const wrapper = mount(
				<Provider store={store}>
					<HomeFormContainer />
				</Provider>
			)
			wrapper.update()
			const state = wrapper.props().store.getState()
			expect(state).to.eql({ user: {}, users: [] })
			wrapper.unmount()
		})

		describe('Dispatch', () => {
			it('should call dispatch setUsername with property username', () => {
				const dispatchSpy = sinon.spy()
				const { setUsername } = mapDispatchToProps(dispatchSpy)
				setUsername('Paul')
				const expectedAction = actions.setUsername()
				const spyLastCall = dispatchSpy.args[0][0]
				expect(spyLastCall.type).to.eql(expectedAction.type)
				expect(spyLastCall.username).to.equal('Paul')
			})

			it('should call dispatch addUser with property username', () => {
				const dispatchSpy = sinon.spy()
				const { addUser } = mapDispatchToProps(dispatchSpy)
				addUser('Dan')
				const expectedAction = actions.addUser()
				const spyLastCall = dispatchSpy.args[0][0]
				expect(spyLastCall.type).to.eql(expectedAction.type)
				expect(spyLastCall.name).to.equal('Dan')
				expect(spyLastCall.id).to.equal(1)
			})
		})
	})

	describe('User Events', () => {
		it('should call submitUsername onClick', () => {
			const wrapper = mount(
				<HomeForm
					users={[{ id: 0, name: 'Jen' }]}
					submitUsername={() => {}}
					store={store}
				/>
			)
			const submitUsername = sinon.spy(wrapper.instance(), 'submitUsername')
			wrapper.update()
			wrapper.find('.username-button').simulate('click')
			expect(submitUsername.calledOnce).to.be.true
			wrapper.unmount()
		})

		it('should call enterUsername onKeyPress', () => {
			const wrapper = mount(
				<HomeForm
					users={[{ id: 0, name: 'Jen' }]}
					enterUsername={e => {}}
					store={store}
				/>
			)
			const enterUsername = sinon.spy(wrapper.instance(), 'enterUsername')
			wrapper.update()
			wrapper.find('.usernameinput').simulate('keypress', { key: 'Enter' })
			expect(enterUsername.calledOnce).to.be.true
			wrapper.unmount()
		})

		it('should call noError method onChange', () => {
			const wrapper = mount(<HomeForm noError={() => {}} store={store} />)
			const noError = sinon.spy(wrapper.instance(), 'noError')
			wrapper.update()
			wrapper.find('input').simulate('change')
			expect(noError.calledOnce).to.be.true
			wrapper.unmount()
		})
	})
})
