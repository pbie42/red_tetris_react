import { expect } from 'chai'
import {
	gameBoardUpdate,
	gameBoardsUpdate,
	gameClear,
	gameJoined,
	gameMembersUpdate,
	gameNewPiece,
	gameNewPieces,
	gamePieceUpdate,
	gamePiecesUpdate,
	gameRoomSet,
	gameSetId
} from '../../src/client/actions'

describe('Game Actions', () => {
	let id = 'dafjh9238kida'
	let username = 'Todd'
	let roomName = 'Todd Room'
	let board = [
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
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 't', 0, 0, 0, 0, 0, 0],
		[0, 0, 't', 't', 't', 0, 0, 0, 0, 0]
	]

	it('gameBoardUpdate returns an object for updating a users board during game play', () => {
		const gameBoardUpdateAction = gameBoardUpdate(
			board,
			id,
			roomName,
			username
		)
		expect(gameBoardUpdateAction).to.eql({
			type: 'GAME_BOARD_UPDATE',
			board,
			id,
			roomName,
			username
		})
	})

	it('gameBoardsUpdate returns an object for updating other users boards during game play', () => {
		const gameBoardsUpdateAction = gameBoardsUpdate([board, board])
		expect(gameBoardsUpdateAction).to.eql({
			type: 'GAME_BOARDS_UPDATE',
			boards: [board, board]
		})
	})

	it('gameClear returns a type that will clear all front state data relating to the users previous game', () => {
		const gameClearAction = gameClear([board, board])
		expect(gameClearAction).to.eql({ type: 'GAME_CLEAR' })
	})

	it('gameJoined returns an object with the name of the room joined', () => {
		const gameJoinedAction = gameJoined(roomName)
		expect(gameJoinedAction).to.eql({ type: 'GAME_JOINED', roomName })
	})

	it('gameMembersUpdate returns an object with the current members in a room', () => {
		let members = ['Paul', 'John', 'George', 'Ringo']
		const gameMembersUpdateAction = gameMembersUpdate(members)
		expect(gameMembersUpdateAction).to.eql({
			type: 'GAME_MEMBERS_UPDATE',
			members
		})
	})

	it('gameMembersUpdate returns an object with the current members in a room', () => {
		let members = ['Paul', 'John', 'George', 'Ringo']
		const gameMembersUpdateAction = gameMembersUpdate(members)
		expect(gameMembersUpdateAction).to.eql({
			type: 'GAME_MEMBERS_UPDATE',
			members
		})
	})

	it('gameNewPiece returns an object to request a new piece for a specific user', () => {
		const gameNewPieceAction = gameNewPiece(id, roomName, username)
		expect(gameNewPieceAction).to.eql({
			type: 'GAME_NEW_PIECE',
			id,
			roomName,
			username
		})
	})

	it('gameNewPieces returns an object to request a new series of pieces when the current series is almost done', () => {
		const gameNewPiecesAction = gameNewPieces(id, roomName)
		expect(gameNewPiecesAction).to.eql({
			type: 'GAME_NEW_PIECES',
			id,
			roomName
		})
	})

	it('gamePieceUpdate returns an object with the new piece', () => {
		const gamePieceUpdateAction = gamePieceUpdate('i')
		expect(gamePieceUpdateAction).to.eql({
			type: 'GAME_PIECE_UPDATE',
			piece: 'i'
		})
	})

	it('gamePiecesUpdate returns an object with an array of new pieces', () => {
		let pieces = ['i', 'z', 't', 't', 'l']
		const gamePiecesUpdateAction = gamePiecesUpdate(pieces)
		expect(gamePiecesUpdateAction).to.eql({
			type: 'GAME_PIECES_UPDATE',
			pieces
		})
	})

	it('gameRoomSet returns an object with game room to set front state', () => {
		const gameRoomSetAction = gameRoomSet(roomName)
		expect(gameRoomSetAction).to.eql({
			type: 'GAME_ROOM_SET',
			roomName
		})
	})

	// it('gameSetId returns an object with game room to set front state', () => {
	// 	const gameSetIdAction = gameSetId(roomName)
	// 	expect(gameSetIdAction).to.eql({
	// 		type: 'GAME_ROOM_SET',
	// 		roomName
	// 	})
	// })
})
