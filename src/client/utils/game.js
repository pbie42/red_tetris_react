function calcPieceEnd(shape, piece) {
	let end = 0
	let x = -1
	while (++x < 4) {
		let y = -1
		while (++y < 4) if (shape[y][x] === piece) end = x
	}
	return 4 - end
}
function calcPieceStart(shape, piece) {
	let x = -1
	while (++x < 4) {
		let y = -1
		while (++y < 4) if (shape[y][x] === piece) return x
	}
}
function calcPieceBottom(shape, piece) {
	let bottom = 0
	let y = -1
	while (++y < 4) {
		let x = -1
		while (++x < 4) if (shape[y][x] === piece) bottom = y
	}
	return 3 - bottom
}

function calcOffsets(piece, shape) {
	const start = calcPieceStart(shape, piece)
	const end = calcPieceEnd(shape, piece)
	return { start, end }
}

function checkGame(savedBoard) {
	let y = -1
	while (++y < 4) {
		let x = -1
		while (++x < 11) if (savedBoard[y][x] !== 0) return true
	}
	return false
}

function clearLines(linesToRemove, savedBoard) {
	linesToRemove.forEach(line => {
		savedBoard.splice(line, 1)
		savedBoard.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
	})
	return savedBoard
}

function checkLines(savedBoard) {
	let board = savedBoard
	let count = 0
	let y = 3
	let linesToRemove = []
	while (++y < 24) {
		let x = -1
		while (++x < 11) if (board[y][x] !== 0) count++
		if (count === 10) linesToRemove.push(y)
		count = 0
	}
	return clearLines(linesToRemove, board)
}

function newBoard() {
	return [
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
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	]
}

export {
	calcOffsets,
	calcPieceEnd,
	calcPieceStart,
	calcPieceBottom,
	checkGame,
	checkLines,
	clearLines,
	newBoard
}
