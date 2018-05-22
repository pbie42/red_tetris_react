import React, { Component } from 'react'
import {
	verifyCreatorMessage,
	verifyMemberCount,
	verifyMembers,
	verifyPlayerMessage,
	verifyRoomName,
	verifyUsername,
	verifyUrl,
	parseUrl
} from '../../utils/'

import { BoardContainer } from '../../containers/game/BoardContainer'
import { ViewerBoardContainer } from '../../containers/game/ViewerBoardContainer'

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
		gameStarted: false
	}

	C.componentWillUnmount = function() {
		C.componentCleanup()
		window.removeEventListener('keydown', e => C.handleSpaceBar(e))
	}

	C.componentDidMount = function() {
		C.state.interval = setInterval(C.flashMessage, 1000)
		window.addEventListener('beforeunload', C.componentCleanup)
	}

	C.componentCleanup = function() {
		C.props.gameRoomUnset(C.state.room)
		C.props.roomRemoveUser(C.props.username, C.state.room)
		C.props.gameRemoveBoards()
		C.props.gameRemoveId()
		C.props.gameRemoveMembers()
		clearInterval(C.state.interval)
		window.removeEventListener('keydown', e => C.handleSpaceBar(e))
	}

	C.componentDidUpdate = function() {
		const url = C.props.match.params.game
		if (!verifyUrl(url)) C.props.history.push('/')
		const { room, player } = parseUrl(url)
		if (C.verifyConnection()) doneUser = C.handlePlayer(player)
		if (C.verifyPlayerHandled()) {
			doneRoom = C.handleRoom(room, player)
			C.props.gameRoomSet(room)
			C.props.gameJoined(room)
		}
	}

	C.flashMessage = function() {
		const { message } = C.state
		const msgStart = 'Press Space to Start'
		const msgWaitPlayers = 'Or wait for more players'
		const msgWaitCreator = 'Waiting for creator to start game'
		if (verifyCreatorMessage(C.props, message, msgStart))
			C.setState({ message: msgWaitPlayers })
		else if (verifyCreatorMessage(C.props, message, msgWaitPlayers))
			C.setState({ message: msgStart })
		if (verifyPlayerMessage(C.props, message, msgStart))
			C.setState({ message: msgWaitCreator })
		else if (verifyPlayerMessage(C.props, message, msgWaitCreator))
			C.setState({ message: '' })
		if (C.props.countDown) {
			if (
				message === msgStart ||
				message === msgWaitPlayers ||
				message === msgWaitCreator ||
				message === ''
			) {
				C.setState({ message: 'Game starting in 5...' })
			} else if (C.state.message === 'Game starting in 5...')
				C.setState({ message: '4' })
			else if (message === '4') C.setState({ message: '3' })
			else if (message === '3') C.setState({ message: '2' })
			else if (message === '2') C.setState({ message: '1' })
			else if (message === '1') {
				C.setState({ gameStarted: true, message: 'GO!' })
				clearInterval(C.state.interval)
			}
		}
	}

	C.handleSpaceBar = function(event) {
		if (doneUser && doneRoom && event.keyCode === 32) {
			if (C.props.userId && C.props.roomName) {
				C.props.gameStart(C.props.roomName, C.props.userId)
			}
		}
	}

	C.verifyConnection = function() {
		if (
			C.props.connection &&
			C.props.usersReceived &&
			C.props.roomsReceived &&
			!C.propsusernameIsSet &&
			!doneUser
		)
			return true
		return false
	}

	C.verifyPlayerHandled = function() {
		if (
			C.props.connection &&
			C.props.usersReceived &&
			C.props.roomsReceived &&
			C.props.usernameIsSet &&
			doneUser &&
			!doneRoom
		)
			return true
		return false
	}

	C.handlePlayer = function(player) {
		// console.log(`HANDLE PLAYERRRRRRR`)
		if (!C.props.username) {
			if (verifyUsername(player, C.props.users)) C.updateUser(player)
			else C.errorUsername()
		}
		return true
	}

	C.handleRoom = function(room, player) {
		// console.log(`HANDLE ROOOOOMMMMMMMM`)
		if (verifyRoomName(room, C.props.rooms)) C.updateRoom(room, player)
		else {
			C.setState({ room })
			if (verifyMemberCount(C.props.rooms, room)) {
				if (verifyMembers(player, room, C.props.rooms))
					C.props.roomAddUser(C.props.username, room)
				// else console.log(`already room member member`)
			} else C.errorTooManyMembers()
		}
		return true
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
		// console.log(`quitting to lobby`)
		C.setState({ change: true })
		function delayRouteChange() {
			C.props.history.push(`/lobby`)
		}
		// C.props.pageChange()
		setTimeout(delayRouteChange, 800)
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
				onKeyDown={e => C.handleSpaceBar(e)}
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
					// <h1>{C.props.connection ? 'CONNECTED' : 'NOT CONNECTED'}</h1>
					<div className="container-boards">
						<div
							className={
								C.props.boards[0] || C.props.boards[2]
									? 'players-others moveInDivRight showBackground'
									: 'players-others moveInDivRight'
							}
						>
							{C.props.boards[0] ? (
								<ViewerBoardContainer
									board={C.props.boards[0].board}
									username={C.props.boards[0].username}
									id="others-grid"
								/>
							) : (
								''
							)}
							{C.props.boards[2] ? (
								<ViewerBoardContainer
									id="others-grid"
									board={C.props.boards[2].board}
									username={C.props.boards[2].username}
								/>
							) : (
								''
							)}
						</div>
						<div
							className={
								!C.state.change
									? 'player-main moveInDivTop'
									: 'player-main moveOutDivDown'
							}
						>
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
							<BoardContainer
								id="player-grid"
								doneRoom={doneRoom}
								doneUser={doneUser}
								gameOver={C.gameOver}
								gameStarted={C.state.gameStarted}
							/>
						</div>
						<div
							className={
								C.props.boards[1] || C.props.boards[3]
									? 'players-others moveInDivLeft showBackground'
									: 'players-others moveInDivLeft'
							}
						>
							{C.props.boards[1] ? (
								<ViewerBoardContainer
									id="others-grid"
									board={C.props.boards[1].board}
									username={C.props.boards[1].username}
								/>
							) : (
								''
							)}
							{C.props.boards[3] ? (
								<ViewerBoardContainer
									id="others-grid"
									board={C.props.boards[3].board}
									username={C.props.boards[3].username}
								/>
							) : (
								''
							)}
						</div>
					</div>
				)}
			</div>
		)
	}
	return C
}

export default GameComponent
