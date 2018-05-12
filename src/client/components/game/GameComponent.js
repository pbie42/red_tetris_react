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
		console.log(`url`, url)
		const { room, player } = parseUrl(url)
		console.log(`room`, room)
		console.log(`player`, player)
		console.log(`usernameIsSet`, usernameIsSet)
		if (
			connection &&
			usersReceived &&
			roomsReceived &&
			!usernameIsSet &&
			!doneUser
		) {
			console.log(`CONNECTED!!!!!!!!!!!!!!!!!`)
			if (!verifyUrl(url)) C.props.history.push('/')
			if (!C.props.username) {
				if (verifyUsername(player, C.props.users)) {
					console.log(`username not set`)
					C.updateUser(player)
				} else {
					console.log(`username already taken`)
					C.props.errorUsernameTaken()
					C.props.history.push('/error')
				}
			} else console.log(`username set already`)
			doneUser = true
		}
		if (
			connection &&
			usersReceived &&
			roomsReceived &&
			usernameIsSet &&
			doneUser &&
			!doneRoom
		) {
			console.log(`ROOOOOMMMMM TIIMMMEEEE !!!!!!!`)
			if (verifyRoomName(room, C.props.rooms)) {
				C.props.addRoom(room, [player])
				C.setState({ room })
				console.log(`room added`)
			} else {
				console.log(`room exists`)
				C.setState({ room })
				if (verifyMemberCount(C.props.rooms, room)) {
					if (verifyMembers(C.props.username, room))
						C.props.addUserToRoom(C.props.username, room)
					else {
						console.log(`already room member member`)
					}
				} else {
					C.props.errorTooManyMembers()
					console.log(`too many members`)
				}
			}
			doneRoom = true
		}
	}

	C.handlePlayer = function(currentProps, player) {
		const {
			connection,
			usersReceived,
			roomsReceived,
			usernameIsSet,
			username,
			users
		} = currentProps
		if (
			connection &&
			usersReceived &&
			roomsReceived &&
			!usernameIsSet &&
			!doneUser
		) {
			console.log(`CONNECTED!!!!!!!!!!!!!!!!!`)
			if (!username) {
				if (verifyUsername(player, users)) {
					console.log(`username not set`)
					C.updateUser(player)
				} else {
					console.log(`username already taken`)
					currentProps.errorUsernameTaken()
					currentProps.history.push('/error')
				}
			} else console.log(`username set already`)
			return true
		} else return false
	}

	C.componentCleanup = function() {
		// C.props.removeUserFromRoom(C.props.username, C.state.room)
		// C.props.removeUser(C.props.username)
	}

	// C.verifyMemberCount = function(roomName) {
	// 	const room = C.props.rooms.find(room => room.roomName === roomName)
	// 	if (room.members.length < 5) return true
	// 	return false
	// }

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
