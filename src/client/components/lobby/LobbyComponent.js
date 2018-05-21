import React, { Component } from 'react'
import { RoomsContainer } from '../../containers/lobby/rooms/RoomsContainer'
import { ChatContainer } from '../../containers/lobby/chat/ChatContainer'

function LobbyComponent(props) {
	const C = new Component(props)

	C.state = {
		change: false
	}

	C.componentWillMount = function() {
		if (!C.props.username) {
			C.props.history.push('/')
		}
	}

	C.state = {
		hide: true,
		display: false
	}

	C.componentWillUnmount = function() {
		// C.props.userRemove(C.props.username)
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

	C.pageChange = function() {
		C.setState({ change: true })
	}

	C.render = () => {
		return (
			<div
				className={
					!C.state.change ? 'container-lobby' : 'container-lobby container-fade'
				}
			>
				<RoomsContainer
					showNewRoom={C.showNewRoom}
					hideInput={C.state.hide}
					hideNewRoom={C.hideNewRoom}
					history={C.props.history}
					pageChange={C.pageChange}
					change={C.state.change}
				/>
				<ChatContainer
					showNewRoom={C.state.hide}
					hideNewRoom={C.hideNewRoom}
					display={C.state.display}
					history={C.props.history}
					pageChange={C.pageChange}
					change={C.state.change}
				/>
			</div>
		)
	}
	return C
}

export default LobbyComponent
