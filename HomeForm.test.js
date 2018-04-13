import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { expect } from 'chai'
import { Form } from '../../src/containers/home/Form'
import configureMockStore from 'redux-mock-store'
const mockStore = configureMockStore()

describe('FormHome', () => {
	let wrapper, store

	beforeEach(() => {
		const initialState = {
			lastRolledNumber: 1
		}
		store = mockStore(initialState)
		wrapper = mount(
			<Provider store={store}>
				<Form />
			</Provider>
		)
	})

	it('should show previously rolled value', () => {
		expect(wrapper.props().lastRolledNumber).to.equal(1)
	})

	it('should roll the dice again when button is clicked', () => {
		wrapper.simulate('rollDice')

		const actions = store.getActions()
		expect(actions).to.equal([{ type: 'ROLL_DICE' }])
	})
})
