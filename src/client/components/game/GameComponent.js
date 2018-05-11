import React, { Component } from 'react'
import { parseUrl } from '../../utils/parse_url'

function GameComponent(props) {
	const C = new Component(props)
	let done = false

	C.state = {
		connection: false,
		room: ''
	}

	C.componentWillMount = function() {
		console.log(`props`, props)
	}

	C.componentDidMount = function() {
		console.log(`Mounted in this bitch`)
		console.log(`NOT CONNECTED`)
	}

	C.componentDidUpdate = function() {
		const { connection, usersReceived, roomsReceived } = C.props
		if (connection && usersReceived && roomsReceived && !done) {
			console.log(`CONNECTED!!!!!!!!!!!!!!!!!`)
			const url = C.props.match.params.game
			if (
				url.indexOf('[') < 0 ||
				url.indexOf(']') < 0 ||
				url[url.length - 1] !== ']'
			)
				C.props.history.push('/')
			const { room, player } = parseUrl(url)
			if (!C.props.username) {
				if (C.verifyUsername(player)) {
					console.log(`username not set`)
					C.props.setUsername(player)
					C.props.addUser(player)
				} else {
					console.log(`username already taken`)
					C.props.history.push('/')
				}
			} else console.log(`username set already`)
			if (C.verifyRoomName(room)) {
				C.props.addRoom(room, [player])
				C.setState({ room })
				console.log(`room added`)
			} else {
				console.log(`room exists`)
				C.setState({ room })
				if (C.verifyMembers(C.props.username, room))
					C.props.addUserToRoom(C.props.username, room)
				else console.log(`already room member or too many people`)
			}
			done = true
		}
	}

	C.componentWillUnmount = function() {
		C.props.removeUserFromRoom(C.props.username, C.state.room)
		C.props.removeUser(C.props.username)
	}

	C.verifyMembers = function(username, roomName) {
		const room = C.props.rooms.find(room => room.roomName === roomName)
		const user = room.members.find(member => {
			console.log(`member`, member)
			console.log(`username`, username)
			return member === username
		})
		console.log(`user`, user)
		console.log(`room.members`, room.members)
		if (room.members.length >= 5) {
			console.log(`too many people`)
			return false
		} else if (user) {
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
