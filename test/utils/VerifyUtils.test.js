import { expect } from 'chai'
import {
	calcOffsets,
	verifyConnection,
	verifyCreatorMessage,
	verifyGameMessageStart,
	verifyMemberCount,
	verifyMembers,
	verifyPlacement,
	verifyPlayerHandled,
	verifyPlayerMessage,
	verifyRoomName,
	verifyRotation,
	verifyUrl,
	verifyUsername
} from '../../src/client/utils'

describe('Verify Utils', () => {
	describe('verifyConnection', () => {
		it('returns true if users list and rooms list have been received after socket connection and user information has not been set', () => {
			let props = {
				connection: true,
				usersReceived: true,
				roomsReceived: true
			}
			let result = verifyConnection(props, false)
			expect(result).to.be.true
		})
		it('returns false if users list and rooms list have not been received after socket connection', () => {
			let props = {
				connection: true,
				usersReceived: false,
				roomsReceived: false
			}
			let result = verifyConnection(props, false)
			expect(result).to.be.false
		})
		it('returns false if user data has already been set', () => {
			let props = {
				connection: true,
				usersReceived: true,
				roomsReceived: true
			}
			let result = verifyConnection(props, true)
			expect(result).to.be.false
		})
	})
	describe('verifyPlayerHandled', () => {
		it('returns true if users and rooms lists have been received after socket connection and username is set but room is not', () => {
			let props = {
				connection: true,
				usersReceived: true,
				roomsReceived: true,
				usernameIsSet: true
			}
			let result = verifyPlayerHandled(props, true, false)
			expect(result).to.be.true
		})
		it('returns false if username is not set', () => {
			let props = {
				connection: true,
				usersReceived: true,
				roomsReceived: true,
				usernameIsSet: false
			}
			let result = verifyPlayerHandled(props, true, false)
			expect(result).to.be.false
		})
		it('returns false if userDone is not true', () => {
			let props = {
				connection: true,
				usersReceived: true,
				roomsReceived: true,
				usernameIsSet: true
			}
			let result = verifyPlayerHandled(props, false, false)
			expect(result).to.be.false
		})
		it('returns false if roomsDone is true', () => {
			let props = {
				connection: true,
				usersReceived: true,
				roomsReceived: true,
				usernameIsSet: true
			}
			let result = verifyPlayerHandled(props, true, true)
			expect(result).to.be.false
		})
	})
	describe('verifyCreatorMessage', () => {
		it('Checks to make sure the game creator gets proper start message by returning true', () => {
			let state = {
				message: '',
				msgStart: 'Press Space to Start',
				msgWaitPlayers: 'Or wait for more players',
				msgWaitCreator: 'Waiting for creator to start game',
				msgGameStarting: 'Game starting in 5...',
				interval: '',
				gameOver: false
			}
			let props = {
				countDown: false,
				userId: 'abc123',
				roomId: 'abc123'
			}
			let result = verifyCreatorMessage(props, state.message, state.msgStart)
			expect(result).to.be.true
		})
		it('returns false if criteria is not met', () => {
			let state = {
				message: '',
				msgStart: 'Press Space to Start',
				msgWaitPlayers: 'Or wait for more players',
				msgWaitCreator: 'Waiting for creator to start game',
				msgGameStarting: 'Game starting in 5...',
				interval: '',
				gameOver: false
			}
			let props = {
				countDown: false,
				userId: '123abc',
				roomId: 'abc123'
			}
			let result = verifyCreatorMessage(props, state.message, state.msgStart)
			expect(result).to.be.false
		})
	})
	describe('verifyPlayerMessage', () => {
		it('Checks to make sure the game player gets proper start message by returning true', () => {
			let state = {
				message: '',
				msgStart: 'Press Space to Start',
				msgWaitPlayers: 'Or wait for more players',
				msgWaitCreator: 'Waiting for creator to start game',
				msgGameStarting: 'Game starting in 5...',
				interval: '',
				gameOver: false
			}
			let props = {
				countDown: false,
				userId: '123abc',
				roomId: 'abc123'
			}
			let result = verifyPlayerMessage(props, state.message, state.msgStart)
			expect(result).to.be.true
		})
		it('returns false if criteria is not met', () => {
			let state = {
				message: '',
				msgStart: 'Press Space to Start',
				msgWaitPlayers: 'Or wait for more players',
				msgWaitCreator: 'Waiting for creator to start game',
				msgGameStarting: 'Game starting in 5...',
				interval: '',
				gameOver: false
			}
			let props = {
				countDown: true,
				userId: '123abc',
				roomId: 'abc123'
			}
			let result = verifyPlayerMessage(props, state.message, state.msgStart)
			expect(result).to.be.false
		})
		it('returns false if it is game creator', () => {
			let state = {
				message: '',
				msgStart: 'Press Space to Start',
				msgWaitPlayers: 'Or wait for more players',
				msgWaitCreator: 'Waiting for creator to start game',
				msgGameStarting: 'Game starting in 5...',
				interval: '',
				gameOver: false
			}
			let props = {
				countDown: false,
				userId: '123abc',
				roomId: '123abc'
			}
			let result = verifyPlayerMessage(props, state.message, state.msgStart)
			expect(result).to.be.false
		})
	})
	describe('verifyGameMessageStart', () => {
		it('it returns true if a countdown message has not already started', () => {
			let state = {
				message: '',
				msgStart: 'Press Space to Start',
				msgWaitPlayers: 'Or wait for more players',
				msgWaitCreator: 'Waiting for creator to start game',
				msgGameStarting: 'Game starting in 5...',
				interval: '',
				gameOver: false
			}
			let result = verifyGameMessageStart(state)
			expect(result).to.be.true
		})
		it('it returns false if a countdown message has already started', () => {
			let state = {
				message: 'Game starting in 5...',
				msgStart: 'Press Space to Start',
				msgWaitPlayers: 'Or wait for more players',
				msgWaitCreator: 'Waiting for creator to start game',
				msgGameStarting: 'Game starting in 5...',
				interval: '',
				gameOver: false
			}
			let result = verifyGameMessageStart(state)
			expect(result).to.be.false
		})
	})
	describe('verifyMemberCount', () => {
		const rooms = [
			{
				roomName: 'Danger Room',
				members: ['john', 'paul', 'george', 'ringo']
			},
			{
				roomName: 'Mee Room',
				members: ['Oliver', 'Jen', 'Alex', 'Juliana', 'Nick', 'Josie']
			},
			{
				roomName: 'Boys Room',
				members: ['Dan', 'Yohann', 'Armon', 'Paul', 'Thomas']
			}
		]
		it('returns true if there are less than 5 members in a room', () => {
			const result = verifyMemberCount(rooms, 'Danger Room')
			expect(result).to.be.true
		})
		it('returns false if there are 5 or more members in a room', () => {
			const result1 = verifyMemberCount(rooms, 'Mee Room')
			const result2 = verifyMemberCount(rooms, 'Boys Room')
			expect(result1).to.be.false
			expect(result2).to.be.false
		})
	})

	describe('verifyMembers', () => {
		const username1 = 'nick'
		const username2 = 'paul'
		const rooms = [
			{
				roomName: 'Danger Room',
				members: ['john', 'paul', 'george', 'ringo']
			}
		]
		it('returns true if there is no member with same name', () => {
			const result = verifyMembers(username1, 'Danger Room', rooms)
			expect(result).to.be.true
		})
		it('returns false if there is already a member with same name', () => {
			const result = verifyMembers(username2, 'Danger Room', rooms)
			expect(result).to.be.false
		})
	})

	describe('verifyRoomName', () => {
		const rooms = [
			{
				roomName: 'Danger Room',
				members: ['john', 'paul', 'george', 'ringo']
			}
		]
		it('returns true if there is no room with same name', () => {
			const result = verifyRoomName('Cool Room', rooms)
			expect(result).to.be.true
		})
		it('returns false if there is already a room with same name', () => {
			const result = verifyRoomName('Danger Room', rooms)
			expect(result).to.be.false
		})
	})

	describe('verifyUsername', () => {
		const users = [{ username: 'paul', id: 0 }, { username: 'jen', id: 1 }]
		it('returns true if there is no user with same name', () => {
			const result = verifyUsername('rick', users)
			expect(result).to.be.true
		})
		it('returns false if there is already a user with same name', () => {
			const result = verifyUsername('paul', users)
			expect(result).to.be.false
		})
	})

	describe('verifyUrl', () => {
		const urlGood = 'Todd_Room[Todd_Man]'
		const urlBad1 = 'Todd_RoomTodd_Man]'
		const urlBad2 = 'Todd_Room[Todd_Man'
		const urlBad3 = 'Todd_Room[Todd_Man]hello'
		let result

		describe('verifies the structure of the join game url', () => {
			it('returns false if missing "["', () => {
				result = verifyUrl(urlBad1)
				expect(result).to.be.false
			})
			it('returns false if missing "]"', () => {
				result = verifyUrl(urlBad2)
				expect(result).to.be.false
			})
			it('returns false if url does not end with "]"', () => {
				result = verifyUrl(urlBad3)
				expect(result).to.be.false
			})
			it('returns true if all criteria met', () => {
				let test = verifyUrl(urlGood)
				expect(test).to.be.true
			})
		})
	})
	describe('verifyPlacement', () => {
		let savedBoard = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 'z', 0, 0, 0, 0],
			['z', 'z', 0, 0, 0, 'z', 'z', 0, 0, 0, 0],
			[0, 'z', 'z', 0, 0, 'z', 'l', 0, 't', 0, 0],
			['i', 'i', 'i', 'i', 'l', 'l', 'l', 't', 't', 't', 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		]
		it('it returns true if the potential piece location will not go over another piece', () => {
			let piece = {
				position: 0,
				piece: 'o',
				shape: [
					[0, 0, 0, 0],
					[0, 'o', 'o', 0],
					[0, 'o', 'o', 0],
					[0, 0, 0, 0]
				],
				location: { x: 2, y: 6 }
			}
			let result = verifyPlacement(
				piece.location,
				piece.shape,
				savedBoard,
				piece
			)
			expect(result).to.be.true
		})
		it('it returns true if the saved board is empty (start of new game)', () => {
			let piece = {
				position: 0,
				piece: 'o',
				shape: [
					[0, 0, 0, 0],
					[0, 'o', 'o', 0],
					[0, 'o', 'o', 0],
					[0, 0, 0, 0]
				],
				location: { x: 2, y: 6 }
			}
			let result = verifyPlacement(piece.location, piece.shape, [], piece)
			expect(result).to.be.true
		})
		it('it returns false if potential piece placement will go over another piece', () => {
			let piece = {
				position: 0,
				piece: 'o',
				shape: [
					[0, 0, 0, 0],
					[0, 'o', 'o', 0],
					[0, 'o', 'o', 0],
					[0, 0, 0, 0]
				],
				location: { x: 5, y: 18 },
				prevPiece: 'i'
			}
			let result = verifyPlacement(
				piece.location,
				piece.shape,
				savedBoard,
				piece
			)
			expect(result).to.be.false
		})
	})
	describe('verifyRotation', () => {
		let savedBoard = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 'z', 0, 0, 0, 0],
			['z', 'z', 0, 0, 0, 'z', 'z', 0, 0, 0, 0],
			[0, 'z', 'z', 0, 0, 'z', 'l', 0, 't', 0, 0],
			['i', 'i', 'i', 'i', 'l', 'l', 'l', 't', 't', 't', 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		]
		it('returns true if potential rotation will not go over border or another piece', () => {
			let piece = {
				piece: 'i',
				position: 0,
				shape: [
					[0, 0, 0, 0],
					['i', 'i', 'i', 'i'],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				],
				location: { x: 5, y: 5 },
				prevPiece: 'o'
			}
			let offsets = calcOffsets(piece.shape, piece.piece)
			let result = verifyRotation(
				piece.location,
				piece,
				offsets,
				savedBoard,
				piece
			)
			expect(result).to.be.true
		})
		it('returns false if potential rotation will go over border', () => {
			let piece = {
				piece: 'i',
				position: 0,
				shape: [
					[0, 0, 0, 0],
					['i', 'i', 'i', 'i'],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				],
				location: { x: 8, y: 5 },
				prevPiece: 'o'
			}
			let offsets = calcOffsets(piece.shape, piece.piece)
			let result = verifyRotation(
				piece.location,
				piece,
				offsets,
				savedBoard,
				piece
			)
			expect(result).to.be.false
		})
		it('returns false if potential rotation will go over border', () => {
			let piece = {
				piece: 'i',
				position: 0,
				shape: [
					[0, 0, 0, 0],
					['i', 'i', 'i', 'i'],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				],
				location: { x: 5, y: 19 },
				prevPiece: 'o'
			}
			let offsets = calcOffsets(piece.shape, piece.piece)
			let result = verifyRotation(
				piece.location,
				piece,
				offsets,
				savedBoard,
				piece
			)
			expect(result).to.be.false
		})
	})
})
