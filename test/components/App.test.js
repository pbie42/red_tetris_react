import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import App from '../../src/client/App.js'
import Home from '../../src/client/components/home/HomeComponent'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { JSDOM } from 'jsdom'
import configureMockStore from 'redux-mock-store'
const mockStore = configureMockStore()
const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>')

global.window = dom.window
global.document = dom.window.document
// import { store } from '../index'

describe('App', () => {
	let mountedApp, store
	const initialState = {
		user: {},
		users: []
	}
	store = mockStore(initialState)

	const appRouteHome = () => {
		if (!mountedApp) {
			mountedApp = mount(
				<Provider store={store}>
					<MemoryRouter initialEntries={['/']}>
						<App />
					</MemoryRouter>
				</Provider>
			)
		}
		return mountedApp
	}

	beforeEach(() => {
		// props = {
		// 	wallpaperPath: undefined,
		// 	userInfoMessage: undefined,
		// 	onUnlocked: undefined
		// }
		mountedApp = undefined
	})

	it('always renders a div', () => {
		const divs = appRouteHome().find('div')
		expect(divs.length).to.be.above(0)
	})

	it('renders valid path to home from "/"', () => {
		const home = appRouteHome().find(Home)
		expect(home.length).to.be.above(0)
	})
})

// xit('renders without crashing', () => {
// 	const div = document.createElement('div')
// 	ReactDOM.render(<App />, div)
// 	ReactDOM.unmountComponentAtNode(div)
// })
