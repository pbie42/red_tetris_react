const { calcPieceEnd, calcPieceStart } = require('./game')
const { verifyPlacement } = require('./verify')

function movePieceRight(statePiece, savedBoard) {
	let { shape, location, piece, set } = statePiece
	let offset = calcPieceEnd(shape, piece)
	if (location.x + 6 - offset <= 10 && !set) {
		if (
			verifyPlacement(
				{ x: location.x + 1, y: location.y },
				shape,
				savedBoard,
				statePiece
			)
		)
			return { ...location, x: (location.x += 1) }
	}
	return location
}

function movePieceLeft(statePiece, savedBoard) {
	let { shape, location, piece, set } = statePiece
	let offset = calcPieceStart(shape, piece)
	if (location.x - 1 + offset >= 0 && !set) {
		if (
			verifyPlacement(
				{ x: location.x - 1, y: location.y },
				shape,
				savedBoard,
				statePiece
			)
		)
			return { ...location, x: (location.x -= 1) }
	}
	return location
}

module.exports = { movePieceLeft, movePieceRight }
