import { expect } from 'chai'
import {
	calcPieceEnd,
	calcPieceStart,
	calcPieceBottom
} from '../../src/client/utils'

describe('Game Utils', () => {
	let shape = [[0, 0, 0, 0], [0, 0, 0, 0], ['i', 'i', 'i', 'i'], [0, 0, 0, 0]]
	describe('calcPieceEnd', () => {
		it('the last instance of the piece from the left side of the shape matrix', () => {
			const pieceEnd = calcPieceEnd(shape, 'i')
			expect(pieceEnd).to.equal(3)
		})
	})

	describe('calcPieceStart', () => {
		it('finds the first instance of the piece from the left side of the shape matrix', () => {
			const pieceStart = calcPieceStart(shape, 'i')
			expect(pieceStart).to.equal(0)
		})
	})

	describe('calcPieceBottom', () => {
		it('finds the first instance of the piece from the left side of the shape matrix', () => {
			const pieceBottom = calcPieceBottom(shape, 'i')
			expect(pieceBottom).to.equal(2)
		})
	})
})
