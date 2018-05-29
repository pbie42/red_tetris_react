const io = require('socket.io')()
const { socketMessageHandler } = require('./sockets/message')
const { socketUserHandler } = require('./sockets/user')
const { socketRoomHandler } = require('./sockets/room')
const { socketGameHandler } = require('./sockets/game')

let users = []
let rooms = []

io.on('connection', socket => {
	console.log(`CONNECTED`)
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

	socketRoomHandler(io, socket, users, rooms)

	socketGameHandler(io, socket, users, rooms)

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

const port = 8000
io.listen(port)
console.log(`listening on port`, port)
