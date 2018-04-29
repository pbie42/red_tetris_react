import React, { Component } from 'react'

function ChatComponent(props) {
	const C = new Component()

	C.render = () => {
		return (
			<div className="lobby-chat-new">
				<div>
					<div>
						<div>
							<h1>Chat</h1>
						</div>
					</div>
					<div>
						<div>
							<h2>test</h2>
						</div>
					</div>
					<div>
						<input type="text" name="" id="" placeholder="Enter message" />
					</div>
				</div>
				<div />
				<div>
					<div>
						<div>
							<h1>New Room</h1>
						</div>
					</div>
					<div className="new-room-inputs">
						<div>
							<div>
								<input type="text" name="" id="" placeholder="Room Name" />
							</div>
							<div>
								<input type="text" name="" id="" placeholder="Room Name" />
							</div>
							<div>
								<input type="text" name="" id="" placeholder="Room Name" />
							</div>
						</div>
					</div>
					<div>
						<div>
							<div>Create</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return C
}

function RoomsComponent(props) {
	const C = new Component()

	C.render = () => {
		return (
			<div className="lobby-rooms">
				<div>
					<div />
					<div>
						<div>
							<div>
								<h1>Rooms</h1>
							</div>
						</div>
						<div>
							<div>
								<h2>test</h2>
							</div>
						</div>
					</div>
					<div>
						<div>+</div>
					</div>
				</div>
			</div>
		)
	}

	return C
}

function LobbyComponent(props) {
	const C = new Component()

	C.componentDidMount = function() {
		// console.log(`C`, C)
	}

	C.render = () => {
		return (
			<div className="container-lobby">
				<RoomsComponent />
				<ChatComponent />
			</div>
		)
	}
	return C
}

export default LobbyComponent
