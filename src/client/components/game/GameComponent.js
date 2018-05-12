import React, { Component } from 'react'
import { parseUrl } from '../../utils/parse_url'

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
			if (
				url.indexOf('[') < 0 ||
				url.indexOf(']') < 0 ||
				url[url.length - 1] !== ']'
			)
				C.props.history.push('/')
			if (!C.props.username) {
				if (C.verifyUsername(player)) {
					console.log(`username not set`)
					C.props.setUsername(player)
					C.props.addUser(player)
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
			if (C.verifyRoomName(room)) {
				C.props.addRoom(room, [player])
				C.setState({ room })
				console.log(`room added`)
			} else {
				console.log(`room exists`)
				C.setState({ room })
				if (C.verifyMemberCount(room)) {
					if (C.verifyMembers(C.props.username, room))
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

	C.componentCleanup = function() {
		// C.props.removeUserFromRoom(C.props.username, C.state.room)
		// C.props.removeUser(C.props.username)
	}

	C.verifyMemberCount = function(roomName) {
		const room = C.props.rooms.find(room => room.roomName === roomName)
		if (room.members.length < 5) return true
		return false
	}

	C.verifyMembers = function(username, roomName) {
		console.log(`C.props`, C.props)
		const room = C.props.rooms.find(room => room.roomName === roomName)
		console.log(`room verify`, room)
		const user = room.members.find(member => {
			console.log(`member`, member)
			console.log(`username`, username)
			return member === username
		})
		console.log(`user`, user)
		console.log(`room.members`, room.members)
		if (user) {
			console.log(`already a member`)
			return false
		} else return true
	}

	C.verifyRoomName = function(value) {
		const index = C.props.rooms.findIndex(room => value === room.roomName)
		console.log(`C.props.rooms`, C.props.rooms)
		console.log(`index`, index)
		if (index < 0) return true
		return false
	}

	C.verifyUsername = function(value) {
		const index = C.props.users.findIndex(user => value === user.name)
		if (index >= 0) return false
		return true
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
