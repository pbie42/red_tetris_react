import React, { Component } from 'react'
import {
	verifyCreatorMessage,
	verifyGameStart,
	verifyPlayerMessage
} from '../../utils'

function GameMessageComponent(props) {
	const C = new Component(props)

	C.state = {
		message: '',
		msgStart: 'Press Space to Start',
		msgWaitPlayers: 'Or wait for more players',
		msgWaitCreator: 'Waiting for creator to start game',
		msgGameStarting: 'Game starting in 5...',
		interval: ''
	}

	C.componentDidMount = function() {
		C.state.interval = setInterval(C.flashMessage, 1000)
	}

	C.componentWillUnmount = function() {
		clearInterval(C.state.interval)
	}

	C.flashMessage = function() {
		C.handleCreatorMessage()
		C.handlePlayerMessage()
		if (C.props.countDown) C.handleCountdownMessage()
	}

	C.handleCreatorMessage = function() {
		const { message, msgStart, msgWaitPlayers } = C.state
		if (verifyCreatorMessage(C.props, message, msgStart))
			C.setState({ message: msgWaitPlayers })
		else if (verifyCreatorMessage(C.props, message, msgWaitPlayers))
			C.setState({ message: msgStart })
	}

	C.handlePlayerMessage = function() {
		const { message, msgStart, msgWaitCreator } = C.state
		if (verifyPlayerMessage(C.props, message, msgStart))
			C.setState({ message: msgWaitCreator })
		else if (verifyPlayerMessage(C.props, message, msgWaitCreator))
			C.setState({ message: '' })
	}

	C.handleCountdownMessage = function() {
		const { message, msgGameStarting } = C.state
		if (verifyGameStart(C.state)) C.setState({ message: msgGameStarting })
		else if (message === msgGameStarting) C.setState({ message: '4' })
		else if (message === '4') C.setState({ message: '3' })
		else if (message === '3') C.setState({ message: '2' })
		else if (message === '2') C.setState({ message: '1' })
		else if (message === '1') {
			C.props.gameStart()
			C.setState({ message: 'GO!' })
			clearInterval(C.state.interval)
		}
	}

	C.render = () => {
		return (
			<div>
				{C.props.userId === C.props.roomId ? (
					<h1>{C.state.message}</h1>
				) : (
					<h1> </h1>
				)}
				{C.props.userId !== C.props.roomId ? (
					<h1>{C.state.message}</h1>
				) : (
					<h1> </h1>
				)}
			</div>
		)
	}

	return C
}

export default GameMessageComponent
