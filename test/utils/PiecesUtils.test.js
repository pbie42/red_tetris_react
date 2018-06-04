import { expect } from 'chai'
import 'chai/register-should'
import {
	initializeI,
	initializeJ,
	initializeL,
	initializeO,
	initializeS,
	initializeT,
	initializeZ,
	getI,
	getJ,
	getL,
	getO,
	getS,
	getT,
	getZ,
	positionsI,
	positionsJ,
	positionsL,
	positionsO,
	positionsS,
	positionsT,
	positionsZ,
	randomPiece
} from '../../src/client/utils'

describe('Pieces Utils', () => {
	describe('initializeI', () => {
		it('returns a random position for I piece', () => {
			const position = initializeI()
			position.should.satisfy(res => {
				if (
					res === positionsI[0] ||
					res === positionsI[1] ||
					res === positionsI[2] ||
					res === positionsI[3]
				)
					return true
				else return false
			})
		})
	})
	describe('initializeJ', () => {
		it('returns a random position for J piece', () => {
			const position = initializeJ()
			position.should.satisfy(res => {
				if (
					res === positionsJ[0] ||
					res === positionsJ[1] ||
					res === positionsJ[2] ||
					res === positionsJ[3]
				)
					return true
				else return false
			})
		})
	})
	describe('initializeL', () => {
		it('returns a random position for L piece', () => {
			const position = initializeL()
			position.should.satisfy(res => {
				if (
					res === positionsL[0] ||
					res === positionsL[1] ||
					res === positionsL[2] ||
					res === positionsL[3]
				)
					return true
				else return false
			})
		})
	})
	describe('initializeO', () => {
		it('returns a random position for O piece', () => {
			const position = initializeO()
			position.should.satisfy(res => {
				if (
					res === positionsO[0] ||
					res === positionsO[1] ||
					res === positionsO[2] ||
					res === positionsO[3]
				)
					return true
				else return false
			})
		})
	})
	describe('initializeS', () => {
		it('returns a random position for S piece', () => {
			const position = initializeS()
			position.should.satisfy(res => {
				if (
					res === positionsS[0] ||
					res === positionsS[1] ||
					res === positionsS[2] ||
					res === positionsS[3]
				)
					return true
				else return false
			})
		})
	})
	describe('initializeT', () => {
		it('returns a random position for T piece', () => {
			const position = initializeT()
			position.should.satisfy(res => {
				if (
					res === positionsT[0] ||
					res === positionsT[1] ||
					res === positionsT[2] ||
					res === positionsT[3]
				)
					return true
				else return false
			})
		})
	})
	describe('initializeZ', () => {
		it('returns a random position for Z piece', () => {
			const position = initializeZ()
			position.should.satisfy(res => {
				if (
					res === positionsZ[0] ||
					res === positionsZ[1] ||
					res === positionsZ[2] ||
					res === positionsZ[3]
				)
					return true
				else return false
			})
		})
	})
	describe('getI', () => {
		it('updates piece parameter object and returns the piece with info for I piece', () => {
			let piece = {
				shape: [],
				position: 0
			}
			piece = getI(piece)
			piece.shape.should.satisfy(res => {
				if (
					res === positionsI[0].shape ||
					res === positionsI[1].shape ||
					res === positionsI[2].shape ||
					res === positionsI[3].shape
				)
					return true
				else return false
			})
			piece.position.should.satisfy(res => {
				if (res === 0 || res === 1 || res === 2 || res === 3) return true
				else return false
			})
		})
	})
	describe('getJ', () => {
		it('updates piece parameter object and returns the piece with info for J piece', () => {
			let piece = {
				shape: [],
				position: 0
			}
			piece = getJ(piece)
			piece.shape.should.satisfy(res => {
				if (
					res === positionsJ[0].shape ||
					res === positionsJ[1].shape ||
					res === positionsJ[2].shape ||
					res === positionsJ[3].shape
				)
					return true
				else return false
			})
			piece.position.should.satisfy(res => {
				if (res === 0 || res === 1 || res === 2 || res === 3) return true
				else return false
			})
		})
	})
	describe('getL', () => {
		it('updates piece parameter object and returns the piece with info for L piece', () => {
			let piece = {
				shape: [],
				position: 0
			}
			piece = getL(piece)
			piece.shape.should.satisfy(res => {
				if (
					res === positionsL[0].shape ||
					res === positionsL[1].shape ||
					res === positionsL[2].shape ||
					res === positionsL[3].shape
				)
					return true
				else return false
			})
			piece.position.should.satisfy(res => {
				if (res === 0 || res === 1 || res === 2 || res === 3) return true
				else return false
			})
		})
	})
	describe('getO', () => {
		it('updates piece parameter object and returns the piece with info for O piece', () => {
			let piece = {
				shape: [],
				position: 0
			}
			piece = getO(piece)
			piece.shape.should.satisfy(res => {
				if (
					res === positionsO[0].shape ||
					res === positionsO[1].shape ||
					res === positionsO[2].shape ||
					res === positionsO[3].shape
				)
					return true
				else return false
			})
			piece.position.should.satisfy(res => {
				if (res === 0 || res === 1 || res === 2 || res === 3) return true
				else return false
			})
		})
	})
	describe('getS', () => {
		it('updates piece parameter object and returns the piece with info for S piece', () => {
			let piece = {
				shape: [],
				position: 0
			}
			piece = getS(piece)
			piece.shape.should.satisfy(res => {
				if (
					res === positionsS[0].shape ||
					res === positionsS[1].shape ||
					res === positionsS[2].shape ||
					res === positionsS[3].shape
				)
					return true
				else return false
			})
			piece.position.should.satisfy(res => {
				if (res === 0 || res === 1 || res === 2 || res === 3) return true
				else return false
			})
		})
	})
	describe('getT', () => {
		it('updates piece parameter object and returns the piece with info for T piece', () => {
			let piece = {
				shape: [],
				position: 0
			}
			piece = getT(piece)
			piece.shape.should.satisfy(res => {
				if (
					res === positionsT[0].shape ||
					res === positionsT[1].shape ||
					res === positionsT[2].shape ||
					res === positionsT[3].shape
				)
					return true
				else return false
			})
			piece.position.should.satisfy(res => {
				if (res === 0 || res === 1 || res === 2 || res === 3) return true
				else return false
			})
		})
	})
	describe('getZ', () => {
		it('updates piece parameter object and returns the piece with info for Z piece', () => {
			let piece = {
				shape: [],
				position: 0
			}
			piece = getZ(piece)
			piece.shape.should.satisfy(res => {
				if (
					res === positionsZ[0].shape ||
					res === positionsZ[1].shape ||
					res === positionsZ[2].shape ||
					res === positionsZ[3].shape
				)
					return true
				else return false
			})
			piece.position.should.satisfy(res => {
				if (res === 0 || res === 1 || res === 2 || res === 3) return true
				else return false
			})
		})
	})
	describe('randomPiece', () => {
		it('returns a letter corresponding to a Tetris piece', () => {
			const piece = randomPiece()
			piece.should.satisfy(res => {
				if (
					res === 'i' ||
					res === 'j' ||
					res === 'l' ||
					res === 'o' ||
					res === 's' ||
					res === 't' ||
					res === 'z'
				)
					return true
				else return false
			})
		})
	})
})
