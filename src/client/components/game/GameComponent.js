import React, { Component } from 'react'
import { parseUrl } from '../../utils/parse_url'

function GameComponent(props) {
	const C = new Component()

	C.componentWillMount = function() {
		const url = props.match.params.game
		if (
			url.indexOf('[') < 0 ||
			url.indexOf(']') < 0 ||
			url[url.length - 1] !== ']'
		)
			props.history.push('/')
		const { room, player } = parseUrl(url)
		console.log(`room`, room)
		console.log(`player`, player)
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
