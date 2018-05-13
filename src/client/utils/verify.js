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
	const index = users.findIndex(user => username === user.name)
	if (index >= 0) return false
	return true
}

module.exports = {
	verifyMemberCount,
	verifyMembers,
	verifyUrl,
	verifyRoomName,
	verifyUsername
}
