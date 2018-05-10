import React, { Component } from 'react'

function GameComponent(props) {
	const C = new Component()

	C.componentWillMount = function() {
		const url = props.match.params.game
		console.log(`url`, url)
		if (url[0] !== '#') props.history.push('/')
	}

	C.componentDidMount = function() {
		// console.log(`C`, C)
	}

	C.render = () => {
		return <div className="container-lobby" />
	}
	return C
}

export default GameComponent
