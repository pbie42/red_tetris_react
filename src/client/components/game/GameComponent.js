import React, { Component } from 'react'
import {
	verifyMemberCount,
	verifyMembers,
	verifyRoomName,
	verifyUsername,
	verifyUrl,
	parseUrl
} from '../../utils/'

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

	C.componentDidMount = function() {
		console.log(`NOT CONNECTED`)
		window.addEventListener('beforeunload', C.componentCleanup)
	}

	C.componentDidUpdate = function() {
		const { connection, usersReceived, roomsReceived, usernameIsSet } = C.props
		const url = C.props.match.params.game
		if (!verifyUrl(url)) C.props.history.push('/')
		const { room, player } = parseUrl(url)
		if (C.verifyConnection()) doneUser = C.handlePlayer(player)
		if (C.verifyPlayerHandled()) doneRoom = C.handleRoom(room, player)
	}

	C.componentCleanup = function() {
		// C.props.removeUserFromRoom(C.props.username, C.state.room)
		// C.props.removeUser(C.props.username)
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
		if (!C.props.username) {
			if (verifyUsername(player, C.props.users)) C.updateUser(player)
			else C.errorUsername()
		}
		return true
	}

	C.handleRoom = function(room, player) {
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
			<div className="container-game">
				{!C.props.connection ? (
					<i className="fas fa-spinner fa-pulse" />
				) : (
					<h1>{C.props.connection ? 'CONNECTED' : 'NOT CONNECTED'}</h1>
				)}
			</div>
		)
	}
	return C
}

export default GameComponent
