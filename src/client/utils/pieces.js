import { newBoard } from './game'

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
	return piece
}
function getJ(piece) {
	const j = initializeJ()
	piece.shape = j.shape
	piece.position = j.position
	return piece
}
function getL(piece) {
	const l = initializeL()
	piece.shape = l.shape
	piece.position = l.position
	return piece
}
function getO(piece) {
	const o = initializeO()
	piece.shape = o.shape
	piece.position = o.position
	return piece
}
function getS(piece) {
	const s = initializeS()
	piece.shape = s.shape
	piece.position = s.position
	return piece
}
function getT(piece) {
	const t = initializeT()
	piece.shape = t.shape
	piece.position = t.position
	return piece
}
function getZ(piece) {
	const z = initializeZ()
	piece.shape = z.shape
	piece.position = z.position
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

function setColorClass(i, x, board) {
	if (board[i][x] === 'i') return 'cyan'
	if (board[i][x] === 'j') return 'blue'
	if (board[i][x] === 'l') return 'orange'
	if (board[i][x] === 'o') return 'yellow'
	if (board[i][x] === 's') return 'green'
	if (board[i][x] === 't') return 'purple'
	if (board[i][x] === 'z') return 'red'
	return ''
}

function placePieces(board, savedBoard) {
	let y = -1
	while (board[++y]) {
		let x = -1
		while (++x < 11)
			if (savedBoard[y][x] !== 0) board[y][x] = savedBoard[y][x]
	}
	return board
}

function placePiece(piece, fillBoard, location) {
	let boardY = location.y
	let y = -1
	while (piece.shape[++y] && fillBoard[y]) {
		let boardX = location.x
		let x = -1
		while (++x < 4) {
			if (piece.shape[y][x] === piece.piece)
				fillBoard[boardY][boardX] = piece.piece
			boardX++
		}
		boardY++
	}
	return fillBoard
}

function handlePiece(piece, board, savedBoard) {
	const prevBoard = board
	let { location } = piece
	let fillBoard = newBoard()
	let boardY = location.y
	if (savedBoard.length > 0) fillBoard = placePieces(fillBoard, savedBoard)
	if (boardY + 4 > 26) return prevBoard
	else return placePiece(piece, fillBoard, location)
}

function nextPiece(piece, newPiece, current) {
	piece.piece = newPiece
	piece.location = { x: 3, y: 0 }
	let position = getPiecePositionShape(piece)
	piece.position = position.position
	piece.shape = position.shape
	return piece
}

export {
	getI,
	getJ,
	getL,
	getO,
	getPiecePositionShape,
	getS,
	getT,
	getZ,
	handlePiece,
	initializeI,
	initializeJ,
	initializeL,
	initializeO,
	initializeS,
	initializeT,
	initializeZ,
	nextPiece,
	placePiece,
	placePieces,
	positionsI,
	positionsJ,
	positionsL,
	positionsO,
	positionsS,
	positionsT,
	positionsZ,
	randomPiece,
	selectPosition,
	setColorClass
}
