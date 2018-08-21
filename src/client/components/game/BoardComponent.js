import React, { Component } from 'react'
import {
	checkLines,
	handlePiece,
	movePieceLeft,
	movePieceRight,
	movePieceDown,
	newBoard,
	nextPiece,
	rotatePieces,
	setColorClass
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
			position: 0,
			set: false
		},
		interval: '',
		current: 0
	}

	C.componentDidMount = function() {
		console.log(`did mount mang`)
		C.buildBoard()
		window.addEventListener('keydown', C.handleKeydown)
	}

	C.componentDidUpdate = function() {
		let { piece, savedBoard, current } = C.state
		const { countDown, roomId, roomName, username, board } = C.props
		if (countDown && !C.state.countDown) {
			setTimeout(() => {
				C.state.interval = setInterval(function() {
					C.handleKeydown({ keyCode: 40 })
				}, 750)
				piece = nextPiece(piece, C.props.piece)
				C.setState({ current: ++current })
				if (!gameOver) C.setHandleBuild(piece, board, savedBoard)
				C.props.gameNewPiece(roomId, roomName, username)
			}, 5000)
			C.state.countDown = true
		}
	}

	C.componentWillUnmount = function() {
		clearInterval(C.state.interval)
		window.removeEventListener('keydown', C.handleKeydown)
	}

	C.clearLines = function(linesToRemove, savedBoard) {
		const { roomName, username } = C.props
		linesToRemove.forEach(line => {
			savedBoard.splice(line, 1)
			savedBoard.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
		})
		if (linesToRemove.length - 1 > 0) {
			console.log(`Enough lines to add!`)
			C.props.gameAddLines(roomName, username, linesToRemove.length - 1)
		}
		return savedBoard
	}

	C.checkLines = function(savedBoard) {
		let board = savedBoard
		let count = 0
		let y = 3
		let linesToRemove = []
		while (++y < 24) {
			let x = -1
			while (++x < 11) if (board[y][x] !== 0 && board[y][x] !== 1) count++
			if (count === 10) linesToRemove.push(y)
			count = 0
		}
		return C.clearLines(linesToRemove, board)
	}

	C.handleUpdate = function(board, savedBoard) {
		let { userId, roomName, username, doneUser, doneRoom } = C.props
		if (savedBoard.length > 0)
			C.setState({ savedBoard: C.checkLines(savedBoard) })
		if (doneUser && doneRoom)
			C.props.gameBoardUpdate(board, userId, roomName, username)
	}

	C.buildBoard = function() {
		let color = ''
		if (grid) {
			grid.innerHTML = ''
			for (let i = 0; i < C.props.board.length; i++) {
				if (i < 4 || i > 23) continue
				const row = document.createElement('div')
				row.setAttribute('id', `row-${i - 4}`)
				for (let x = 0; x < C.props.board[i].length; x++) {
					if (x > 9) continue
					const square = document.createElement('div')
					square.setAttribute('id', `col-${x}`)
					color = setColorClass(i, x, C.props.board)
					square.setAttribute('class', color)
					row.appendChild(square)
				}
				grid.appendChild(row)
			}
		}
	}

	C.setHandleBuild = function(piece, board, savedBoard) {
		// C.setState({ board: handlePiece(piece, board, savedBoard) })
		let newBoard = handlePiece(piece, board, savedBoard)
		C.props.gameSetBoard(newBoard)
		C.handleUpdate(newBoard, savedBoard)
		C.buildBoard()
	}

	C.handleGameOver = function() {
		clearInterval(C.state.interval)
		C.props.gameOver()
	}

	C.handleNewPiece = function() {
		let { piece, savedBoard, current } = C.state
		let { board, roomId, roomName, username } = C.props
		C.props.gameNewPiece(roomId, roomName, username)
		if (current === 90)
			C.props.gameNewPieces(C.props.roomId, C.props.roomName)
		piece = nextPiece(piece, C.props.piece)
		C.setState({ current: ++current })
		if (!gameOver) C.setHandleBuild(piece, board, savedBoard)
	}

	C.handleKeydown = function(event) {
		const leftArrow = 37
		const upArrow = 38
		const rightArrow = 39
		const downArrow = 40
		let result
		let { piece, savedBoard } = C.state
		let { board } = C.props
		if (!gameOver && C.props.gameStarted) {
			switch (event.keyCode) {
				case leftArrow:
					piece.location = movePieceLeft(piece, savedBoard)
					if (!gameOver) C.setHandleBuild(piece, board, savedBoard)
					break

				case upArrow:
					result = rotatePieces(piece, savedBoard)
					piece = result.statePiece
					if (result.success && !gameOver)
						C.setHandleBuild(piece, board, savedBoard)
					break

				case rightArrow:
					piece.location = movePieceRight(piece, savedBoard)
					if (!gameOver) C.setHandleBuild(piece, board, savedBoard)
					break

				case downArrow:
					result = movePieceDown(piece, board, savedBoard)
					gameOver = result.gameOverCheck
					savedBoard = result.savedBoard
					piece.location = result.newLocation
					piece.set = result.set
					if (gameOver) C.handleGameOver()
					if (result.newPiece) C.handleNewPiece()
					if (!gameOver) C.setHandleBuild(piece, board, savedBoard)
					break

				default:
					break
			}
		}
	}

	C.render = () => {
		return <div id={C.props.id} ref={node => (grid = node)} />
	}

	return C
}

export default BoardComponent
