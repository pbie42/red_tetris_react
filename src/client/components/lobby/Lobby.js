import React, { Component } from 'react'

function ChatComponent(props) {
	const C = new Component()

	C.state = {
		hide: true
	}

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
				<div className={C.props.showNewRoom ? 'hide' : ''} />
				<div className={C.props.showNewRoom ? 'hide' : ''}>
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
							<div onClick={() => C.props.hideNewRoom()}>Create</div>
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
						<div onClick={() => C.props.showNewRoom()}>+</div>
					</div>
				</div>
			</div>
		)
	}

	return C
}

function LobbyComponent(props) {
	const C = new Component()

	C.state = {
		hide: true
	}

	C.componentDidMount = function() {
		// console.log(`C`, C)
	}

	C.showNewRoom = function() {
		C.setState({ hide: false })
	}

	C.hideNewRoom = function() {
		C.setState({ hide: true })
	}

	C.render = () => {
		return (
			<div className="container-lobby">
				<RoomsComponent showNewRoom={C.showNewRoom} />
				<ChatComponent showNewRoom={C.state.hide} hideNewRoom={C.hideNewRoom} />
			</div>
		)
	}
	return C
}

export default LobbyComponent
