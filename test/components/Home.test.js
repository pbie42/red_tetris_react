import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import React from 'react'
import { expect } from 'chai'
import { mount, ShallowWrapper, shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
const mockStore = configureMockStore()
// import { JSDOM } from 'jsdom'
// const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>')

// global.window = dom.window
// global.document = dom.window.document
import Home from '../../src/client/components/home/Home'
import { HomeFormContainer } from '../../src/client/containers/home/HomeForm'
import HomeForm from '../../src/client/components/home/HomeForm'

describe('Home', () => {
	let mountedHome, store
	const initialState = {
		user: {},
		users: []
	}
	store = mockStore(initialState)

	it('always renders a div', () => {
		mountedHome = mount(
			<Provider store={store}>
				<Home />
			</Provider>
		)
		const divs = mountedHome.find('div')
		expect(divs.length).to.be.gt(0)
		mountedHome.unmount()
		mountedHome = undefined
	})

	it('has a HomeForm container component', () => {
		mountedHome = mount(
			<Provider store={store}>
				<Home />
			</Provider>
		)
		expect(mountedHome.find(HomeFormContainer).length).to.equal(1)
		mountedHome.unmount()
		mountedHome = undefined
	})
})
