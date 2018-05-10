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
				<RoomsContainer showNewRoom={C.showNewRoom} hideInput={C.state.hide} />
				<ChatContainer showNewRoom={C.state.hide} hideNewRoom={C.hideNewRoom} />
			</div>
		)
	}
	return C
}

export default LobbyComponent
