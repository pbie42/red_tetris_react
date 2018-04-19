import React from 'react'
import sinon from 'sinon'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import { MemoryRouter } from 'react-router'
import chai from 'chai'
import spies from 'chai-spies'
chai.use(spies)
import {
	HomeFormContainer,
	mapDispatchToProps
} from '../../src/containers/home/HomeForm'
import HomeForm from '../../src/components/home/HomeForm'
import * as actions from '../../src/actions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const expect = chai.expect

const mockStore = configureMockStore([thunk])

describe('Container HomeForm', () => {
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

	it('should call setNickname in state onChange', () => {
		const wrapper = mount(<HomeForm setNickname={() => {}} store={store} />)
		const setNickname = sinon.spy(wrapper.instance(), 'setNickname')
		wrapper.update()
		wrapper.find('input').simulate('change')
		expect(setNickname.calledOnce).to.be.true
		wrapper.unmount()
	})

	it('should call submitNickname onClick', () => {
		const wrapper = mount(<HomeForm submitNickname={() => {}} store={store} />)
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

	it('has a method called placeHolder that changes placeholder in component state', () => {
		const wrapper = mount(<HomeForm store={store} />)
		wrapper.update()
		wrapper.instance().setState({ placeholder: '' })
		wrapper.instance().placeHolder()
		expect(wrapper.instance().state.placeholder).to.equal(
			'Choose a username to begin'
		)
		wrapper.instance().setState({ placeholder: 'Choose a username to begin' })
		wrapper.instance().placeHolder()
		expect(wrapper.instance().state.placeholder).to.equal('')
		wrapper.unmount()
	})

	it('calls method submitNickname which calls setNickname dispatch, sets ref value, changes page', () => {
		const dispatchSpy2 = sinon.spy()
		const wrapper = mount(
			<HomeForm store={store} history={[]} setNickname={dispatchSpy2} />
		)
		wrapper.update()
		wrapper.ref('input').value = 'test'
		wrapper.instance().submitNickname({ value: 'test' })
		expect(wrapper.ref('input').value).to.equal('')
		expect(dispatchSpy2.called).to.be.true
		wrapper.unmount()
	})

	it('calls method enterNickname which calls setNickname dispatch, sets ref value, changes page, if Enter key is pressed', () => {
		const dispatchSpy2 = sinon.spy()
		const preventSpy = sinon.spy()
		const wrapper = mount(
			<HomeForm store={store} history={[]} setNickname={dispatchSpy2} />
		)
		wrapper.update()
		wrapper.ref('input').value = 'test'
		wrapper
			.instance()
			.enterNickname({ key: 'Enter', preventDefault: preventSpy })
		expect(wrapper.ref('input').value).to.equal('')
		expect(dispatchSpy2.called).to.be.true
		expect(preventSpy.called).to.be.true
		wrapper.ref('input').value = 'test'
		wrapper
			.instance()
			.enterNickname({ key: 'Delete', preventDefault: preventSpy })
		expect(wrapper.ref('input').value).to.equal('test')
		wrapper.unmount()
	})

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
