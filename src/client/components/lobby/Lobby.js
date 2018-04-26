import React, { Component } from 'react'

function LobbyComponent(props) {
	const C = new Component()

	C.componentDidMount = function() {
		// console.log(`C`, C)
	}

	C.render = () => {
		return (
			<div className="container-lobby">
				<div className="lobby-rooms">
					<div>
						<h1 className="neon-red">Rooms</h1>
					</div>
				</div>
				<div className="lobby-chat">
					<div>
						<h1 className="neon-red">Chat</h1>
					</div>
					<div>
						<div>
							<h1>test</h1>
						</div>
					</div>
				</div>
			</div>
		)
	}
	return C
}

export default LobbyComponent
