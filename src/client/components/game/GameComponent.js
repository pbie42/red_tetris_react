import React, { Component } from 'react'
import {
	verifyConnection,
	verifyMemberCount,
	verifyMembers,
	verifyPlayerHandled,
	verifyRoomName,
	verifyUsername,
	verifyUrl,
	parseUrl
} from '../../utils/'

import { BoardContainer } from '../../containers/game/BoardContainer'
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
		exitText: '',
		change: false,
		gameStarted: false,
		gameOver: false,
		mounted: false
	}

	C.componentDidMount = function () {
		C.setState({ mounted: true })
		window.addEventListener('beforeunload', C.componentCleanup)
		window.addEventListener('keydown', C.handleSpaceBar)
	}

	C.componentDidUpdate = function () {
		const url = C.props.match.params.game
		if (!verifyUrl(url)) C.props.history.push('/')
		const { room, player } = parseUrl(url)
		if (verifyConnection(C.props, doneUser)) doneUser = C.handlePlayer(player)
		if (verifyPlayerHandled(C.props, doneUser, doneRoom)) {
			doneRoom = C.handleRoom(room, player)
			C.props.gameRoomSet(room)
			C.props.gameJoined(room)
		}
	}

	C.componentWillUnmount = function () {
		C.componentCleanup()
		window.removeEventListener('keydown', C.handleSpaceBar)
		console.log(`component unmounting`)
	}

	C.componentCleanup = function () {
		C.props.roomRemoveUser(C.props.username, C.props.userId, C.props.roomName)
		C.props.gameClear(C.props.roomName)
		clearInterval(C.state.interval)
		window.removeEventListener('keydown', C.handleSpaceBar)
	}

	C.handlePlayer = function (player) {
		if (!C.props.username)
			if (verifyUsername(player, C.props.users)) C.updateUser(player)
			else C.errorUsername()
		return true
	}

	C.handleRoom = function (room, player) {
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

	C.handleSpaceBar = function (event) {
		console.log(`C.props.roomName GAME`, C.props.roomName)
		if (doneUser && doneRoom && event.keyCode === 32)
			if (C.props.userId && C.props.roomName)
				C.props.gameStart(C.props.roomName, C.props.userId)
	}

	C.updateUser = function (player) {
		C.props.userSetUsername(player)
		C.props.userAdd(player)
	}

	C.updateRoom = function (room, player) {
		C.props.roomAdd(room, [player])
		C.setState({ room })
	}

	C.errorUsername = function () {
		C.props.errorUsernameTaken()
		C.props.history.push('/error')
	}

	C.errorTooManyMembers = function () {
		C.props.errorTooManyMembers()
		C.props.history.push('/error')
	}

	C.showExitText = function () {
		C.setState({ exitText: 'Exit/Quit Game to Lobby?' })
	}

	C.hideExitText = function () {
		C.setState({ exitText: '' })
	}

	C.quitToLobby = function () {
		C.setState({ change: true })
		setTimeout(C.changeRoute, 800)
	}

	C.changeRoute = function () {
		C.props.history.push(`/lobby`)
	}

	C.gameStart = function () {
		C.setState({ gameStarted: true })
	}

	C.gameOver = function () {
		if (!C.state.gameOver) C.setState({ gameOver: true })
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
									roomName={C.props.roomName}
									message={C.state.message}
									gameLobbyNewMessage={C.props.gameLobbyNewMessage}
									countDown={C.props.countDown}
									gameStart={C.gameStart}
									gameOver={C.state.gameOver}
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
