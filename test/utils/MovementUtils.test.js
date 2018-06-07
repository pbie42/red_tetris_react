import { expect } from 'chai'
import {
	calcOffsets,
	movePieceDown,
	movePieceLeft,
	movePieceRight,
	positionsI,
	positionsZ,
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
				[0, 0, 0, "z", "z", 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, "z", "z", 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
			let piece = {
				location: { "x": 3, "y": 20 },
				shape: [
					[0, 0, 0, 0],
					["z", "z", 0, 0],
					[0, "z", "z", 0],
					[0, 0, 0, 0]],
				piece: "z",
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
				[0, 0, 0, "z", "z", 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, "z", "z", 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
			let piece = {
				location: { "x": 3, "y": 21 },
				shape: [
					[0, 0, 0, 0],
					["z", "z", 0, 0],
					[0, "z", "z", 0],
					[0, 0, 0, 0]],
				piece: "z",
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
				[0, 0, 0, 0, "j", "j", 0, 0, 0, 0, 0],
				[0, 0, 0, 0, "j", 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, "j", 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, "l", 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, "l", 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, "l", "l", 0, 0, 0, 0, 0],
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
				[0, 0, 0, 0, "l", 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, "l", 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, "l", "l", 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			]
			let piece = {
				location: { "x": 3, "y": 17 },
				shape: [
					[0, 0, 0, 0],
					[0, "j", "j", 0],
					[0, "j", 0, 0],
					[0, "j", 0, 0]],
				piece: "j",
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
			expect(result.locations[1]).to.eql({ x: location.x + 1, y: location.y })
			expect(result.locations[2]).to.eql({ x: location.x - 1, y: location.y })
			expect(result.locationsI[0]).to.eql({ x: location.x + 2, y: location.y })
			expect(result.locationsI[1]).to.eql({ x: location.x - 2, y: location.y })
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
				location: { "x": 3, "y": 5 },
				shape: [
					[0, 0, 0, 0],
					["z", "z", 0, 0],
					[0, "z", "z", 0],
					[0, 0, 0, 0]],
				piece: "z",
				position: 0,
				set: false
			}
			let newPos = positionsZ[1]
			let offset = calcOffsets(newPos.shape, piece.piece)
			let locations = setupLocations(piece.location)
			let result = tryRotations(locations.locations, newPos, offset, savedBoard, piece)
			expect(result.success).to.be.true
			expect(result.newLocation).to.eql(piece.location)
		})
		it('returns false with empty location object if the piece can not rotate', () => {
			let piece = {
				location: { "x": 1, "y": 16 },
				position: 3,
				shape: [
					[0, 'i', 0, 0],
					[0, 'i', 0, 0],
					[0, 'i', 0, 0],
					[0, 'i', 0, 0]],
				piece: "z",
				set: false
			}
			let newPos = positionsI[0]
			let offset = calcOffsets(newPos.shape, piece.piece)
			let locations = setupLocations(piece.location)
			let result = tryRotations(locations.locations, newPos, offset, savedBoard, piece)
			expect(result.success).to.be.false
			expect(result.newLocation).to.eql({})
		})
	})
})
