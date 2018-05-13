import React, { Component } from 'react'
import { prependZero, pieceOrder } from '../../utils'

function BoardComponent(props) {
	const C = new Component(props)
	let grid

	C.state = {
		board: [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 'l', 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 'l', 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 'l', 'l', 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		],
		pieces: []
	}

	C.componentDidMount = function() {
		C.setState({ pieces: pieceOrder() })
		C.buildBoard()
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

	C.buildBoard = function() {
		for (let i = 0; i < C.state.board.length; i++) {
			const row = document.createElement('div')
			row.setAttribute('id', `row-${i}`)
			for (let x = 0; x < C.state.board[i].length; x++) {
				const square = document.createElement('div')
				square.setAttribute('id', `col-${x}`)
				C.setColorClass(i, x, square)
				row.appendChild(square)
			}
			grid.appendChild(row)
		}
	}

	C.render = () => {
		return <div id={C.props.id} ref={node => (grid = node)} />
	}

	return C
}

export default BoardComponent
