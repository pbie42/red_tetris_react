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
			user: {}
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
		describe('enterNickname', () => {
			const setNicknameSpy = sinon.spy()
			const preventSpy = sinon.spy()
			const wrapper = mount(
				<HomeForm store={store} history={[]} setNickname={setNicknameSpy} />
			)
			it('calls setNickname dispatch', () => {
				wrapper.update()
				wrapper.ref('input').value = 'test'
				wrapper
					.instance()
					.enterNickname({ key: 'Enter', preventDefault: preventSpy })
				expect(setNicknameSpy.called).to.be.true
				expect(preventSpy.called).to.be.true
			})

			it('resets ref value to "" if Enter key is pressed', () => {
				expect(wrapper.ref('input').value).to.equal('')
			})

			it('does not change ref value if other key is pressed', () => {
				wrapper.ref('input').value = 'test'
				wrapper
					.instance()
					.enterNickname({ key: 'Delete', preventDefault: preventSpy })
				expect(wrapper.ref('input').value).to.equal('test')
			})
		})

		describe('placeHolder', () => {
			const wrapper = mount(<HomeForm store={store} />)
			it('sets state.plaeholder to "Choose a username to begin" if placeholder is currently ""', () => {
				wrapper.update()
				wrapper.instance().setState({ placeholder: '' })
				wrapper.instance().placeHolder()
				expect(wrapper.instance().state.placeholder).to.equal(
					'Choose a username to begin'
				)
			})
			it('sets state.plaeholder to "" if placeholder is currently "Choose a username to begin"', () => {
				wrapper
					.instance()
					.setState({ placeholder: 'Choose a username to begin' })
				wrapper.instance().placeHolder()
				expect(wrapper.instance().state.placeholder).to.equal('')
			})
		})

		describe('submitNickname', () => {
			const setNicknameSpy = sinon.spy()
			const wrapper = mount(
				<HomeForm store={store} history={[]} setNickname={setNicknameSpy} />
			)
			wrapper.update()
			wrapper.ref('input').value = 'test'
			wrapper.instance().submitNickname({ value: 'test' })

			it('calls setNickname dispatch, sets ref value, changes page', () => {
				expect(setNicknameSpy.called).to.be.true
			})

			it('pushes new page route "/chat" into history', () => {
				expect(wrapper.instance().props.history[0]).to.equal('/chat')
			})

			it('resets input value to ""', () => {
				expect(wrapper.ref('input').value).to.equal('')
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
			expect(state).to.eql({ user: {} })
			wrapper.unmount()
		})

		describe('Dispatch', () => {
			it('should call dispatch setNickname with property nickname', () => {
				const dispatchSpy = sinon.spy()
				const { setNickname } = mapDispatchToProps(dispatchSpy)
				setNickname('Paul')
				const expectedAction = actions.setNickname()
				const spyLastCall = dispatchSpy.args[0][0]
				expect(spyLastCall.type).to.eql(expectedAction.type)
				expect(spyLastCall.nickname).to.equal('Paul')
			})
		})
	})

	describe('User Events', () => {
		it('should call setNickname in state onChange', () => {
			const wrapper = mount(<HomeForm setNickname={() => {}} store={store} />)
			const setNickname = sinon.spy(wrapper.instance(), 'setNickname')
			wrapper.update()
			wrapper.find('input').simulate('change')
			expect(setNickname.calledOnce).to.be.true
			wrapper.unmount()
		})

		it('should call submitNickname onClick', () => {
			const wrapper = mount(
				<HomeForm submitNickname={() => {}} store={store} />
			)
			const submitNickname = sinon.spy(wrapper.instance(), 'submitNickname')
			wrapper.update()
			wrapper.find('.nickname-button').simulate('click')
			expect(submitNickname.calledOnce).to.be.true
			wrapper.unmount()
		})

		it('should call enterNickname onKeyPress', () => {
			const wrapper = mount(<HomeForm enterNickname={e => {}} store={store} />)
			const enterNickname = sinon.spy(wrapper.instance(), 'enterNickname')
			wrapper.update()
			wrapper.find('.nicknameinput').simulate('keypress', { key: 'Enter' })
			expect(enterNickname.calledOnce).to.be.true
			wrapper.unmount()
		})
	})
})
