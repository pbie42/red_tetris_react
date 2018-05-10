import React, { Component } from 'react'
import { parseUrl } from '../../utils/parse_url'

function GameComponent(props) {
	const C = new Component()

	C.componentWillMount = function() {
		console.log(`props`, props)
		if (props.connection) {
			console.log(`props.connection`, props.connection)
			const url = props.match.params.game
			if (
				url.indexOf('[') < 0 ||
				url.indexOf(']') < 0 ||
				url[url.length - 1] !== ']'
			)
				props.history.push('/')
			const { room, player } = parseUrl(url)
			if (!props.username) {
				if (C.verifyUsername(player)) {
					console.log(`username not set`)
					props.setUsername(player)
					props.addUser(player)
				} else {
					console.log(`username already taken`)
				}
			}
			console.log(`username set already`)
			if (C.verifyRoomName(room)) {
				props.addRoom(room, [player])
			} else {
				console.log(`room exists`)
				if (C.verifyMembers(props.username, room))
					props.addUserToRoom(props.username, room)
				else console.log(`already room member or too many people`)
			}
		}
	}

	C.componentDidMount = function() {
		console.log(`Mounted in this bitch`)
	}

	C.verifyMembers = function(username, roomName) {
		const room = props.rooms.find(room => room.roomName === roomName)
		const user = room.members.find(member => member === username)
		if (room.members.length >= 5) {
			console.log(`too many people`)
			return false
		} else if (user) {
			console.log(`already a member`)
			return false
		} else return true
	}

	C.verifyRoomName = function(value) {
		const index = props.rooms.findIndex(room => value === room.roomName)
		if (index >= 0) return false
		return true
	}

	C.verifyUsername = function(value) {
		const index = props.users.findIndex(user => value === user.name)
		if (index >= 0) return false
		return true
	}

	C.render = () => {
		return (
			<div className="container-lobby">
				<h1>{props.connection ? 'CONNECTED' : 'NOT CONNECTED'}</h1>
			</div>
		)
	}
	return C
}

export default GameComponent
