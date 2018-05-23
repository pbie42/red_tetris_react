import React, { Component } from 'react'
import {
	calcOffsets,
	calcPieceBottom,
	calcPieceEnd,
	calcPieceStart,
	newBoard,
	positionsI,
	positionsJ,
	positionsL,
	positionsO,
	positionsS,
	positionsT,
	positionsZ,
	setPiecePositionShape,
	verifyPlacement
} from '../../utils'

function BoardComponent(props) {
	const C = new Component(props)
	let gameOver = false
	let grid

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
			pieces: [],
			position: 0,
			set: false
		},
		interval: '',
		current: 0
	}

	C.componentDidMount = function() {
		C.buildBoard()
		window.addEventListener('keydown', e => C.handleKeydown(e))
	}

	C.componentDidUpdate = function() {
		const { countDown, roomId, roomName, username } = C.props
		if (countDown && !C.state.countDown) {
			setTimeout(() => {
				C.state.interval = setInterval(C.movePieceDown, 750)
				C.nextPiece()
				C.props.gameNewPiece(roomId, roomName, username)
			}, 5000)
			C.state.countDown = true
		}
	}

	C.componentWillUnmount = function() {
		clearInterval(C.state.interval)
		window.removeEventListener('keydown', e => this.handleKeydown(e))
	}

	C.nextPiece = function() {
		let { piece, current } = C.state
		if (current === 90)
			C.props.gameNewPieces(C.props.roomId, C.props.roomName)
		piece.piece = C.props.piece
		C.setState({ current: ++current })
		piece.location = { x: 3, y: 0 }
		setPiecePositionShape(piece)
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
				let y = -1
				while (shape[++y] && board[y]) {
					let boardX = location.x
					let x = -1
					while (++x < 4) {
						if (shape[y][x] === C.state.piece.piece)
							board[boardY][boardX] = C.state.piece.piece
						boardX++
					}
					boardY++
				}
				C.state.board = board
			}
			if (C.state.savedBoard.length > 0) C.checkLines()
			if (C.props.doneUser && C.props.doneRoom)
				C.props.gameBoardUpdate(
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
			while (++x < 11)
				if (C.state.savedBoard[y][x] !== 0) {
					clearInterval(C.state.interval)
					gameOver = true
					C.props.gameOver()
					C.state.board = newBoard()
				}
		}
	}

	C.movePieceDown = function() {
		let { shape, location, piece } = C.state.piece
		let offset = calcPieceBottom(shape, piece)
		if (location.y - offset <= 19 && !C.state.piece.set) {
			if (
				verifyPlacement(
					{ x: location.x, y: location.y + 1 },
					shape,
					C.state.savedBoard,
					C.state.piece
				)
			) {
				location = { ...location, y: (location.y += 1) }
			} else {
				C.state.piece.set = true
				C.state.savedBoard = C.state.board.slice(0)
				C.checkGame()
			}
		} else {
			C.state.piece.set = false
			C.state.savedBoard = C.state.board.slice(0)
			C.checkGame()
			C.props.gameNewPiece(
				C.props.roomId,
				C.props.roomName,
				C.props.username
			)
			C.nextPiece()
		}
		if (!gameOver) C.placePiece()
	}

	C.movePieceRight = function() {
		let { shape, location, piece } = C.state.piece
		let offset = calcPieceEnd(shape, piece)
		if (location.x + 6 - offset <= 10 && !C.state.piece.set) {
			if (
				verifyPlacement(
					{ x: location.x + 1, y: location.y },
					shape,
					C.state.savedBoard,
					C.state.piece
				)
			)
				location = { ...location, x: (location.x += 1) }
		}
		C.placePiece()
	}

	C.movePieceLeft = function() {
		let { shape, location, piece } = C.state.piece
		let offset = calcPieceStart(shape, piece)
		if (location.x - 1 + offset >= 0 && !C.state.piece.set) {
			if (
				verifyPlacement(
					{ x: location.x - 1, y: location.y },
					shape,
					C.state.savedBoard,
					C.state.piece
				)
			)
				location = { ...location, x: (location.x -= 1) }
		}
		C.placePiece()
	}

	C.verifyRotation = function(location, newPosition, offset) {
		return (
			verifyPlacement(
				location,
				newPosition.shape,
				C.state.savedBoard,
				C.state.piece
			) &&
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

	C.rotatePiece = function(positions) {
		let { piece, position, location } = C.state.piece
		let index, newPosition, offset
		let success = false
		const locations = C.setupLocations(location)
		if ((index = position + 1) > 3) index = 0
		newPosition = positions[index]
		offset = calcOffsets(piece, newPosition.shape)

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
		if (!gameOver && C.props.gameStarted) {
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
