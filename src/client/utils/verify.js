function verifyMemberCount(rooms, roomName) {
	const room = rooms.find(room => room.roomName === roomName)
	if (room.members.length < 5) return true
	return false
}

function verifyMembers(username, roomName, rooms) {
	const room = rooms.find(room => room.roomName === roomName)
	const user = room.members.find(member => member === username)
	if (user) return false
	return true
}

function verifyUrl(url) {
	if (
		url.indexOf('[') < 0 ||
		url.indexOf(']') < 0 ||
		url[url.length - 1] !== ']'
	)
		return false
	return true
}

function verifyRoomName(roomName, rooms) {
	const index = rooms.findIndex(room => roomName === room.roomName)
	if (index < 0) return true
	return false
}

function verifyUsername(username, users) {
	const index = users.findIndex(user => username === user.username)
	if (index >= 0) return false
	return true
}

function verifyCreatorMessage(props, msg, str) {
	const { countDown, userId, roomId } = props
	if (!countDown && userId === roomId && (msg === str || msg === ''))
		return true
	return false
}

function verifyPlayerMessage(props, msg, str) {
	const { countDown, userId, roomId } = props
	if (!countDown && userId !== roomId && (msg === str || msg === ''))
		return true
	return false
}

function verifyConnection(props, doneUser) {
	const { connection, usersReceived, roomsReceived } = props
	// !C.propsusernameIsSet &&
	if (connection && usersReceived && roomsReceived && !doneUser) return true
	return false
}

function verifyPlayerHandled(props, doneUser, doneRoom) {
	const { connection, usersReceived, roomsReceived, usernameIsSet } = props
	if (
		connection &&
		usersReceived &&
		roomsReceived &&
		usernameIsSet &&
		doneUser &&
		!doneRoom
	)
		return true
	return false
}

function verifyGameMessageStart({
	message,
	msgStart,
	msgWaitPlayers,
	msgWaitCreator
}) {
	if (
		message === msgStart ||
		message === msgWaitPlayers ||
		message === msgWaitCreator ||
		message === ''
	)
		return true
	return false
}

function verifyPlacement(location, shape, savedBoard, piece) {
	if (savedBoard.length === 0) return true
	let y = -1
	let boardY = location.y
	while (shape[++y] && savedBoard[y]) {
		let x = -1
		let boardX = location.x
		while (++x < 4) {
			if (
				(shape[y][x] === piece.piece || shape[y][x] === piece.prevPiece) &&
				savedBoard[boardY][boardX] !== 0
			) {
				// console.log(`placement false`)
				return false
			}
			boardX++
		}
		boardY++
	}
	// console.log(`placement true`)
	return true
}

function verifyRotation(location, newPosition, offset, savedBoard, piece) {
	return (
		verifyPlacement(location, newPosition.shape, savedBoard, piece) &&
		location.x + 2 + offset.end <= 11 &&
		location.x - 1 + offset.start >= -1
	)
}

export {
	verifyConnection,
	verifyCreatorMessage,
	verifyGameMessageStart,
	verifyMemberCount,
	verifyMembers,
	verifyPlacement,
	verifyPlayerHandled,
	verifyPlayerMessage,
	verifyRoomName,
	verifyRotation,
	verifyUrl,
	verifyUsername
}
