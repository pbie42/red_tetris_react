const {
	calcPieceEnd,
	calcPieceStart,
	calcPieceBottom,
	calcOffsets,
	checkGame
} = require('./game')
const { verifyPlacement, verifyRotation } = require('./verify')
const {
	positionsI,
	positionsJ,
	positionsL,
	positionsO,
	positionsS,
	positionsT,
	positionsZ
} = require('./pieces')

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

function movePieceDown(statePiece, board, savedBoard) {
	let gameOverCheck = false
	let newPiece = false
	let { shape, location, piece } = statePiece
	let set = statePiece.set
	let offset = calcPieceBottom(shape, piece)
	let newLocation = location
	if (newLocation.y - offset <= 19 && !set) {
		if (
			verifyPlacement(
				{ x: newLocation.x, y: newLocation.y + 1 },
				shape,
				savedBoard,
				statePiece
			)
		) {
			newLocation = { ...newLocation, y: (newLocation.y += 1) }
		} else {
			set = true
			savedBoard = board.slice(0)
			gameOverCheck = checkGame(savedBoard)
		}
	} else {
		set = false
		savedBoard = board.slice(0)
		gameOverCheck = checkGame(savedBoard)
		newPiece = true
	}
	return { gameOverCheck, set, savedBoard, newPiece, newLocation }
}

function setupLocations(location) {
	const locations = [
		location,
		{ x: location.x + 1, y: location.y },
		{ x: location.x - 1, y: location.y }
	]
	const locationsI = [
		{ x: location.x + 2, y: location.y },
		{ x: location.x - 2, y: location.y }
	]
	return { locations, locationsI }
}

function tryRotations(locations, newPosition, offset, savedBoard, piece) {
	let newLocation = {}
	let success = locations.some(loc => {
		if (verifyRotation(loc, newPosition, offset, savedBoard, piece)) {
			newLocation = loc
			return true
		}
		return false
	})
	return { success, newLocation }
}

function rotatePiece(positions, savedBoard, statePiece) {
	let { piece, position, location } = statePiece
	const locationsObj = setupLocations(location)
	let { locations, locationsI } = locationsObj
	let index
	if ((index = position + 1) > 3) index = 0
	let newPos = positions[index]
	let offset = calcOffsets(piece, newPos.shape)
	let result = tryRotations(locations, newPos, offset, savedBoard, statePiece)
	if (piece === 'i' && !result.success) {
		result = tryRotations(locationsI, newPos, offset, savedBoard, statePiece)
	}
	return {
		success: result.success,
		newPos,
		index,
		newLoc: result.newLocation
	}
}

function rotatePieces(statePiece, savedBoard) {
	let res
	switch (statePiece.piece) {
		case 'i':
			res = rotatePiece(positionsI, savedBoard, statePiece)
			return handleStatePiece(statePiece, res)
		case 'j':
			res = rotatePiece(positionsJ, savedBoard, statePiece)
			return handleStatePiece(statePiece, res)
		case 'l':
			res = rotatePiece(positionsL, savedBoard, statePiece)
			return handleStatePiece(statePiece, res)
		case 'o':
			res = rotatePiece(positionsO, savedBoard, statePiece)
			return handleStatePiece(statePiece, res)
		case 's':
			res = rotatePiece(positionsS, savedBoard, statePiece)
			return handleStatePiece(statePiece, res)
		case 't':
			res = rotatePiece(positionsT, savedBoard, statePiece)
			return handleStatePiece(statePiece, res)
		case 'z':
			res = rotatePiece(positionsZ, savedBoard, statePiece)
			return handleStatePiece(statePiece, res)

		default:
			return statePiece
	}
}

function handleStatePiece(statePiece, rotationResult) {
	if (rotationResult.success) {
		statePiece.location = rotationResult.newLoc
		statePiece.shape = rotationResult.newPos.shape
		statePiece.position = rotationResult.index
	}
	return { success: rotationResult.success, statePiece }
}

module.exports = {
	handleStatePiece,
	movePieceDown,
	movePieceLeft,
	movePieceRight,
	rotatePiece,
	rotatePieces,
	setupLocations,
	tryRotations
}
