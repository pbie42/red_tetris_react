const positionsO = [
	{
		position: 0,
		shape: [[0, 0, 0, 0], [0, 'o', 'o', 0], [0, 'o', 'o', 0], [0, 0, 0, 0]]
	},
	{
		position: 1,
		shape: [[0, 0, 0, 0], [0, 'o', 'o', 0], [0, 'o', 'o', 0], [0, 0, 0, 0]]
	},
	{
		position: 2,
		shape: [[0, 0, 0, 0], [0, 'o', 'o', 0], [0, 'o', 'o', 0], [0, 0, 0, 0]]
	},
	{
		position: 3,
		shape: [[0, 0, 0, 0], [0, 'o', 'o', 0], [0, 'o', 'o', 0], [0, 0, 0, 0]]
	}
]

const positionsL = [
	{
		position: 0,
		shape: [[0, 0, 0, 0], [0, 0, 'l', 0], ['l', 'l', 'l', 0], [0, 0, 0, 0]]
	},
	{
		position: 1,
		shape: [[0, 0, 0, 0], [0, 'l', 0, 0], [0, 'l', 0, 0], [0, 'l', 'l', 0]]
	},
	{
		position: 2,
		shape: [[0, 0, 0, 0], [0, 0, 0, 0], ['l', 'l', 'l', 0], ['l', 0, 0, 0]]
	},
	{
		position: 3,
		shape: [[0, 0, 0, 0], ['l', 'l', 0, 0], [0, 'l', 0, 0], [0, 'l', 0, 0]]
	}
]

const positionsJ = [
	{
		position: 0,
		shape: [[0, 0, 0, 0], ['j', 0, 0, 0], ['j', 'j', 'j', 0], [0, 0, 0, 0]]
	},
	{
		position: 1,
		shape: [[0, 0, 0, 0], [0, 'j', 'j', 0], [0, 'j', 0, 0], [0, 'j', 0, 0]]
	},
	{
		position: 2,
		shape: [[0, 0, 0, 0], [0, 0, 0, 0], ['j', 'j', 'j', 0], [0, 0, 'j', 0]]
	},
	{
		position: 3,
		shape: [[0, 0, 0, 0], [0, 'j', 0, 0], [0, 'j', 0, 0], ['j', 'j', 0, 0]]
	}
]

const positionsI = [
	{
		position: 0,
		shape: [[0, 0, 0, 0], ['i', 'i', 'i', 'i'], [0, 0, 0, 0], [0, 0, 0, 0]]
	},
	{
		position: 1,
		shape: [[0, 0, 'i', 0], [0, 0, 'i', 0], [0, 0, 'i', 0], [0, 0, 'i', 0]]
	},
	{
		position: 2,
		shape: [[0, 0, 0, 0], [0, 0, 0, 0], ['i', 'i', 'i', 'i'], [0, 0, 0, 0]]
	},
	{
		position: 3,
		shape: [[0, 'i', 0, 0], [0, 'i', 0, 0], [0, 'i', 0, 0], [0, 'i', 0, 0]]
	}
]

const positionsS = [
	{
		position: 0,
		shape: [[0, 0, 0, 0], [0, 's', 's', 0], ['s', 's', 0, 0], [0, 0, 0, 0]]
	},
	{
		position: 1,
		shape: [[0, 0, 0, 0], [0, 's', 0, 0], [0, 's', 's', 0], [0, 0, 's', 0]]
	},
	{
		position: 2,
		shape: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 's', 's', 0], ['s', 's', 0, 0]]
	},
	{
		position: 3,
		shape: [[0, 0, 0, 0], ['s', 0, 0, 0], ['s', 's', 0, 0], [0, 's', 0, 0]]
	}
]

