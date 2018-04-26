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
					<div>
						<h1 className="neon-red">Rooms</h1>
					</div>
					<div>
						<h1 className="neon-blue">Chat</h1>
					</div>
				</div>
			</div>
		)
	}
	return C
}

export default LobbyComponent
