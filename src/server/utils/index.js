function addUserToRoom(username, roomName, rooms, users) {
	const roomIndex = rooms.findIndex(room => room.getRoomName() === roomName)
	if (
		roomIndex >= 0 &&
		!rooms[roomIndex].members.find(
			member => member.getUsername() === username
		)
	)
		rooms[roomIndex].members.push(getUser(username, users))
	return rooms
}

function removeUserFromRoom(username, roomName, rooms, users) {
	const roomIndex = rooms.findIndex(room => room.getRoomName() === roomName)
	if (
		roomIndex >= 0 &&
		rooms[roomIndex].members.find(member => member.getUsername() === username)
	) {
		rooms[roomIndex].members = rooms[roomIndex].members.filter(
			member => member.getUsername() !== username
		)
	}
	return rooms
}

function getUser(username, users) {
	const user = users.find(user => user.getUsername() === username)
	console.log(`getUser`, user)
	return user
}

module.exports = {
	addUserToRoom,
	getUser,
	removeUserFromRoom
}
