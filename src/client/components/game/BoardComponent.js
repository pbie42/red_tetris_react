import React, { Component } from 'react'
import { prependZero } from '../../utils'

function BoardComponent(props) {
	const C = new Component(props)
	let grid

	C.componentDidMount = function() {
		console.log(`grid mounted`, grid)
		C.buildBoard()
	}

	C.buildBoard = function() {
		console.log(`grid`, grid)
		for (let i = 0; i < 20; i++) {
			const row = document.createElement('div')
			row.setAttribute('id', `row-${i}`)
			for (let x = 0; x < 10; x++) {
				const square = document.createElement('div')
				square.setAttribute('id', `col-${x}`)
				row.appendChild(square)
			}
			grid.appendChild(row)
		}
	}

	C.render = () => {
		return <div id="player-grid" ref={node => (grid = node)} />
	}

	return C
}

export default BoardComponent
