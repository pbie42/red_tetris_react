const io = require('socket.io')()

const users = []

io.on('connection', socket => {
	console.log(`a client is connected`)

	socket.on('message', message => {
		console.log(`new message`)
		const data = JSON.parse(message)
		console.log(`data`, data)
		switch (data.type) {
			case 'ADD_USER':
				console.log(`ADD_USER`)
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

	socket.on('disconnect', () => {
		users.splice(index, 1)
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
