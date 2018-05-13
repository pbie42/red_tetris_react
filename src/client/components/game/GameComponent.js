import React, { Component } from 'react'
import {
	verifyMemberCount,
	verifyMembers,
	verifyRoomName,
	verifyUsername,
	verifyUrl,
	parseUrl
} from '../../utils/'

import BoardComponent from './BoardComponent'

function GameComponent(props) {
	const C = new Component(props)
	let doneUser = false
	let doneRoom = false

	C.state = {
		connection: false,
		room: ''
	}

	C.componentWillMount = function() {
		// console.log(`props`, props)
	}

	C.componentWillUnmount = function() {
		C.props.unsetGameRoom(C.state.room)
		C.props.removeUserFromRoom(C.props.username, C.state.room)
		window.removeEventListener('keydown', e => C.handleSpaceBar(e))
	}

	C.componentDidMount = function() {
		console.log(`NOT CONNECTED`)
		window.addEventListener('beforeunload', C.componentCleanup)
		window.addEventListener('keydown', e => C.handleSpaceBar(e))
	}

	C.componentDidUpdate = function() {
		console.log(`C.props.members`, C.props.members)
		const url = C.props.match.params.game
		if (!verifyUrl(url)) C.props.history.push('/')
		const { room, player } = parseUrl(url)
		if (C.verifyConnection()) doneUser = C.handlePlayer(player)
		if (C.verifyPlayerHandled()) {
			doneRoom = C.handleRoom(room, player)
			C.props.setGameRoom(room)
		}
	}

	C.handleSpaceBar = function(event) {
		console.log(`KeyDown`)
		if (event.keyCode === 32) {
			console.log(`SPACE bar pressed`)
			C.props.gameReady(C.props.roomName, C.props.members, C.props.username)
		}
	}

	C.componentCleanup = function() {
		C.props.unsetGameRoom(C.state.room)
		C.props.removeUserFromRoom(C.props.username, C.state.room)
		C.props.removeUser(C.props.username)
		window.removeEventListener('keydown', e => C.handleSpaceBar(e))
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
		console.log(`HANDLE PLAYERRRRRRR`)
		if (!C.props.username) {
			if (verifyUsername(player, C.props.users)) C.updateUser(player)
			else C.errorUsername()
		}
		return true
	}

	C.handleRoom = function(room, player) {
		console.log(`HANDLE ROOOOOMMMMMMMM`)
		if (verifyRoomName(room, C.props.rooms)) C.updateRoom(room, player)
		else {
			C.setState({ room })
			if (verifyMemberCount(C.props.rooms, room)) {
				if (verifyMembers(player, room, C.props.rooms))
					C.props.addUserToRoom(C.props.username, room)
				else console.log(`already room member member`)
			} else C.errorTooManyMembers()
		}
		return true
	}

	C.updateUser = function(player) {
		C.props.setUsername(player)
		C.props.addUser(player)
	}

	C.updateRoom = function(room, player) {
		C.props.addRoom(room, [player])
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

	C.render = () => {
		return (
			<div className="container-game" onKeyDown={e => C.handleSpaceBar(e)}>
				{!C.props.connection ? (
					<i className="fas fa-spinner fa-pulse" />
				) : (
					// <h1>{C.props.connection ? 'CONNECTED' : 'NOT CONNECTED'}</h1>
					<div className="container-boards">
						<div className="players-others">
							<BoardComponent id="others-grid" />
							<BoardComponent id="others-grid" />
						</div>
						<div className="player-main">
							<BoardComponent id="player-grid" />
						</div>
						<div className="players-others">
							<BoardComponent id="others-grid" />
							<BoardComponent id="others-grid" />
						</div>
					</div>
				)}
			</div>
		)
	}
	return C
}

export default GameComponent
