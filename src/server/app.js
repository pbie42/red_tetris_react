const io = require('socket.io')()
const {
	pieceOrder,
	addUserToRoom,
	removeUserFromRoom
} = require('../client/utils')

let users = []
let rooms = [
	{
		roomName: 'Test Room',
		members: ['John', 'Paul', 'George', 'Ringo'],
		inSession: false,
		countDown: false
	}
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

io.on('connection', socket => {
	console.log(`a client is connected`)
	socket.emit(
		'message',
		JSON.stringify({
			type: 'USERS_LIST',
			users
		})
	)
	socket.emit(
		'message',
		JSON.stringify({
			type: 'ROOMS_LIST',
			rooms
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
				users.push({ name: data.name, id: index + 1 })
				console.log(`users`, users)
				socket.broadcast.emit(
					'message',
					JSON.stringify({
						type: 'USERS_LIST',
						users
					})
				)
				socket.emit(
					'message',
					JSON.stringify({
						type: 'USERS_LIST',
						users
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
				users = users.filter(user => user.name === data.username)
				console.log(`users`, users)
				socket.broadcast.emit(
					'message',
					JSON.stringify({
						type: 'USERS_LIST',
						users
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
				rooms.push({
					roomName: data.roomName,
					members: data.members,
					inSession: false,
					countDown: false
				})
				console.log(`rooms`, rooms)
				socket.broadcast.emit(
					'message',
					JSON.stringify({
						type: 'ROOMS_LIST',
						rooms
					})
				)
				console.log(`sending GAME_MEMBERS_UPDATE`)
				io.to(data.roomName).emit(
					'message',
					JSON.stringify({
						type: 'GAME_MEMBERS_UPDATE',
						members: rooms.find(room => room.roomName === data.roomName).members
					})
				)
				break
			case 'ADD_USER_TO_ROOM':
				console.log(`ADD_USER_TO_ROOM`)
				console.log(`add to room data`, data)
				rooms = addUserToRoom(data.username, data.roomName, rooms)
				console.log(`rooms`, rooms)
				socket.join(data.roomName)
				socket.broadcast.emit(
					'message',
					JSON.stringify({
						type: 'ROOMS_LIST',
						rooms
					})
				)
				console.log(`sending GAME_MEMBERS_UPDATE`)
				io.to(data.roomName).emit(
					'message',
					JSON.stringify({
						type: 'GAME_MEMBERS_UPDATE',
						members: rooms.find(room => room.roomName === data.roomName).members
					})
				)
				break
			case 'REMOVE_USER_FROM_ROOM':
				console.log(`REMOVE_USER_FROM_ROOM`)
				console.log(`data`, data)
				rooms = removeUserFromRoom(data.username, data.roomName, rooms)
				console.log(`rooms`, rooms)
				socket.broadcast.emit(
					'message',
					JSON.stringify({
						type: 'ROOMS_LIST',
						rooms
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
		switch (data.type) {
			case 'GAME_READY':
				console.log(`GAME_READY`)
				newGamePieces(data.roomName, pieces)
				newBoards(data.members, data.roomName, boards)
				break
			case 'GAME_STARTING':
				console.log(`GAME_STARTING`)
				break
			case 'GAME_PIECE':
				console.log(`GAME_PIECE`)
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
		boards.push({ username, roomName, board: newUserBoard() })
	})
}
