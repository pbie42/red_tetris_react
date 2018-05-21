function roomAddUser(username, roomName, rooms) {
	const roomIndex = rooms.findIndex(room => room.roomName === roomName)
	if (
		roomIndex >= 0 &&
		!rooms[roomIndex].members.find(member => member === username)
	)
		rooms[roomIndex].members.push(username)
	return rooms
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

module.exports = {
	roomAddUser,
	roomRemoveUser
}
