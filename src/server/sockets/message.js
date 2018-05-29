function socketMessageHandler(socket) {
	socket.on('message', message => {
		const data = JSON.parse(message)
		switch (data.type) {
			//---------------------------------------------------------------------MESSAGE_ADD
			case 'MESSAGE_ADD':
				console.log(`MESSAGE_ADD`)
				socket.broadcast.emit(
					'message',
					JSON.stringify({
						type: 'MESSAGE_ADD',
						message: data.message,
						author: data.author
					})
				)
				break
			default:
				break
		}
	})
}

module.exports = { socketMessageHandler }
