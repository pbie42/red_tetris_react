import { expect } from 'chai'
import { setNickname } from '../../src/actions'

describe('Actions', () => {
	it('setNickname returns an object for the set nickname action', () => {
		const nickname = 'pbie'
		const setNicknameAction = setNickname(nickname)
		expect(setNicknameAction).to.eql({
			type: 'SET_NICKNAME',
			nickname: 'pbie'
		})
	})
})
