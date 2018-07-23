function roomAddUser(username, roomName, rooms, users) {
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

function roomMembersCheck(rooms) {
	let emptyRooms = rooms.filter(room => room.getMembers().length === 0)
	if (emptyRooms.length > 0) {
		emptyRooms.forEach(emptyRoom => {
			rooms = removeRoom(emptyRoom.roomName, rooms)
		})
	}
	return rooms
}

function roomRemoveUser(username, roomName, rooms, users) {
	console.log(`rooms in removeuser`, rooms)
	if (rooms.length === 0) return []
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

function removeRoom(roomName, rooms) {
	return rooms.filter(room => room.getRoomName() !== roomName)
}

function getUser(username, users) {
	const user = users.find(user => user.getUsername() === username)
	return user
}

function getUserById(userId, users) {
	const user = users.find(user => user.getId() === userId)
	return user
}

function getRoom(roomName, rooms) {
	const room = rooms.find(room => {
		let realRoom = room.getRoomName()
		return realRoom === roomName
	})
	return room
}

function randomPiece() {
	const pieces = ['i', 'j', 'l', 'o', 's', 't', 'z']
	return pieces[Math.floor(Math.random() * pieces.length)]
}

function pieceOrder() {
	const pieces = []
	for (let i = 0; i < 100; i++) pieces.push(randomPiece())
	return pieces
}

function newUserBoard() {
	return [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	]
}

function newGamePieces(roomName, pieces) {
	pieces.push({ roomName, pieces: pieceOrder() })
}

function newBoards(members, roomName, boards) {
	members.forEach(member => {
		boards.push({ username: member, roomName, board: newUserBoard() })
	})
}

module.exports = {
	newUserBoard,
	roomAddUser,
	getRoom,
	getUser,
	getUserById,
	pieceOrder,
	newGamePieces,
	newBoards,
	roomMembersCheck,
	roomRemoveUser,
	randomPiece,
	removeRoom
}
