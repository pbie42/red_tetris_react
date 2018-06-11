import { expect } from 'chai'
import {
	calcOffsets,
	handleStatePiece,
	movePieceDown,
	movePieceLeft,
	movePieceRight,
	positionsI,
	positionsJ,
	positionsL,
	positionsO,
	positionsS,
	positionsT,
	positionsZ,
	rotatePiece,
	rotatePieces,
	setupLocations,
	tryRotations,
	verifyRotation
} from '../../src/client/utils'

describe('Movement Utils', () => {
	let shape = [[0, 0, 0, 0], [0, 0, 0, 0], ['i', 'i', 'i', 'i'], [0, 0, 0, 0]]
	describe('movePieceRight', () => {
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
		it('returns new location coordinates if the piece can move right', () => {
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
				prevPiece: 'o',
				set: false
			}
			let location = movePieceRight(piece, savedBoard)
			expect(location).to.eql({ x: 6, y: 5 })
		})
		it('returns previous location coordinates if the piece can not move right because a piece will be in the way', () => {
			let piece = {
				piece: 'i',
				position: 0,
				shape: [
					[0, 0, 0, 0],
					['i', 'i', 'i', 'i'],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				],
				location: { x: 2, y: 19 },
				prevPiece: 'o',
				set: false
			}
			let location = movePieceRight(piece, savedBoard)
			expect(location).to.eql({ x: 2, y: 19 })
		})
		it('returns previous location coordinates if the piece can not move right because of the border', () => {
			let piece = {
				piece: 'i',
				position: 0,
				shape: [
					[0, 0, 0, 0],
					['i', 'i', 'i', 'i'],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				],
				location: { x: 6, y: 18 },
				prevPiece: 'o',
				set: false
			}
			let location = movePieceRight(piece, savedBoard)
			expect(location).to.eql({ x: 6, y: 18 })
		})
	})
	describe('movePieceLeft', () => {
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
			[0, 0, 'i', 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 'i', 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 'i', 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 'i', 0, 0, 0, 'z', 0, 0, 0, 0],
			['z', 'z', 0, 0, 0, 'z', 'z', 0, 0, 0, 0],
			[0, 'z', 'z', 0, 0, 'z', 'l', 0, 't', 0, 0],
			['i', 'i', 'i', 'i', 'l', 'l', 'l', 't', 't', 't', 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		]
		it('returns new location coordinates if the piece can move left', () => {
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
				prevPiece: 'o',
				set: false
			}
			let location = movePieceLeft(piece, savedBoard)
			expect(location).to.eql({ x: 4, y: 5 })
		})
		it('returns previous location coordinates if the piece can not move left because a piece will be in the way', () => {
			let piece = {
				piece: 'i',
				position: 0,
				shape: [
					[0, 0, 0, 0],
					['i', 'i', 'i', 'i'],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				],
				location: { x: 3, y: 18 },
				prevPiece: 'o',
				set: false
			}
			let location = movePieceLeft(piece, savedBoard)
			expect(location).to.eql({ x: 3, y: 18 })
		})
		it('returns previous location coordinates if the piece can not move left because of the border', () => {
			let piece = {
				piece: 'i',
				position: 0,
				shape: [
					[0, 0, 0, 0],
					['i', 'i', 'i', 'i'],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				],
				location: { x: 0, y: 10 },
				prevPiece: 'o',
				set: false
			}
			let location = movePieceLeft(piece, savedBoard)
			expect(location).to.eql({ x: 0, y: 10 })
		})
	})
	describe('movePieceDown', () => {
		it('returns new location coordinates if the piece can move down', () => {
			let board = [
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
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 'z', 'z', 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 'z', 'z', 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
			let piece = {
				location: { x: 3, y: 20 },
				shape: [
					[0, 0, 0, 0],
					['z', 'z', 0, 0],
					[0, 'z', 'z', 0],
					[0, 0, 0, 0]
				],
				piece: 'z',
				position: 0,
				set: false
			}
			let savedBoard = []
			let result = movePieceDown(piece, board, savedBoard)
			expect(result.newLocation).to.eql({ x: 3, y: 21 })
			expect(result.set).to.be.false
			expect(result.gameOverCheck).to.be.false
			expect(result.newPiece).to.be.false
			expect(result.savedBoard).to.eql([])
		})
		it('returns previous location coordinates if the piece can not move down further because it is at the bottom', () => {
			let board = [
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
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 'z', 'z', 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 'z', 'z', 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
			let piece = {
				location: { x: 3, y: 21 },
				shape: [
					[0, 0, 0, 0],
					['z', 'z', 0, 0],
					[0, 'z', 'z', 0],
					[0, 0, 0, 0]
				],
				piece: 'z',
				position: 0,
				set: false
			}
			let savedBoard = []
			let result = movePieceDown(piece, board, savedBoard)
			expect(result.newLocation).to.eql({ x: 3, y: 21 })
			expect(result.set).to.be.false
			expect(result.gameOverCheck).to.be.false
			expect(result.newPiece).to.be.true
			expect(result.savedBoard).to.eql(board)
		})
		it('returns previous location coordinates if the piece can not move down because a piece will be in the way', () => {
			let board = [
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
				[0, 0, 0, 0, 'j', 'j', 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 'j', 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 'j', 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 'l', 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 'l', 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 'l', 'l', 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
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
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 'l', 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 'l', 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 'l', 'l', 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
			let piece = {
				location: { x: 3, y: 17 },
				shape: [
					[0, 0, 0, 0],
					[0, 'j', 'j', 0],
					[0, 'j', 0, 0],
					[0, 'j', 0, 0]
				],
				piece: 'j',
				position: 1,
				set: false
			}
			let result = movePieceDown(piece, board, savedBoard)
			expect(result.newLocation).to.eql({ x: 3, y: 17 })
			expect(result.set).to.be.true
			expect(result.gameOverCheck).to.be.false
			expect(result.newPiece).to.be.false
			expect(result.savedBoard).to.eql(board)
		})
	})
	describe('setupLocations', () => {
		let location = { x: 5, y: 5 }
		it('returns potential new locations for rotation positions based on piece current location', () => {
			let result = setupLocations(location)
			expect(result.locations.length).to.equal(3)
			expect(result.locationsI.length).to.equal(2)
			expect(result.locations[0]).to.eql(location)
			expect(result.locations[1]).to.eql({
				x: location.x + 1,
				y: location.y
			})
			expect(result.locations[2]).to.eql({
				x: location.x - 1,
				y: location.y
			})
			expect(result.locationsI[0]).to.eql({
				x: location.x + 2,
				y: location.y
			})
			expect(result.locationsI[1]).to.eql({
				x: location.x - 2,
				y: location.y
			})
		})
	})
	describe('tryRotations', () => {
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
			[0, 0, 'i', 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 'i', 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 'i', 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 'i', 0, 0, 0, 'z', 0, 0, 0, 0],
			['z', 'z', 0, 0, 0, 'z', 'z', 0, 0, 0, 0],
			[0, 'z', 'z', 0, 0, 'z', 'l', 0, 't', 0, 0],
			['i', 'i', 'i', 'i', 'l', 'l', 'l', 't', 't', 't', 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		]
		it('returns true with new location if the piece can rotate', () => {
			let piece = {
				location: { x: 3, y: 5 },
				shape: [
					[0, 0, 0, 0],
					['z', 'z', 0, 0],
					[0, 'z', 'z', 0],
					[0, 0, 0, 0]
				],
				piece: 'z',
				position: 0,
				set: false
			}
			let newPos = positionsZ[1]
			let offset = calcOffsets(newPos.shape, piece.piece)
			let locations = setupLocations(piece.location)
			let result = tryRotations(
				locations.locations,
				newPos,
				offset,
				savedBoard,
				piece
			)
			expect(result.success).to.be.true
			expect(result.newLocation).to.eql(piece.location)
		})
		it('returns false with empty location object if the piece can not rotate', () => {
			let piece = {
				location: { x: 1, y: 16 },
				position: 3,
				shape: [
					[0, 'i', 0, 0],
					[0, 'i', 0, 0],
					[0, 'i', 0, 0],
					[0, 'i', 0, 0]
				],
				piece: 'z',
				set: false
			}
			let newPos = positionsI[0]
			let offset = calcOffsets(newPos.shape, piece.piece)
			let locations = setupLocations(piece.location)
			let result = tryRotations(
				locations.locations,
				newPos,
				offset,
				savedBoard,
				piece
			)
			expect(result.success).to.be.false
			expect(result.newLocation).to.eql({})
		})
	})
	describe('rotatePiece', () => {
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
			[0, 0, 'i', 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 'i', 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 'i', 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 'i', 0, 0, 0, 'z', 0, 0, 0, 0],
			['z', 'z', 0, 0, 0, 'z', 'z', 0, 0, 0, 0],
			[0, 'z', 'z', 0, 0, 'z', 'l', 0, 't', 0, 0],
			['i', 'i', 'i', 'i', 'l', 'l', 'l', 't', 't', 't', 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		]
		it('returns success true with a new pos and location if the piece was able to rotate', () => {
			let piece = {
				location: { x: 3, y: 5 },
				shape: [
					[0, 0, 0, 0],
					['z', 'z', 0, 0],
					[0, 'z', 'z', 0],
					[0, 0, 0, 0]
				],
				piece: 'z',
				position: 0,
				set: false
			}
			let result = rotatePiece(positionsZ, savedBoard, piece)
			expect(result.success).to.be.true
			expect(result.newPos).to.eql(positionsZ[1])
			expect(result.index).to.equal(1)
			expect(result.newLoc).to.eql(piece.location)
		})
		it('returns success false if the rotation would not work', () => {
			let piece = {
				location: { x: 1, y: 16 },
				position: 3,
				shape: [
					[0, 'i', 0, 0],
					[0, 'i', 0, 0],
					[0, 'i', 0, 0],
					[0, 'i', 0, 0]
				],
				piece: 'z',
				set: false
			}
			let result = rotatePiece(positionsI, savedBoard, piece)
			expect(result.success).to.be.false
			expect(result.newPos).to.eql(positionsI[0])
			expect(result.index).to.equal(0)
			expect(result.newLoc).to.eql({})
		})
		it('returns success true on second try with i piece', () => {
			let iBoard = [
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
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				['o', 'o', 0, 0, 'l', 0, 't', 0, 'o', 'o', 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
			let piece = {
				location: { x: -2, y: 10 },
				shape: [
					[0, 0, 'i', 0],
					[0, 0, 'i', 0],
					[0, 0, 'i', 0],
					[0, 0, 'i', 0]
				],
				piece: 'i',
				position: 1,
				set: false
			}
			let result = rotatePiece(positionsI, iBoard, piece)
			expect(result.success).to.be.true
			expect(result.newPos).to.eql(positionsI[2])
			expect(result.index).to.equal(2)
			expect(result.newLoc).to.eql({ x: 0, y: 10 })
		})
	})
	describe('handleStatePiece', () => {
		it('takes the current piece state and updates it with rotation results from rotatePiece', () => {
			let iBoard = [
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
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				['o', 'o', 0, 0, 'l', 0, 't', 0, 'o', 'o', 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
			let piece = {
				location: { x: -2, y: 10 },
				shape: [
					[0, 0, 'i', 0],
					[0, 0, 'i', 0],
					[0, 0, 'i', 0],
					[0, 0, 'i', 0]
				],
				piece: 'i',
				position: 1,
				set: false
			}
			let result = rotatePiece(positionsI, iBoard, piece)
			let newPieceState = handleStatePiece(piece, result)
			expect(newPieceState.success).to.be.true
			expect(newPieceState.statePiece).to.eql({
				location: { x: 0, y: 10 },
				piece: 'i',
				position: 2,
				shape: [
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					['i', 'i', 'i', 'i'],
					[0, 0, 0, 0]
				],
				set: false
			})
		})
		it('returns success false and an unchanged piece state if rotation is not successfull', () => {
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
				[0, 0, 'i', 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 'i', 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 'i', 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 'i', 0, 0, 0, 'z', 0, 0, 0, 0],
				['z', 'z', 0, 0, 0, 'z', 'z', 0, 0, 0, 0],
				[0, 'z', 'z', 0, 0, 'z', 'l', 0, 't', 0, 0],
				['i', 'i', 'i', 'i', 'l', 'l', 'l', 't', 't', 't', 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
			let piece = {
				location: { x: 1, y: 16 },
				position: 3,
				shape: [
					[0, 'i', 0, 0],
					[0, 'i', 0, 0],
					[0, 'i', 0, 0],
					[0, 'i', 0, 0]
				],
				piece: 'z',
				set: false
			}
			let result = rotatePiece(positionsI, savedBoard, piece)
			let newPieceState = handleStatePiece(piece, result)
			expect(newPieceState.success).to.be.false
			expect(newPieceState.statePiece).to.eql(piece)
		})
	})
	describe('rotatePieces', () => {
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
			[0, 0, 'i', 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 'i', 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 'i', 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 'i', 0, 0, 0, 'z', 0, 0, 0, 0],
			['z', 'z', 0, 0, 0, 'z', 'z', 0, 0, 0, 0],
			[0, 'z', 'z', 0, 0, 'z', 'l', 0, 't', 0, 0],
			['i', 'i', 'i', 'i', 'l', 'l', 'l', 't', 't', 't', 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		]
		it('returns updated piece state for I rotation', () => {
			let statePiece = {
				location: { x: 3, y: 5 },
				position: 2,
				shape: positionsI[2].shape,
				piece: 'i',
				set: false
			}
			let result = rotatePieces(statePiece, savedBoard)
			expect(result.success).to.be.true
			expect(result.statePiece).to.eql({
				location: { x: 3, y: 5 },
				position: 3,
				shape: positionsI[3].shape,
				piece: 'i',
				set: false
			})
		})
		it('returns updated piece state for J rotation', () => {
			let statePiece = {
				location: { x: 3, y: 5 },
				position: 2,
				shape: positionsJ[2].shape,
				piece: 'j',
				set: false
			}
			let result = rotatePieces(statePiece, savedBoard)
			expect(result.success).to.be.true
			expect(result.statePiece).to.eql({
				location: { x: 3, y: 5 },
				position: 3,
				shape: positionsJ[3].shape,
				piece: 'j',
				set: false
			})
		})
		it('returns updated piece state for L rotation', () => {
			let statePiece = {
				location: { x: 3, y: 5 },
				position: 2,
				shape: positionsL[2].shape,
				piece: 'l',
				set: false
			}
			let result = rotatePieces(statePiece, savedBoard)
			expect(result.success).to.be.true
			expect(result.statePiece).to.eql({
				location: { x: 3, y: 5 },
				position: 3,
				shape: positionsL[3].shape,
				piece: 'l',
				set: false
			})
		})
		it('returns updated piece state for O rotation', () => {
			let statePiece = {
				location: { x: 3, y: 5 },
				position: 2,
				shape: positionsO[2].shape,
				piece: 'o',
				set: false
			}
			let result = rotatePieces(statePiece, savedBoard)
			expect(result.success).to.be.true
			expect(result.statePiece).to.eql({
				location: { x: 3, y: 5 },
				position: 3,
				shape: positionsO[3].shape,
				piece: 'o',
				set: false
			})
		})
		it('returns updated piece state for S rotation', () => {
			let statePiece = {
				location: { x: 3, y: 5 },
				position: 2,
				shape: positionsS[2].shape,
				piece: 's',
				set: false
			}
			let result = rotatePieces(statePiece, savedBoard)
			expect(result.success).to.be.true
			expect(result.statePiece).to.eql({
				location: { x: 3, y: 5 },
				position: 3,
				shape: positionsS[3].shape,
				piece: 's',
				set: false
			})
		})
		it('returns updated piece state for T rotation', () => {
			let statePiece = {
				location: { x: 3, y: 5 },
				position: 2,
				shape: positionsT[2].shape,
				piece: 't',
				set: false
			}
			let result = rotatePieces(statePiece, savedBoard)
			expect(result.success).to.be.true
			expect(result.statePiece).to.eql({
				location: { x: 3, y: 5 },
				position: 3,
				shape: positionsT[3].shape,
				piece: 't',
				set: false
			})
		})
		it('returns updated piece state for Z rotation', () => {
			let statePiece = {
				location: { x: 3, y: 5 },
				position: 2,
				shape: positionsZ[2].shape,
				piece: 'z',
				set: false
			}
			let result = rotatePieces(statePiece, savedBoard)
			expect(result.success).to.be.true
			expect(result.statePiece).to.eql({
				location: { x: 3, y: 5 },
				position: 3,
				shape: positionsZ[3].shape,
				piece: 'z',
				set: false
			})
		})
		it('returns previous piece state if no matching piece (should never happen)', () => {
			let statePiece = {
				location: { x: 3, y: 5 },
				position: 2,
				shape: positionsZ[2].shape,
				piece: 'x',
				set: false
			}
			let result = rotatePieces(statePiece, savedBoard)
			expect(result.success).to.be.false
			expect(result.statePiece).to.eql(statePiece)
		})
	})
})
