const io = require('socket.io')()
const { socketMessageHandler } = require('./sockets/message')
const { socketUserHandler } = require('./sockets/user')
const { socketRoomHandler } = require('./sockets/room')
const { socketGameHandler } = require('./sockets/game')
const User = require('./classes/User')
const Game = require('./classes/Game')
const { roomMembersCheck, getRoom,
	getUser,
	getUserById,
	newUserBoard,
	removeRoom,
	roomAddUser,
	roomRemoveUser } = require('./utils')

let users = []
let rooms = []
let result = {}

io.on('connection', socket => {
	console.log(`CONNECTED`)
	rooms = roomMembersCheck(rooms)
	//---------------------------------------------------------------------------CONNECTION
	socket.emit(
		'user',
		JSON.stringify({
			type: 'USERS_LIST',
			users: users.map(user => user.getInfo())
		})
	)
	socket.emit(
		'room',
		JSON.stringify({
			type: 'ROOMS_LIST',
			rooms: rooms.map(room => room.getInfo())
		})
	)

	socketMessageHandler(socket)

	socketUserHandler(socket, users)


	socket.on('room', (message) => {
		//------------------------------------------------------------------------ROOM
		result = socketRoomHandler(io, socket, message, users, rooms)
		rooms = result.rooms
		users = result.users
	})


	socket.on('game', message => {
		//------------------------------------------------------------------------GAME
		result = socketGameHandler(io, socket, message, users, rooms)
		rooms = result.rooms
		users = result.users
	})

	socket.on('disconnect', () => {
		//------------------------------------------------------------------------DISCONNECTION
		console.log(`DISCONNECT`)
		socket.broadcast.emit(
			'user',
			JSON.stringify({
				type: 'USERS_LIST',
				users
			})
		)
	})
})

const port = 7000
io.listen(port)
console.log(`listening on port`, port)
