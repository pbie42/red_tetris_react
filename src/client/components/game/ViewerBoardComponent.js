import React, { Component } from 'react'
import { newBoard } from '../../utils'

function ViewerBoardComponent(props) {
	const C = new Component(props)
	let grid

	C.state = {
		board: []
	}

	C.componentDidMount = function() {
		C.state.board = newBoard()
		C.buildBoard()
	}

	C.componentDidUpdate = function() {
		C.buildBoard()
	}

	C.buildBoard = function() {
		grid.innerHTML = ''
		for (let i = 0; i < C.props.board.length; i++) {
			if (i < 4) continue
			if (i > 23) continue
			const row = document.createElement('div')
			row.setAttribute('id', `row-${i - 4}`)
			for (let x = 0; x < C.props.board[i].length; x++) {
				if (x > 9) continue
				const square = document.createElement('div')
				square.setAttribute('id', `col-${x}`)
				C.setColorClass(i, x, square)
				row.appendChild(square)
			}
			grid.appendChild(row)
		}
		console.log(`grid`, grid)
	}

	C.setColorClass = function(i, x, square) {
		if (C.props.board[i][x] === 'i') square.setAttribute('class', 'cyan')
		if (C.props.board[i][x] === 'j') square.setAttribute('class', 'blue')
		if (C.props.board[i][x] === 'l') square.setAttribute('class', 'orange')
		if (C.props.board[i][x] === 'o') square.setAttribute('class', 'yellow')
		if (C.props.board[i][x] === 's') square.setAttribute('class', 'green')
		if (C.props.board[i][x] === 't') square.setAttribute('class', 'purple')
		if (C.props.board[i][x] === 'z') square.setAttribute('class', 'red')
	}

	C.render = () => {
		return <div id={C.props.id} ref={node => (grid = node)} />
	}

	return C
}

export default ViewerBoardComponent
