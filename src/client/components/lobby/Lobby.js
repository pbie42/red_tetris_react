import React, { Component } from 'react'
import { RoomsContainer } from '../../containers/lobby/rooms/RoomsContainer'
import { ChatContainer } from '../../containers/lobby/chat/ChatContainer'

function LobbyComponent(props) {
	const C = new Component()

	C.componentWillMount = function() {
		if (!C.props.username) {
			props.history.push('/')
		}
	}

	console.log(`C.props.match`, props.match)

	C.state = {
		hide: true,
		display: false
	}

	C.componentWillUnmount = function() {
		C.props.removeUser(C.props.username)
	}

	C.showNewRoom = function() {
		C.setState({ hide: false, display: true })
	}

	C.hideNewRoom = function() {
		C.setState({ hide: true })
		function delayDisplay() {
			C.setState({ display: false })
		}
		setTimeout(delayDisplay, 500)
	}

	C.render = () => {
		return (
			<div className="container-lobby">
				<RoomsContainer
					showNewRoom={C.showNewRoom}
					hideInput={C.state.hide}
					hideNewRoom={C.hideNewRoom}
				/>
				<ChatContainer
					showNewRoom={C.state.hide}
					hideNewRoom={C.hideNewRoom}
					display={C.state.display}
				/>
			</div>
		)
	}
	return C
}

export default LobbyComponent
