import { expect } from 'chai'
import { setNickname, addUser } from '../../src/client/actions'

describe('Actions', () => {
	it('setNickname returns an object for the set nickname action', () => {
		const nickname = 'pbie'
		const setNicknameAction = setNickname(nickname)
		expect(setNicknameAction).to.eql({
			type: 'SET_NICKNAME',
			nickname: 'pbie'
		})
	})

	it('addUser returns an object for the add user action', () => {
		const nickname = 'pbie'
		const addUserAction = addUser(nickname)
		expect(addUserAction).to.eql({
			type: 'ADD_USER',
			id: 0,
			name: 'pbie'
		})
	})
})
