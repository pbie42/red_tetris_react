const io = require('socket.io')()
const User = require('./classes/User')
const Game = require('./classes/Game')
const Piece = require('./classes/Piece')
const { addUserToRoom, getUser, removeUserFromRoom } = require('./utils')
const { pieceOrder } = require('../client/utils')

let users = []
let rooms = [
	new Game('238hkjhdaify', 'Test Room', 'John', [
		new User('lkdsajlfs', 'John'),
		new User('lsadfads', 'Paul'),
		new User('lkdyjhghgfs', 'George'),
		new User('lkdsa43423', 'Ringo')
	])
]
let pieces = [
	{
		roomName: 'Test Room',
		pieces: pieceOrder()
	}
]

let boards = [
	{ username: 'John', roomName: 'Test Room', board: newUserBoard() }
]

let index
let roomIndex
let pieceNumber = 0

io.on('connection', socket => {
	console.log(`a client is connected`)
	socket.emit(
		'message',
		JSON.stringify({
			type: 'USERS_LIST',
			users: users.map(user => user.getInfo())
		})
	)
	socket.emit(
		'message',
		JSON.stringify({
			type: 'ROOMS_LIST',
			rooms: rooms.map(room => room.getInfo())
		})
	)

	socket.on('message', message => {
		console.log(`new message`)
		const data = JSON.parse(message)
		console.log(`data`, data)
		switch (data.type) {
			case 'ADD_USER':
				console.log(`ADD_USER`)
				console.log(`data`, data)
				index = users.length
				users.push(new User(socket.id, data.username))
				console.log(`users`, users)
				socket.broadcast.emit(
					'message',
					JSON.stringify({
						type: 'USERS_LIST',
						users: users.map(user => user.getInfo())
					})
				)
				socket.emit(
					'message',
					JSON.stringify({
						type: 'USERS_LIST',
						users: users.map(user => user.getInfo())
					})
				)
				socket.emit(
					'message',
					JSON.stringify({
						type: 'USERNAME_SET'
					})
				)
				break
			case 'REMOVE_USER':
				console.log(`REMOVE_USER`)
				console.log(`data`, data)
				users = users.filter(user => user.username === data.username)
				console.log(`users`, users)
				socket.broadcast.emit(
					'message',
					JSON.stringify({
						type: 'USERS_LIST',
						users: users.map(user => user.getInfo())
					})
				)
				// socket.emit(
				// 	'message',
				// 	JSON.stringify({
				// 		type: 'USERS_LIST',
				// 		users
				// 	})
				// )
				break
			case 'ADD_MESSAGE':
				console.log(`ADD_MESSAGE`)
				socket.broadcast.emit(
					'message',
					JSON.stringify({
						type: 'ADD_MESSAGE',
						message: data.message,
						author: data.author
					})
				)
				break
			default:
				break
		}
	})

	socket.on('room', message => {
		console.log(`new room message!!!`)
		const data = JSON.parse(message)
		switch (data.type) {
			case 'ADD_ROOM':
				console.log(`ADD_ROOM`)
				console.log(`roomData`, data)
				socket.join(data.roomName)
				console.log(`users`, users)
				let game = new Game(
					socket.id,
					data.roomName,
					data.members[0],
					data.members.map(member => getUser(member, users))
				)
				rooms.push(game)
				console.log(`rooms`, rooms)
				socket.broadcast.emit(
					'message',
					JSON.stringify({
						type: 'ROOMS_LIST',
						rooms: rooms.map(room => room.getInfo())
					})
				)
				socket.emit(
					'message',
					JSON.stringify({
						type: 'GAME_ID_SET',
						id: game.getId()
					})
				)
				console.log(`sending GAME_MEMBERS_UPDATE`)
				io.to(data.roomName).emit(
					'message',
					JSON.stringify({
						type: 'GAME_MEMBERS_UPDATE',
						members: rooms
							.find(room => room.getRoomName() === data.roomName)
							.members.map(member => member.getUsername())
					})
				)
				break
			case 'ADD_USER_TO_ROOM':
				console.log(`ADD_USER_TO_ROOM`)
				console.log(`add to room data`, data)
				rooms = addUserToRoom(data.username, data.roomName, rooms, users)

				console.log(`rooms`, rooms)
				socket.join(data.roomName)
				socket.broadcast.emit(
					'message',
					JSON.stringify({
						type: 'ROOMS_LIST',
						rooms: rooms.map(room => {
							room.getInfo()
						})
					})
				)
				console.log(`sending GAME_MEMBERS_UPDATE`)
				io.to(data.roomName).emit(
					'message',
					JSON.stringify({
						type: 'GAME_MEMBERS_UPDATE',
						members: rooms
							.find(room => room.getRoomName() === data.roomName)
							.members.map(member => member.getUsername())
					})
				)
				break
			case 'REMOVE_USER_FROM_ROOM':
				console.log(`REMOVE_USER_FROM_ROOM`)
				console.log(`data`, data)
				rooms = removeUserFromRoom(data.username, data.roomName, rooms, users)
				console.log(`rooms`, rooms)
				socket.broadcast.emit(
					'message',
					JSON.stringify({
						type: 'ROOMS_LIST',
						rooms
					})
				)
				const room = rooms.find(room => room.getRoomName() === data.roomName)
				io.to(data.roomName).emit(
					'message',
					JSON.stringify({
						type: 'GAME_MEMBERS_UPDATE',
						members: room
							? room.members.map(member => member.getUsername())
							: []
					})
				)
				// socket.emit(
				// 	'message',
				// 	JSON.stringify({
				// 		type: 'USERS_LIST',
				// 		users
				// 	})
				// )
				break

			default:
				break
		}
	})

	socket.on('game', message => {
		const data = JSON.parse(message)
		const { roomName } = data
		let room
		switch (data.type) {
			case 'GAME_READY':
				console.log(`GAME_READY`)
				console.log(`data`, data)
				console.log(`data.username`, data.username)
				room = rooms.find(room => room.roomName === data.roomName)
				if (!room) break
				if (room && room.creator !== data.username) break
				newGamePieces(data.roomName, pieces)
				newBoards(data.members, data.roomName, boards)
				console.log(`about to send game piece`)
				console.log(`pieceNumber`, pieceNumber)
				const piece = pieces.find(piece => piece.roomName === data.roomName)
					.pieces[pieceNumber++]
				console.log(`piece`, piece)
				io.to(data.roomName).emit(
					'message',
					JSON.stringify({
						type: 'GAME_PIECE',
						piece
					})
				)
				break
			case 'GAME_STARTING':
				console.log(`GAME_STARTING`)
				break
			case 'GAME_BOARD_UPDATE':
				console.log(`GAME_STARTING`)
				console.log(`data`, data)
				break
			case 'NEXT_PIECE':
				console.log(`NEXT_PIECE`)
				socket.emit(
					'message',
					JSON.stringify({
						type: 'GAME_PIECE',
						piece: pieces.find(piece => piece.roomName === data.roomName)[
							pieceNumber++
						]
					})
				)
				break
			case 'GAME_EXIT`':
				console.log(`GAME_EXIT`)
				socket.leave(`${roomName}`)
				break
			case 'GAME_QUIT':
				console.log(`GAME_QUIT`)
				break
			default:
				break
		}
	})

	socket.on('disconnect', () => {
		// users.splice(index, 1)
		console.log(`DISCONNECT`)
		socket.broadcast.emit(
			'message',
			JSON.stringify({
				type: 'USERS_LIST',
				users
			})
		)
	})
})

const port = 8000
io.listen(port)
console.log(`listening on port`, port)

function newUserBoard(params) {
	return [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	]
}

function newGamePieces(roomName, pieces) {
	pieces.push({ roomName, pieces: pieceOrder() })
}

function newBoards(members, roomName, boards) {
	members.forEach(member => {
		boards.push({ username: member, roomName, board: newUserBoard() })
	})
}
