const io = require('socket.io')()

let users = []
let rooms = []
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
			case 'REMOVE_USER_FROM_ROOM':
				console.log(`REMOVE_USER_FROM_ROOM`)
				console.log(`data`, data)
				roomIndex = rooms.findIndex(room => room.roomName === data.roomName)
				if (
					roomIndex >= 0 &&
					rooms[roomIndex].members.find(member => member === data.username)
				) {
					rooms[roomIndex].members = rooms[roomIndex].members.filter(
						member => member === data.username
					)
				}
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
			case 'ADD_ROOM':
				console.log(`ADD_ROOM`)
				console.log(`roomData`, data)
				rooms.push({ roomName: data.roomName, members: data.members })
				socket.broadcast.emit(
					'message',
					JSON.stringify({
						type: 'ROOMS_LIST',
						rooms
					})
				)
				break
			case 'ADD_USER_TO_ROOM':
				console.log(`ADD_USER_TO_ROOM`)
				console.log(`add to room data`, data)
				roomIndex = rooms.findIndex(room => room.roomName === data.roomName)
				if (
					roomIndex >= 0 &&
					!rooms[roomIndex].members.find(member => member === data.username)
				) {
					rooms[roomIndex].members.push(data.username)
				}
				socket.broadcast.emit(
					'message',
					JSON.stringify({
						type: 'ROOMS_LIST',
						rooms
					})
				)
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
