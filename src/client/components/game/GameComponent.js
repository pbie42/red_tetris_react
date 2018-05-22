import React, { Component } from 'react'
import {
	verifyConnection,
	verifyCreatorMessage,
	verifyGameStart,
	verifyMemberCount,
	verifyMembers,
	verifyPlayerHandled,
	verifyPlayerMessage,
	verifyRoomName,
	verifyUsername,
	verifyUrl,
	parseUrl
} from '../../utils/'

import { BoardContainer } from '../../containers/game/BoardContainer'
import { ViewerBoardContainer } from '../../containers/game/ViewerBoardContainer'
import LeftBoardsComponent from './LeftBoardsComponent'
import RightBoardsComponent from './RightBoardsComponent'
import GameMessageComponent from './GameMessageComponent'

function GameComponent(props) {
	const C = new Component(props)
	let doneUser = false
	let doneRoom = false

	C.state = {
		connection: false,
		room: '',
		interval: '',
		countdownInterval: '',
		message: '',
		exitText: '',
		change: false,
		gameStarted: false,
		msgStart: 'Press Space to Start',
		msgWaitPlayers: 'Or wait for more players',
		msgWaitCreator: 'Waiting for creator to start game',
		msgGameStarting: 'Game starting in 5...'
	}

	C.componentDidMount = function() {
		C.state.interval = setInterval(C.flashMessage, 1000)
		window.addEventListener('beforeunload', C.componentCleanup)
		window.addEventListener('keydown', e => C.handleSpaceBar(e))
	}

	C.componentDidUpdate = function() {
		const url = C.props.match.params.game
		if (!verifyUrl(url)) C.props.history.push('/')
		const { room, player } = parseUrl(url)
		if (verifyConnection(props, doneUser)) doneUser = C.handlePlayer(player)
		if (verifyPlayerHandled(props, doneUser, doneRoom)) {
			doneRoom = C.handleRoom(room, player)
			C.props.gameRoomSet(room)
			C.props.gameJoined(room)
		}
	}

	C.componentWillUnmount = function() {
		C.componentCleanup()
		window.removeEventListener('keydown', e => C.handleSpaceBar(e))
	}

	C.componentCleanup = function() {
		C.props.roomRemoveUser(C.props.username, C.state.room)
		C.props.gameClear()
		clearInterval(C.state.interval)
		window.removeEventListener('keydown', e => C.handleSpaceBar(e))
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
			C.setState({ gameStarted: true, message: 'GO!' })
			clearInterval(C.state.interval)
		}
	}

	C.handlePlayer = function(player) {
		if (!C.props.username)
			if (verifyUsername(player, C.props.users)) C.updateUser(player)
			else C.errorUsername()
		return true
	}

	C.handleRoom = function(room, player) {
		if (verifyRoomName(room, C.props.rooms)) C.updateRoom(room, player)
		else {
			C.setState({ room })
			if (verifyMemberCount(C.props.rooms, room)) {
				if (verifyMembers(player, room, C.props.rooms))
					C.props.roomAddUser(C.props.username, room)
			} else C.errorTooManyMembers()
		}
		return true
	}

	C.handleSpaceBar = function(event) {
		if (doneUser && doneRoom && event.keyCode === 32) {
			if (C.props.userId && C.props.roomName) {
				C.props.gameStart(C.props.roomName, C.props.userId)
			}
		}
	}

	C.updateUser = function(player) {
		C.props.userSetUsername(player)
		C.props.userAdd(player)
	}

	C.updateRoom = function(room, player) {
		C.props.roomAdd(room, [player])
		C.setState({ room })
	}

	C.errorUsername = function() {
		C.props.errorUsernameTaken()
		C.props.history.push('/error')
	}

	C.errorTooManyMembers = function() {
		C.props.errorTooManyMembers()
		C.props.history.push('/error')
	}

	C.showExitText = function() {
		C.setState({ exitText: 'Exit/Quit Game to Lobby?' })
	}

	C.hideExitText = function() {
		C.setState({ exitText: '' })
	}

	C.quitToLobby = function() {
		C.setState({ change: true })
		setTimeout(C.changeRoute, 800)
	}

	C.changeRoute = function() {
		C.props.history.push(`/lobby`)
	}

	C.gameOver = function() {
		C.setState({ message: 'Game Over!' })
	}

	C.render = () => {
		return (
			<div
				className={
					!C.state.change
						? 'container-game'
						: 'container-game container-fade'
				}
			>
				<div>
					<div
						onMouseEnter={() => C.showExitText()}
						onMouseLeave={() => C.hideExitText()}
						onClick={() => C.quitToLobby()}
					>
						<i className="fas fa-long-arrow-alt-left" />
					</div>
					<div>
						<h1>{C.state.exitText}</h1>
					</div>
				</div>
				{!C.props.connection ? (
					<i className="fas fa-spinner fa-pulse" />
				) : (
					<div className="container-boards">
						<LeftBoardsComponent boards={C.props.boards} />
						<div
							className={
								!C.state.change
									? 'player-main moveInDivTop'
									: 'player-main moveOutDivDown'
							}
						>
							<GameMessageComponent
								userId={C.props.userId}
								roomId={C.props.roomId}
								message={C.state.message}
							/>
							<BoardContainer
								id="player-grid"
								doneRoom={doneRoom}
								doneUser={doneUser}
								gameOver={C.gameOver}
								gameStarted={C.state.gameStarted}
							/>
						</div>
						<RightBoardsComponent boards={C.props.boards} />
					</div>
				)}
			</div>
		)
	}
	return C
}

export default GameComponent
