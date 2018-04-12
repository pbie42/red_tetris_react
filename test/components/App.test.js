import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import App from '../../src/App.js'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>')

global.window = dom.window
global.document = dom.window.document
// import { store } from '../index'

describe('App', () => {
	let mountedApp
	const app = () => {
		if (!mountedApp) {
			mountedApp = mount(
				<MemoryRouter>
					<App />
				</MemoryRouter>
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
		const divs = app().find('div')
		expect(divs.length).to.be.above(0)
	})
})

// it('renders without crashing', () => {
// 	const div = document.createElement('div')
// 	ReactDOM.render(<App />, div)
// 	ReactDOM.unmountComponentAtNode(div)
// })
