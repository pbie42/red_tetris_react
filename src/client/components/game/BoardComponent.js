import React, { Component } from 'react'
import {
	calcPieceBottom,
	checkGame,
	movePieceLeft,
	movePieceRight,
	movePieceDown,
	newBoard,
	rotatePieces,
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
				C.state.interval = setInterval(function() {
					C.handleKeydown({ keyCode: 40 })
				}, 750)
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
		if (current === 90) C.props.gameNewPieces(C.props.roomId, C.props.roomName)
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

	C.clearLines = function(linesToRemove, savedBoard) {
		linesToRemove.forEach(line => {
			savedBoard.splice(line, 1)
			savedBoard.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
		})
		return savedBoard
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
		C.state.savedBoard = C.clearLines(linesToRemove, board)
	}

	C.handleKeydown = function(event) {
		let { piece, savedBoard } = C.state
		let result
		if (!gameOver && C.props.gameStarted) {
			if (event.keyCode === 37) {
				piece.location = movePieceLeft(piece, savedBoard)
				C.placePiece()
			}
			if (event.keyCode === 38) {
				result = rotatePieces(piece, savedBoard)
				piece = result.statePiece
				if (result.success) C.placePiece()
			}
			if (event.keyCode === 39) {
				piece.location = movePieceRight(piece, savedBoard)
				C.placePiece()
			}
			if (event.keyCode === 40) {
				result = movePieceDown(piece, C.state.board, savedBoard)
				gameOver = result.gameOverCheck
				this.state.savedBoard = result.savedBoard
				if (gameOver) {
					clearInterval(C.state.interval)
					C.props.gameOver()
				}
				C.state.piece.location = result.newLocation
				C.state.piece.set = result.set
				if (result.newPiece) {
					C.props.gameNewPiece(
						C.props.roomId,
						C.props.roomName,
						C.props.username
					)
					C.nextPiece()
				}
				if (!gameOver) C.placePiece()
			}
		}
	}

	C.render = () => {
		return <div id={C.props.id} ref={node => (grid = node)} />
	}

	return C
}

export default BoardComponent