const positionsT = [
	{
		position: 0,
		shape: [[0, 0, 0, 0], [0, 't', 0, 0], ['t', 't', 't', 0], [0, 0, 0, 0]]
	},
	{
		position: 1,
		shape: [[0, 0, 0, 0], [0, 't', 0, 0], [0, 't', 't', 0], [0, 't', 0, 0]]
	},
	{
		position: 2,
		shape: [[0, 0, 0, 0], [0, 0, 0, 0], ['t', 't', 't', 0], [0, 't', 0, 0]]
	},
	{
		position: 3,
		shape: [[0, 0, 0, 0], [0, 't', 0, 0], ['t', 't', 0, 0], [0, 't', 0, 0]]
	}
]

const positionsZ = [
	{
		position: 0,
		shape: [[0, 0, 0, 0], ['z', 'z', 0, 0], [0, 'z', 'z', 0], [0, 0, 0, 0]]
	},
	{
		position: 1,
		shape: [[0, 0, 0, 0], [0, 0, 'z', 0], [0, 'z', 'z', 0], [0, 'z', 0, 0]]
	},
	{
		position: 2,
		shape: [[0, 0, 0, 0], [0, 0, 0, 0], ['z', 'z', 0, 0], [0, 'z', 'z', 0]]
	},
	{
		position: 3,
		shape: [[0, 0, 0, 0], [0, 'z', 0, 0], ['z', 'z', 0, 0], ['z', 0, 0, 0]]
	}
]
function getI(piece) {
	const i = initializeI()
	piece.shape = i.shape
	piece.position = i.position
	// console.log(`piece`, piece)
	return piece
}
function getJ(piece) {
	const j = initializeJ()
	piece.shape = j.shape
	piece.position = j.position
	// console.log(`piece`, piece)
	return piece
}
function getL(piece) {
	const l = initializeL()
	piece.shape = l.shape
	piece.position = l.position
	// console.log(`piece`, piece)
	return piece
}
function getO(piece) {
	const o = initializeO()
	piece.shape = o.shape
	piece.position = o.position
	// console.log(`piece`, piece)
	return piece
}
function getS(piece) {
	const s = initializeS()
	piece.shape = s.shape
	piece.position = s.position
	// console.log(`piece`, piece)
	return piece
}
function getT(piece) {
	const t = initializeT()
	piece.shape = t.shape
	piece.position = t.position
	// console.log(`piece`, piece)
	return piece
}
function getZ(piece) {
	const z = initializeZ()
	piece.shape = z.shape
	piece.position = z.position
	// console.log(`piece`, piece)
	return piece
}

function initializeI() {
	return selectPosition(positionsI)
}
function initializeJ() {
	return selectPosition(positionsJ)
}
function initializeL() {
	return selectPosition(positionsL)
}
function initializeO() {
	return selectPosition(positionsO)
}
function initializeS() {
	return selectPosition(positionsS)
}
function initializeT() {
	return selectPosition(positionsT)
}
function initializeZ() {
	return selectPosition(positionsZ)
}

function selectPosition(positions) {
	return positions[Math.floor(Math.random() * positions.length)]
}

function randomPiece() {
	const pieces = ['i', 'j', 'l', 'o', 's', 't', 'z']
	return pieces[Math.floor(Math.random() * pieces.length)]
}

function getPiecePositionShape(piece) {
	if (piece.piece === 'i') return getI(piece)
	if (piece.piece === 'j') return getJ(piece)
	if (piece.piece === 'l') return getL(piece)
	if (piece.piece === 'o') return getO(piece)
	if (piece.piece === 's') return getS(piece)
	if (piece.piece === 't') return getT(piece)
	if (piece.piece === 'z') return getZ(piece)
}

function setPiecePositionShape(piece) {
	let position = getPiecePositionShape(piece)
	piece.position = position.position
	piece.shape = position.shape
}

module.exports = {
	getI,
	getJ,
	getL,
	getO,
	getPiecePositionShape,
	getS,
	getT,
	getZ,
	initializeI,
	initializeJ,
	initializeL,
	initializeO,
	initializeS,
	initializeT,
	initializeZ,
	positionsI,
	positionsJ,
	positionsL,
	positionsO,
	positionsS,
	positionsT,
	positionsZ,
	randomPiece,
	selectPosition,
	setPiecePositionShape
}
