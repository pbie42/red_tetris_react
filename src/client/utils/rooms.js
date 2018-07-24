function roomAddUser(username, roomName, rooms) {
	const roomIndex = rooms.findIndex(room => room.roomName === roomName)
	if (
		roomIndex >= 0 &&
		!rooms[roomIndex].members.find(member => member === username)
	)
		rooms[roomIndex].members.push(username)
	return rooms
}

function roomLobbyMessageUpdate(roomId, roomName, message, rooms) {
	console.log(`rooms inside message update`, rooms)
	let roomsUpdate = rooms.map(room => {
		if (room.roomName === roomName) room.message = message
		return room
	})
	return roomsUpdate
}

function roomRemoveUser(username, roomName, rooms) {
	const roomIndex = rooms.findIndex(room => room.roomName === roomName)
	if (
		roomIndex >= 0 &&
		rooms[roomIndex].members.find(member => member === username)
	) {
		rooms[roomIndex].members = rooms[roomIndex].members.filter(
			member => member !== username
		)
	}
	return rooms
}

export { roomAddUser, roomLobbyMessageUpdate, roomRemoveUser }
