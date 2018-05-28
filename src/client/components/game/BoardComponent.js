import React, { Component } from 'react'
import {
	movePieceLeft,
	movePieceRight,
	movePieceDown,
	newBoard,
	placePiece,
	placePieces,
	rotatePieces,
	setColorClass,
	setPiecePositionShape
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
		if (current === 90)
			C.props.gameNewPieces(C.props.roomId, C.props.roomName)
		piece.piece = C.props.piece
		C.setState({ current: ++current })
		piece.location = { x: 3, y: 0 }
		setPiecePositionShape(piece)
		if (!gameOver) C.handlePiece()
	}

	C.handlePiece = function() {
		let { savedBoard, piece, board } = C.state
		let { userId, roomName, username, doneUser, doneRoom } = C.props
		const prevBoard = board
		let { location } = piece
		let fillBoard = newBoard()
		let boardY = location.y
		if (savedBoard.length > 0) fillBoard = placePieces(fillBoard, savedBoard)
		if (boardY + 4 > 26) board = prevBoard
		else C.setState({ board: placePiece(piece, fillBoard, location) })
		if (savedBoard.length > 0) C.checkLines()
		if (doneUser && doneRoom)
			C.props.gameBoardUpdate(board, userId, roomName, username)
		C.buildBoard()
	}

	C.buildBoard = function() {
		let color = ''
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
					color = setColorClass(i, x, C.state.board)
					square.setAttribute('class', color)
					row.appendChild(square)
				}
				grid.appendChild(row)
			}
		}
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
				if (!gameOver) C.handlePiece()
			}
			if (event.keyCode === 38) {
				result = rotatePieces(piece, savedBoard)
				piece = result.statePiece
				if (result.success && !gameOver) C.handlePiece()
			}
			if (event.keyCode === 39) {
				piece.location = movePieceRight(piece, savedBoard)
				if (!gameOver) C.handlePiece()
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
				if (!gameOver) C.handlePiece()
			}
		}
	}

	C.render = () => {
		return <div id={C.props.id} ref={node => (grid = node)} />
	}

	return C
}

export default BoardComponent
