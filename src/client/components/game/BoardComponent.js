import React, { Component } from 'react'
import {
	calcPieceBottom,
	calcPieceEnd,
	calcPieceStart,
	getI,
	getJ,
	getL,
	getO,
	getS,
	getT,
	getZ,
	newBoard,
	positionsI,
	positionsJ,
	positionsL,
	positionsO,
	positionsS,
	positionsT,
	positionsZ,
	randomPiece
} from '../../utils'

function BoardComponent(props) {
	const C = new Component(props)
	let grid
	let gameOver = false

	C.state = {
		board: newBoard(),
		savedBoard: [],
		gameReady: false,
		countDown: false,
		test: '',
		piece: {
			location: { x: 0, y: 0 },
			shape: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
			piece: '',
			prevPiece: '',
			current: 0,
			pieces: [],
			position: 0,
			set: false
		},
		interval: ''
	}

	C.componentDidMount = function() {
		// C.setState({ pieces: C.pieceOrder() })
		// C.pieceOrder() //Need to get rid of this
		C.buildBoard()
		window.addEventListener('keydown', e => C.handleKeydown(e))
	}

	C.componentDidUpdate = function() {
		if (C.props.countDown && !C.state.countDown) {
			setTimeout(() => {
				C.state.interval = setInterval(C.movePieceDown, 750)
				C.nextPiece()
				C.props.requestNextPiece(
					C.props.roomId,
					C.props.roomName,
					C.props.username
				)
			}, 5000)
			C.state.countDown = true
		}
	}

	C.componentWillUnmount = function() {
		clearInterval(C.state.interval)
		window.removeEventListener('keydown', e => this.handleKeydown(e))
	}

	C.pieceOrder = function() {
		const pieces = []
		for (let i = 0; i < 100; i++) pieces.push(randomPiece())
		C.state.piece.pieces = pieces
		C.nextPiece()
	}

	C.nextPiece = function() {
		let piece = C.state.piece
		console.log(`piece.current`, piece.current)
		if (piece.current === 90)
			C.props.newPieces(C.props.roomId, C.props.roomName)
		let nextPiece = C.props.piece
		if (!nextPiece) {
			// console.log(`nextPiece does not exist`)
			nextPiece = piece.pieces[piece.current]
		}
		let position = {}
		C.state.piece.prevPiece = C.state.piece.piece
		C.state.piece.piece = nextPiece
		C.state.piece.current++
		C.state.piece.location = { x: 3, y: 0 }
		if (piece.piece === 'i') position = getI(piece)
		if (piece.piece === 'j') position = getJ(piece)
		if (piece.piece === 'l') position = getL(piece)
		if (piece.piece === 'o') position = getO(piece)
		if (piece.piece === 's') position = getS(piece)
		if (piece.piece === 't') position = getT(piece)
		if (piece.piece === 'z') position = getZ(piece)
		C.state.piece.position = position.position
		C.state.piece.shape = position.shape
		this.placePiece()
	}

	C.placePieces = function(board) {
		let y = -1
		while (board[++y]) {
			let x = -1
			while (++x < 11)
				if (C.state.savedBoard[y][x] !== 0)
					board[y][x] = C.state.savedBoard[y][x]
		}
	}

	C.placePiece = function() {
		if (!gameOver) {
			const prevBoard = C.state.board
			let { location, shape } = C.state.piece
			let board = newBoard()
			let boardY = location.y
			if (C.state.savedBoard.length > 0) C.placePieces(board)
			if (boardY + 4 > 26) C.state.board = prevBoard
			else {
				let y = 0
				while (shape[y] && board[y]) {
					let boardX = location.x
					let x = 0
					while (x < 4) {
						if (shape[y][x] === C.state.piece.piece) {
							board[boardY][boardX] = C.state.piece.piece
						}
						x++
						boardX++
					}
					y++
					boardY++
				}
				C.state.board = board
			}
			if (C.props.doneUser && C.props.doneRoom)
				C.props.updateGameBoard(
					C.state.board,
					C.props.userId,
					C.props.roomName,
					C.props.username
				)
			C.buildBoard()
		}
	}

	C.buildBoard = function() {
		if (grid) {
			grid.innerHTML = ''
			for (let i = 0; i < C.state.board.length; i++) {
				if (i < 4) continue
				if (i > 23) continue
				const row = document.createElement('div')
				row.setAttribute('id', `row-${i - 4}`)
				for (let x = 0; x < C.state.board[i].length; x++) {
					if (x > 9) continue
					const square = document.createElement('div')
					square.setAttribute('id', `col-${x}`)
					C.setColorClass(i, x, square)
					row.appendChild(square)
				}
				grid.appendChild(row)
			}
		}
	}

	C.setColorClass = function(i, x, square) {
		if (C.state.board[i][x] === 'i') square.setAttribute('class', 'cyan')
		if (C.state.board[i][x] === 'j') square.setAttribute('class', 'blue')
		if (C.state.board[i][x] === 'l') square.setAttribute('class', 'orange')
		if (C.state.board[i][x] === 'o') square.setAttribute('class', 'yellow')
		if (C.state.board[i][x] === 's') square.setAttribute('class', 'green')
		if (C.state.board[i][x] === 't') square.setAttribute('class', 'purple')
		if (C.state.board[i][x] === 'z') square.setAttribute('class', 'red')
	}

	C.clearLines = function(linesToRemove) {
		linesToRemove.forEach(line => {
			C.state.savedBoard.splice(line, 1)
			C.state.savedBoard.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
		})
	}
	C.checkLines = function() {
		let board = C.state.savedBoard
		let count = 0
		let y = 3
		let linesToRemove = []
		while (++y < 24) {
			let x = -1
			while (++x < 11) if (board[y][x] !== 0) count++
			if (count === 10) linesToRemove.push(y)
			count = 0
		}
		C.clearLines(linesToRemove)
	}

	C.checkGame = function() {
		let y = -1
		while (++y < 4) {
			let x = -1
			while (++x < 11) {
				if (C.state.savedBoard[y][x] !== 0) {
					clearInterval(C.state.interval)
					// console.log(`GAME OVER MANNNNNNN`)
					gameOver = true
					C.state.board = newBoard()
					// console.log(`gameOver`, gameOver)
				}
			}
		}
	}

	C.verifyPlacement = function(location, shape) {
		if (C.state.savedBoard.length === 0) return true
		let y = 0
		let boardY = location.y
		while (shape[y] && C.state.savedBoard[y]) {
			let x = 0
			let boardX = location.x
			while (x < 4) {
				if (
					(shape[y][x] === C.state.piece.piece ||
						shape[y][x] === C.state.piece.prevPiece) &&
					C.state.savedBoard[boardY][boardX] !== 0
				) {
					return false
				}
				x++
				boardX++
			}
			y++
			boardY++
		}
		return true
	}

	C.movePieceDown = function() {
		let { shape, location, piece } = C.state.piece
		let offset = calcPieceBottom(shape, piece)
		if (location.y - offset <= 19 && !C.state.piece.set) {
			if (C.verifyPlacement({ x: location.x, y: location.y + 1 }, shape)) {
				// console.log(`verified placement`)
				location = { ...location, y: (location.y += 1) }
				// console.log(`C.state.board`, JSON.stringify(C.state.board))
			} else {
				// console.log(`NOT verified placement`)
				C.state.piece.set = true
				C.state.savedBoard = C.state.board.slice(0)
				// console.log(`C.state.savedBoard`, JSON.stringify(C.state.savedBoard))
				if (C.state.savedBoard.length > 0) C.checkLines()
				C.checkGame()
			}
		} else {
			// console.log(`piece is set!!!!`)
			C.state.piece.set = false
			C.state.savedBoard = C.state.board.slice(0)
			if (C.state.savedBoard.length > 0) C.checkLines()
			C.checkGame()
			C.props.requestNextPiece(
				C.props.roomId,
				C.props.roomName,
				C.props.username
			)
			C.nextPiece()
		}
		// if (C.state.savedBoard.length > 0) C.checkGame()
		if (!gameOver) C.placePiece()
	}

	C.movePieceRight = function() {
		let { shape, location, piece } = C.state.piece
		let offset = calcPieceEnd(shape, piece)
		if (location.x + 6 - offset <= 10 && !C.state.piece.set) {
			if (C.verifyPlacement({ x: location.x + 1, y: location.y }, shape))
				location = { ...location, x: (location.x += 1) }
		}
		C.placePiece()
	}

	C.movePieceLeft = function() {
		let { shape, location, piece } = C.state.piece
		let offset = calcPieceStart(shape, piece)
		if (location.x - 1 + offset >= 0 && !C.state.piece.set) {
			if (C.verifyPlacement({ x: location.x - 1, y: location.y }, shape))
				location = { ...location, x: (location.x -= 1) }
		}
		C.placePiece()
	}

	C.verifyRotation = function(location, newPosition, offset) {
		return (
			C.verifyPlacement(location, newPosition.shape) &&
			location.x + 6 - offset.end <= 11 &&
			location.x - 1 + offset.start >= -1
		)
	}
	C.doRotation = function(position, index, location) {
		C.state.piece.location = location
		C.state.piece.shape = position.shape
		C.state.piece.position = index
		C.placePiece()
		return true
	}
	C.setupLocations = function(location) {
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
	C.getOffsets = function(piece, shape) {
		const start = calcPieceStart(shape, piece)
		const end = calcPieceEnd(shape, piece)
		return { start, end }
	}
	C.rotatePiece = function(positions) {
		let { piece, position, location } = C.state.piece
		let index, newPosition, offset
		let success = false
		const locations = C.setupLocations(location)
		if ((index = position + 1) > 3) index = 0
		newPosition = positions[index]
		offset = C.getOffsets(piece, newPosition.shape)

		success = locations.locations.some(location => {
			let success = false
			if (C.verifyRotation(location, newPosition, offset))
				success = C.doRotation(newPosition, index, location)
			return success
		})

		if (piece === 'i' && !success) {
			locations.locationsI.some(location => {
				let success = false
				if (C.verifyRotation(location, newPosition, offset))
					success = C.doRotation(newPosition, index, location)
				return success
			})
		}
	}
	C.rotatePieces = function() {
		switch (C.state.piece.piece) {
			case 'i':
				C.rotatePiece(positionsI)
				break
			case 'j':
				C.rotatePiece(positionsJ)
				break
			case 'l':
				C.rotatePiece(positionsL)
				break
			case 'o':
				C.rotatePiece(positionsO)
				break
			case 's':
				C.rotatePiece(positionsS)
				break
			case 't':
				C.rotatePiece(positionsT)
				break
			case 'z':
				C.rotatePiece(positionsZ)
				break

			default:
				break
		}
	}

	C.handleKeydown = function(event) {
		if (!gameOver) {
			if (event.keyCode === 37) C.movePieceLeft()
			if (event.keyCode === 38) C.rotatePieces()
			if (event.keyCode === 39) C.movePieceRight()
			if (event.keyCode === 40) C.movePieceDown()
		}
	}

	C.render = () => {
		return <div id={C.props.id} ref={node => (grid = node)} />
	}

	return C
}

export default BoardComponent
