import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
const mockStore = configureMockStore()
// import { JSDOM } from 'jsdom'
// const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>')

// global.window = dom.window
// global.document = dom.window.document
import Home from '../../src/components/home/Home'

describe('Home', () => {
	// let props
	let mountedHome, store
	const initialState = {
		lastRolledNumber: 1
	}
	store = mockStore(initialState)
	const home = () => {
		if (!mountedHome) {
			mountedHome = mount(<Home />)
		}
		return mountedHome
	}

	beforeEach(() => {
		// props = {
		// 	wallpaperPath: undefined,
		// 	userInfoMessage: undefined,
		// 	onUnlocked: undefined
		// }
		mountedHome = undefined
	})

	it('always renders a div', () => {
		const divs = home().find('div')
		expect(divs.length).to.be.above(0)
	})
})