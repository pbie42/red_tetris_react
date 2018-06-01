import { expect } from 'chai'
import games from '../../src/client/reducers/games'

let boards = [
	[
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		['i', 0, 0, 0, 0, 0, 0, 0, 0, 0],
		['i', 0, 0, 0, 0, 0, 0, 0, 0, 0],
		['i', 0, 0, 't', 0, 0, 0, 0, 0, 0],
		['i', 0, 't', 't', 't', 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 'i'],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 'i'],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 'i'],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 'i'],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 't', 0, 0, 0, 0, 0, 0],
		[0, 0, 't', 't', 't', 0, 0, 0, 0, 0]
	]
]

let members = ['John', 'Paul', 'George', 'Ringo']

describe('Game Reducers', () => {
	const initialGameState = {
		roomName: '',
		piece: '',
		pieces: [],
		members: [],
		boards: [],
		id: '',
		countDown: false
	}
	it('adds boards to game state', () => {
		const updatedState = games(initialGameState, {
			type: 'GAME_BOARDS_UPDATE',
			boards
		})
		expect(updatedState.boards).to.eql(boards)
	})
	it('adds returns state on GAME_BOARD_UPDATE', () => {
		const updatedState = games(initialGameState, {
			type: 'GAME_BOARD_UPDATE'
		})
		expect(updatedState).to.eql(initialGameState)
	})
	it("sets game state back to it's initial state", () => {
		const exampleGameState = {
			roomName: 'Todd Room',
			piece: 'i',
			pieces: [],
			members,
			boards,
			id: '4525345dsa',
			countDown: false
		}
		const updatedState = games(exampleGameState, {
			type: 'GAME_CLEAR'
		})
		expect(updatedState).to.eql(initialGameState)
	})
	it('sets the game id', () => {
		const updatedState = games(initialGameState, {
			type: 'GAME_ID_SET',
			id: 'erf53d54rfa'
		})
		expect(updatedState.id).to.equal('erf53d54rfa')
	})
	it('returns state on GAME_JOINED', () => {
		const updatedState = games(initialGameState, {
			type: 'GAME_JOINED'
		})
		expect(updatedState).to.eql(initialGameState)
	})
	it('updates the members of the game', () => {
		const updatedState = games(initialGameState, {
			type: 'GAME_MEMBERS_UPDATE',
			members
		})
		expect(updatedState.members).to.eql(members)
	})
	it('returns state on GAME_NEW_PIECE', () => {
		const updatedState = games(initialGameState, {
			type: 'GAME_NEW_PIECE'
		})
		expect(updatedState).to.eql(initialGameState)
	})
	it('returns state on GAME_NEW_PIECES', () => {
		const updatedState = games(initialGameState, {
			type: 'GAME_NEW_PIECES'
		})
		expect(updatedState).to.eql(initialGameState)
	})
	it('returns state on GAME_START', () => {
		const updatedState = games(initialGameState, {
			type: 'GAME_START'
		})
		expect(updatedState).to.eql(initialGameState)
	})
	it('updates the piece', () => {
		const updatedState = games(initialGameState, {
			type: 'GAME_PIECE_UPDATE',
			piece: 'i'
		})
		expect(updatedState.piece).to.equal('i')
	})
	it('updates the pieces', () => {
		const updatedState = games(initialGameState, {
			type: 'GAME_PIECES_UPDATE',
			pieces: ['i', 'z', 't', 'i']
		})
		expect(updatedState.pieces).to.eql(['i', 'z', 't', 'i'])
	})
	it('sets countdown to false', () => {
		const updatedState = games(
			{ countDown: true },
			{ type: 'GAME_STOP_COUNTDOWN' }
		)
		expect(updatedState.countDown).to.be.false
	})
	it('sets countdown to true', () => {
		const updatedState = games(initialGameState, {
			type: 'GAME_START_COUNTDOWN'
		})
		expect(updatedState.countDown).to.be.true
	})
	it('sets roomName', () => {
		const updatedState = games(initialGameState, {
			type: 'GAME_ROOM_SET',
			roomName: 'Todd Room'
		})
		expect(updatedState.roomName).to.equal('Todd Room')
	})
	it('returns initial state if no state is given', () => {
		const action = {
			type: 'TEST_ACTION',
			username: 'jennzmee'
		}
		const state = games(undefined, action)
		expect(state).to.eql(initialGameState)
	})
	it('returns state if no action is given', () => {
		const updatedState = games(initialGameState, undefined)
		expect(updatedState).to.eql(initialGameState)
	})
})
