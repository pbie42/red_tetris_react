const User = require('../classes/User')
const Game = require('../classes/Game')
const {
	getRoom,
	getUser,
	getUserById,
	newUserBoard,
	removeRoom,
	roomAddUser,
	roomRemoveUser
} = require('../utils')

function socketRoomHandler(io, socket, message, users, rooms) {

	const data = JSON.parse(message)
	let currentRooms, room, members, roomBoards
	switch (data.type) {
		//---------------------------------------------------------------------ROOM_ADD_ROOM
		case 'ROOM_ADD_ROOM':
			console.log(`ROOM_ADD_ROOM`)
			socket.join(data.roomName)
			// console.log(`data.members`, data.members)
			let game = new Game(
				socket.id,
				data.roomName,
				data.members[0],
				data.members.map(member => getUser(member, users))
			)
			console.log(`game.getMembers()`, game.getMembers())
			rooms.push(game)
			currentRooms = rooms.map(room => room.getInfo())
			socket.broadcast.emit(
				'room',
				JSON.stringify({
					type: 'ROOMS_LIST',
					rooms: rooms.map(room => room.getInfo())
				})
			)
			socket.emit(
				'game',
				JSON.stringify({
					type: 'GAME_ID_SET',
					id: game.getId()
				})
			)
			io.to(data.roomName).emit(
				'game',
				JSON.stringify({
					type: 'GAME_MEMBERS_UPDATE',
					members: rooms
						.find(room => room.getRoomName() === data.roomName)
						.members.map(member => member.getUsername())
				})
			)
			break
		//---------------------------------------------------------------------ROOM_ADD_USER
		case 'ROOM_ADD_USER':
			console.log(`ROOM_ADD_USER`)
			rooms = roomAddUser(data.username, data.roomName, rooms, users)
			socket.join(data.roomName)
			currentRooms = rooms.map(room => room.getInfo())
			socket.broadcast.emit(
				'room',
				JSON.stringify({
					type: 'ROOMS_LIST',
					rooms: currentRooms
				})
			)
			io.to(data.roomName).emit(
				'game',
				JSON.stringify({
					type: 'GAME_MEMBERS_UPDATE',
					members: rooms
						.find(room => room.getRoomName() === data.roomName)
						.members.map(member => member.getUsername())
				})
			)
			break
		//---------------------------------------------------------------------ROOM_REMOVE_USER
		case 'ROOM_REMOVE_USER':
			console.log(`ROOM_REMOVE_USER`)
			console.log(`data`, data)
			rooms = roomRemoveUser(data.username, data.roomName, rooms, users)
			let user = getUser(data.username, users)
			if (user) user.setBoard(newUserBoard())
			room = getRoom(data.roomName, rooms)
			if (room && room.getId() === data.userId && room.getMembers().length > 0) {
				room.setId(room.getMembers()[0].getId())
				io.to(data.roomName).emit(
					'game',
					JSON.stringify({
						type: 'GAME_ID_SET',
						id: room.getId()
					})
				)
			}
			if (room && room.getMembers().length === 0)
				rooms = removeRoom(data.roomName, rooms)
			socket.emit(
				'game',
				JSON.stringify({
					type: 'GAME_STOP_COUNTDOWN'
				})
			)
			socket.leave(data.roomName)
			socket.broadcast.emit(
				'room',
				JSON.stringify({
					type: 'ROOMS_LIST',
					rooms
				})
			)
			socket.emit(
				'room',
				JSON.stringify({
					type: 'ROOMS_LIST',
					rooms
				})
			)
			room = rooms.find(room => room.getRoomName() === data.roomName)
			socket.to(data.roomName).emit(
				'game',
				JSON.stringify({
					type: 'GAME_MEMBERS_UPDATE',
					members: room
						? room.members.map(member => member.getUsername())
						: []
				})
			)
			if (room) members = room.getMembers()
			if (members)
				roomBoards = members.map(member => ({
					board: member.getBoard(),
					username: member.getUsername()
				}))
			if (roomBoards)
				io.to(data.roomName).emit(
					'game',
					JSON.stringify({
						type: 'GAME_BOARDS_UPDATE',
						boards: roomBoards
					})
				)
			break

		default:
			break
	}
	return { rooms, users }
}

module.exports = { socketRoomHandler }
