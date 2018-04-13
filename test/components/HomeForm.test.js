import React from 'react'
import sinon from 'sinon'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import chai from 'chai'
import spies from 'chai-spies'
chai.use(spies)
import { HomeFormContainer } from '../../src/containers/home/HomeForm'
import HomeForm from '../../src/components/home/HomeForm'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const expect = chai.expect

const mockStore = configureMockStore([thunk])

describe('Container HomeForm', () => {
	let store
	beforeEach(() => {
		store = mockStore({
			auth: {
				sport: 'BASKETBALL'
			}
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
		// expect(container.find(HomeForm).props().auth).to.eql({
		// 	sport: 'BASKETBALL'
		// })
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

	// it('props.setNickname should be called', () => {
	// 	const fn = sinon.spy()
	// 	const wrapper = mount(<HomeForm submitNickname={fn} store={store} />)
	// 	wrapper.update()
	// 	wrapper.find('.nickname-button').simulate('click')
	// 	expect(fn.calledOnce).to.be.true
	// 	wrapper.unmount()
	// })
})
