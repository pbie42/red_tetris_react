import React from 'react'
import sinon from 'sinon'
import configureMockStore from 'redux-mock-store'
import { expect } from 'chai'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'

import {
	GameContainer,
	mapDispatchToProps
} from '../../src/client/containers/game/GameContainer'
import GameComponent from '../../src/client/components/game/GameComponent'
import * as actions from '../../src/client/actions'

const mockStore = configureMockStore()

describe('Game', () => {
	let store
	beforeEach(() => {
		store = mockStore({
			user: {},
			users: []
		})
	})

	it('', () => {
		it('should render the container component', () => {
			const wrapper = mount(
				<Provider store={store}>
					<GameContainer />
				</Provider>
			)

			expect(wrapper.find(GameContainer).length).to.equal(1)
			const container = wrapper.find(HomeForm)
			expect(container.find(GameComponent).length).to.equal(1)
			wrapper.unmount()
		})
	})
})
