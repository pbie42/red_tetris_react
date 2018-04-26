import React, { Component } from 'react'

function LobbyComponent(props) {
	const C = new Component()

	C.componentDidMount = function() {
		// console.log(`C`, C)
	}

	C.render = () => {
		return (
			<div className="container-lobby">
				<div className="lobby">
					<h1>SUPPPPP</h1>
				</div>
			</div>
		)
	}
	return C
}

export default LobbyComponent
