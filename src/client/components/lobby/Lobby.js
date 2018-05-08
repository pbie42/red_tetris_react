import React, { Component } from 'react'
import { RoomsComponent } from './rooms/RoomsComponent'
import { ChatComponent } from './chat/ChatComponent'
import { ChatContainer } from '../../containers/lobby/chat/ChatContainer'

function LobbyComponent(props) {
	const C = new Component()

	C.componentWillMount = function() {
		// if (!C.props.username) {
		// 	props.history.push('/')
		// }
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
				<RoomsComponent showNewRoom={C.showNewRoom} />
				<ChatContainer showNewRoom={C.state.hide} hideNewRoom={C.hideNewRoom} />
			</div>
		)
	}
	return C
}

export default LobbyComponent
