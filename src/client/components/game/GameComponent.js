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

	C.verifyUserHandled = function() {
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
		console.log(`CONNECTED!!!!!!!!!!!!!!!!!`)
		if (!C.props.username) {
			if (verifyUsername(player, C.props.users)) {
				console.log(`username not set`)
				C.updateUser(player)
			} else {
				console.log(`username already taken`)
				C.props.errorUsernameTaken()
				C.props.history.push('/error')
			}
		}
		return true
	}

	C.handleRoom = function(room, player) {
		console.log(`ROOOOOMMMMM TIIMMMEEEE !!!!!!!`)
		if (verifyRoomName(room, C.props.rooms)) {
			C.props.addRoom(room, [player])
			C.setState({ room })
			console.log(`room added`)
		} else {
			console.log(`room exists`)
			C.setState({ room })
			if (verifyMemberCount(C.props.rooms, room)) {
				if (verifyMembers(C.props.username, room, C.props.rooms))
					C.props.addUserToRoom(C.props.username, room)
				else {
					console.log(`already room member member`)
				}
			} else {
				C.props.errorTooManyMembers()
				C.props.history.push('/error')
				console.log(`too many members`)
			}
		}
		return true
	}

	C.componentDidUpdate = function() {
		const { connection, usersReceived, roomsReceived, usernameIsSet } = C.props
		const url = C.props.match.params.game
		if (!verifyUrl(url)) C.props.history.push('/')
		console.log(`url`, url)
		const { room, player } = parseUrl(url)
		console.log(`room`, room)
		console.log(`player`, player)
		console.log(`usernameIsSet`, usernameIsSet)
		if (C.verifyConnection()) doneUser = C.handlePlayer(player)
		if (C.verifyUserHandled()) doneRoom = C.handleRoom(room, player)
	}

	C.componentCleanup = function() {
		// C.props.removeUserFromRoom(C.props.username, C.state.room)
		// C.props.removeUser(C.props.username)
	}

	C.updateUser = function(player) {
		C.props.setUsername(player)
		C.props.addUser(player)
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
