const User = require('../classes/User')

function socketUserHandler(socket, users) {
	socket.on('user', message => {
		const data = JSON.parse(message)
		switch (data.type) {
			//---------------------------------------------------------------------USER_ADD_USER
			case 'USER_ADD_USER':
				console.log(`USER_ADD_USER`)
				index = users.length
				users.push(new User(socket.id, data.username))
				socket.broadcast.emit(
					'user',
					JSON.stringify({
						type: 'USERS_LIST',
						users: users.map(user => user.getInfo())
					})
				)
				socket.emit(
					'user',
					JSON.stringify({
						type: 'USERS_LIST',
						users: users.map(user => user.getInfo())
					})
				)
				socket.emit(
					'user',
					JSON.stringify({
						type: 'USER_USERNAME_SET'
					})
				)
				socket.emit(
					'user',
					JSON.stringify({
						type: 'USER_SET_ID',
						id: socket.id
					})
				)
				break
			//---------------------------------------------------------------------USER_REMOVE_USER
			case 'USER_REMOVE_USER':
				console.log(`USER_REMOVE_USER`)
				users = users.filter(user => user.username === data.username)
				socket.broadcast.emit(
					'user',
					JSON.stringify({
						type: 'USERS_LIST',
						users: users.map(user => user.getInfo())
					})
				)
				break

			default:
				break
		}
	})
}

module.exports = { socketUserHandler }
