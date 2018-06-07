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

	C.componentDidMount = function () {
		C.buildBoard()
		window.addEventListener('keydown', C.handleKeydown)
	}

	C.componentDidUpdate = function () {
		let { board, piece, savedBoard, current } = C.state
		const { countDown, roomId, roomName, username } = C.props
		if (countDown && !C.state.countDown) {
			setTimeout(() => {
				C.state.interval = setInterval(function () {
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

	C.componentWillUnmount = function () {
		clearInterval(C.state.interval)
		window.removeEventListener('keydown', C.handleKeydown)
	}

	C.handleUpdate = function (board, savedBoard) {
		let { userId, roomName, username, doneUser, doneRoom } = C.props
		if (savedBoard.length > 0)
			C.setState({ savedBoard: checkLines(savedBoard) })
		if (doneUser && doneRoom)
			C.props.gameBoardUpdate(board, userId, roomName, username)
	}

	C.buildBoard = function () {
		let color = ''
		if (grid) {
			grid.innerHTML = ''
			for (let i = 0; i < C.state.board.length; i++) {
				if (i < 4 || i > 23) continue
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

	C.setHandleBuild = function (piece, board, savedBoard) {
		C.setState({ board: handlePiece(piece, board, savedBoard) })
		C.handleUpdate(board, savedBoard)
		C.buildBoard()
	}

	C.handleGameOver = function () {
		clearInterval(C.state.interval)
		C.props.gameOver()
	}

	C.handleNewPiece = function () {
		let { board, piece, savedBoard, current } = C.state
		let { roomId, roomName, username } = C.props
		C.props.gameNewPiece(roomId, roomName, username)
		if (current === 90)
			C.props.gameNewPieces(C.props.roomId, C.props.roomName)
		piece = nextPiece(piece, C.props.piece)
		C.setState({ current: ++current })
		if (!gameOver) C.setHandleBuild(piece, board, savedBoard)
	}

	C.handleKeydown = function (event) {
		const leftArrow = 37
		const upArrow = 38
		const rightArrow = 39
		const downArrow = 40
		let result
		let { board, piece, savedBoard } = C.state
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
