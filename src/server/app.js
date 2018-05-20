const io = require('socket.io')()
const User = require('./classes/User')
const Game = require('./classes/Game')
const Piece = require('./classes/Piece')
const {
	addUserToRoom,
	getRoom,
	getUser,
	getUserById,
	removeUserFromRoom,
	removeRoom
} = require('./utils')
const { pieceOrder } = require('../client/utils')

let users = []
let rooms = []
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
	// console.log(`a client is connected`)
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
		// console.log(`new message`)
		const data = JSON.parse(message)
		// console.log(`data`, data)
		switch (data.type) {
			//---------------------------------------------------------------------ADD_USER
			case 'USER_ADD_USER':
				console.log(`USER_ADD_USER`)
				// console.log(`data`, data)
				index = users.length
				users.push(new User(socket.id, data.username))
				// console.log(`users`, users)
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
						type: 'USER_USERNAME_SET'
					})
				)
				socket.emit(
					'message',
					JSON.stringify({
						type: 'USER_SET_ID',
						id: socket.id
					})
				)
				break
			//---------------------------------------------------------------------REMOVE_USER
			case 'USER_REMOVE_USER':
				// console.log(`USER_REMOVE_USER`)
				// console.log(`data`, data)
				users = users.filter(user => user.username === data.username)
				// console.log(`users`, users)
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
			//---------------------------------------------------------------------ADD_MESSAGE
			case 'ADD_MESSAGE':
				// console.log(`ADD_MESSAGE`)
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
		// console.log(`new room message!!!`)
		const data = JSON.parse(message)
		let currentRooms, room
		switch (data.type) {
			//---------------------------------------------------------------------ADD_ROOM
			case 'ADD_ROOM':
				// console.log(`ADD_ROOM`)
				// console.log(`roomData`, data)
				socket.join(data.roomName)
				// console.log(`users`, users)
				let game = new Game(
					socket.id,
					data.roomName,
					data.members[0],
					data.members.map(member => getUser(member, users))
				)
				rooms.push(game)
				// console.log(`rooms`, rooms)
				currentRooms = rooms.map(room => room.getInfo())
				// console.log(`currentRooms`, currentRooms)
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
				// console.log(`sending GAME_MEMBERS_UPDATE`)
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
			//---------------------------------------------------------------------ADD_USER_TO_ROOM
			case 'ADD_USER_TO_ROOM':
				// console.log(`ADD_USER_TO_ROOM`)
				// console.log(`add to room data`, data)
				rooms = addUserToRoom(data.username, data.roomName, rooms, users)

				// console.log(`rooms`, rooms)
				socket.join(data.roomName)
				currentRooms = rooms.map(room => room.getInfo())
				// console.log(`currentRooms`, currentRooms)
				socket.broadcast.emit(
					'message',
					JSON.stringify({
						type: 'ROOMS_LIST',
						rooms: currentRooms
					})
				)
				// console.log(`sending GAME_MEMBERS_UPDATE`)
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
			//---------------------------------------------------------------------REMOVE_USER_FROM_ROOM
			case 'REMOVE_USER_FROM_ROOM':
				// console.log(`REMOVE_USER_FROM_ROOM`)
				// console.log(`data`, data)
				rooms = removeUserFromRoom(data.username, data.roomName, rooms, users)
				// console.log(`rooms`, rooms)
				let user = getUser(data.username, users)
				if (user) user.setBoard(newUserBoard())
				// console.log(`user`, user)
				// console.log(`rooms`, rooms)
				room = getRoom(data.roomName, rooms)
				if (room && room.getMembers().length === 0) {
					rooms = removeRoom(data.roomName, rooms)
					// console.log(`rooms`, rooms)
					// console.log(`should have removed room`)
				}
				// if (room) console.log(`room.getMembers()`, room.getMembers())
				socket.emit(
					'message',
					JSON.stringify({
						type: 'GAME_STOP_COUNTDOWN'
					})
				)
				socket.leave(data.roomName)
				socket.broadcast.emit(
					'message',
					JSON.stringify({
						type: 'ROOMS_LIST',
						rooms
					})
				)
				socket.emit(
					'message',
					JSON.stringify({
						type: 'ROOMS_LIST',
						rooms
					})
				)
				room = rooms.find(room => room.getRoomName() === data.roomName)
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
		let room, members, roomBoards, nextPiece, user
		switch (data.type) {
			//---------------------------------------------------------------------GAME_JOINED
			case 'GAME_JOINED':
				// console.log(`GAME_JOINED`)
				// console.log(`data`, data)
				room = getRoom(data.roomName, rooms)
				if (room) members = room.getMembers()
				// console.log(`members`, members)
				if (members)
					roomBoards = members.map(member => ({
						board: member.getBoard(),
						username: member.getUsername()
					}))
				if (roomBoards)
					io.to(data.roomName).emit(
						'message',
						JSON.stringify({
							type: 'GAME_BOARDS_UPDATE',
							boards: roomBoards
						})
					)
				break
			//---------------------------------------------------------------------GAME_START
			case 'GAME_START':
				// set countdown
				// console.log(`GAME_START`)
				// console.log(`data`, data)
				room = getRoom(data.roomName, rooms)
				if (room) {
					room.setCountdown()
					user = getUserById(data.userId, users)
					if (room && user) {
						nextPiece = room.getPiece(user.getCurrent())
						// console.log(`nextPiece`, nextPiece)
						room.getMembers().forEach(member => member.updateCurrent())
						// room
						// 	.getMembers()
						// 	.forEach(member => console.log(member.getCurrent()))
						io.to(data.roomName).emit(
							'message',
							JSON.stringify({
								type: 'GAME_PIECE_UPDATE',
								piece: nextPiece
							})
						)
					}
					io.to(data.roomName).emit(
						'message',
						JSON.stringify({
							type: 'GAME_START_COUNTDOWN'
						})
					)
					io.to(data.roomName).emit(
						'message',
						JSON.stringify({
							type: 'GAME_PIECE_UPDATE',
							piece: nextPiece
						})
					)
				}
				break
			//---------------------------------------------------------------------GAME_BOARD_UPDATE
			case 'GAME_BOARD_UPDATE':
				// console.log(`GAME_BOARD_UPDATE`)
				// console.log(`data`, data)
				user = getUser(data.username, users)
				// console.log(`data.username`, data.username)
				// console.log(`data.id`, data.id)
				if (
					user &&
					(user.getId() !== data.id || user.getUsername()) !== data.username
				) {
					console.log(`CHEATING!!!!!!!!!!!`)
					console.log(`data`, data)
				}
				if (user) user.board = data.board
				// console.log(`rooms`, JSON.stringify(rooms))
				// console.log(`users`, JSON.stringify(users))
				// console.log(`sending GAME_BOARDS_UPDATE`)
				room = getRoom(data.roomName, rooms)
				if (room) members = room.getMembers()
				// console.log(`members`, members)
				if (members)
					roomBoards = members.map(member => ({
						board: member.getBoard(),
						username: member.getUsername()
					}))
				if (roomBoards) {
					// console.log(`roomBoards`, JSON.stringify(roomBoards))
					io.to(data.roomName).emit(
						'message',
						JSON.stringify({
							type: 'GAME_BOARDS_UPDATE',
							boards: roomBoards
						})
					)
				}
				break
			// case 'NEXT_PIECE':
			// 	console.log(`NEXT_PIECE`)
			// 	socket.emit(
			// 		'message',
			// 		JSON.stringify({
			// 			type: 'GAME_PIECE',
			// 			piece: pieces.find(piece => piece.roomName === data.roomName)[
			// 				pieceNumber++
			// 			]
			// 		})
			// 	)
			// 	break
			//---------------------------------------------------------------------GAME_NEW_PIECE
			case 'GAME_NEW_PIECE':
				// console.log(`GAME_NEW_PIECE`)
				// console.log(`data`, data)
				// console.log(`\n`)
				room = getRoom(data.roomName, rooms)
				// if (room) console.log(`room.getRoomName()`, room.getRoomName())
				user = getUser(data.username, users)
				// if (user) console.log(`user.getCurrent()`, user.getCurrent())
				// if (user) console.log(`user.getUserName()`, user.getUsername())
				// if (!room) console.log(`Room error GAME_NEW_PIECE`)
				if (room && user) {
					// console.log(`room.getPieces()`, room.getPieces())
					nextPiece = room.getPiece(user.getCurrent())
					// console.log(`nextPiece`, nextPiece)
					user.updateCurrent()
					// console.log(`user.getCurrent()`, user.getCurrent())
					socket.emit(
						'message',
						JSON.stringify({
							type: 'GAME_PIECE_UPDATE',
							piece: nextPiece
						})
					)
				}
				break
			//---------------------------------------------------------------------GAME_NEW_PIECES
			case 'GAME_NEW_PIECES':
				// console.log(`GAME_NEW_PIECES`)
				room = getRoom(data.roomName, rooms)
				if (room && room.getId() !== data.id) console.log(`Cheating`)
				// console.log(`room`, room)
				let newPieces = room.getNewPieces()
				io.to(data.roomName).emit(
					'message',
					JSON.stringify({
						type: 'GAME_PIECES',
						pieces: newPieces
					})
				)
				break
			case 'GAME_EXIT`':
				// console.log(`GAME_EXIT`)
				socket.leave(`${roomName}`)
				break
			case 'GAME_QUIT':
				// console.log(`GAME_QUIT`)
				break
			default:
				break
		}
	})

	socket.on('disconnect', () => {
		// users.splice(index, 1)
		// console.log(`DISCONNECT`)
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

function newUserBoard() {
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
