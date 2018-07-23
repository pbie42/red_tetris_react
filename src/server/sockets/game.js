const {
	roomAddUser,
	getRoom,
	getUser,
	getUserById,
	pieceOrder,
	randomPiece,
	roomRemoveUser,
	removeRoom,
	newBoards,
	newGamePieces,
	newUserBoard
} = require('../utils')

function socketGameHandler(io, socket, message, users, rooms) {
	const data = JSON.parse(message)
	const { roomName } = data
	let room, members, roomBoards, nextPiece, user
	switch (data.type) {
		//---------------------------------------------------------------------GAME_JOINED
		case 'GAME_JOINED':
			console.log(`GAME_JOINED`)
			room = getRoom(data.roomName, rooms)
			if (room) members = room.getMembers()
			if (members)
				roomBoards = members.map(member => ({
					board: member.getBoard(),
					username: member.getUsername()
				}))
			if (roomBoards)
				io.to(data.roomName).emit(
					'game',
					JSON.stringify({
						type: 'GAME_BOARDS_UPDATE',
						boards: roomBoards
					})
				)
			break
		//---------------------------------------------------------------------GAME_START
		case 'GAME_START':
			console.log(`GAME_START`)
			console.log(`data`, data)
			console.log(`rooms`, rooms)
			room = getRoom(data.roomName, rooms)
			console.log(`room`, room)
			if (room) {
				room.setCountdown()
				user = getUserById(data.userId, users)
				if (room && user) {
					nextPiece = room.getPiece(user.getCurrent())
					room.getMembers().forEach(member => member.updateCurrent())
					io.to(data.roomName).emit(
						'game',
						JSON.stringify({
							type: 'GAME_PIECE_UPDATE',
							piece: nextPiece
						})
					)
				}
				console.log(`About to send game countdown start`)
				console.log(`data.roomName`, data.roomName)
				io.to(data.roomName).emit(
					'game',
					JSON.stringify({
						type: 'GAME_START_COUNTDOWN'
					})
				)
				io.to(data.roomName).emit(
					'game',
					JSON.stringify({
						type: 'GAME_PIECE_UPDATE',
						piece: nextPiece
					})
				)
			}
			break
		//---------------------------------------------------------------------GAME_BOARD_UPDATE
		case 'GAME_BOARD_UPDATE':
			console.log(`GAME_BOARD_UPDATE`)
			user = getUser(data.username, users)
			if (
				user &&
				(user.getId() !== data.id || user.getUsername()) !==
				data.username
			) {
				console.log(`CHEATING!!!!!!!!!!!`)
				console.log(`data`, data)
			}
			if (user) user.board = data.board
			room = getRoom(data.roomName, rooms)
			if (room) members = room.getMembers()
			if (members)
				roomBoards = members.map(member => ({
					board: member.getBoard(),
					username: member.getUsername()
				}))
			if (roomBoards) {
				io.to(data.roomName).emit(
					'game',
					JSON.stringify({
						type: 'GAME_BOARDS_UPDATE',
						boards: roomBoards
					})
				)
			}
			break
		//---------------------------------------------------------------------GAME_NEW_PIECE
		case 'GAME_NEW_PIECE':
			console.log(`GAME_NEW_PIECE`)
			room = getRoom(data.roomName, rooms)
			user = getUser(data.username, users)
			if (room && user) {
				nextPiece = room.getPiece(user.getCurrent())
				user.updateCurrent()
				socket.emit(
					'game',
					JSON.stringify({
						type: 'GAME_PIECE_UPDATE',
						piece: nextPiece
					})
				)
			}
			break
		//---------------------------------------------------------------------GAME_NEW_PIECES
		case 'GAME_NEW_PIECES':
			console.log(`GAME_NEW_PIECES`)
			room = getRoom(data.roomName, rooms)
			if (room && room.getId() !== data.id) console.log(`Cheating`)
			let newPieces = room.getNewPieces()
			io.to(data.roomName).emit(
				'game',
				JSON.stringify({
					type: 'GAME_PIECES',
					pieces: newPieces
				})
			)
			break
		case 'GAME_EXIT`':
			socket.leave(`${roomName}`)
			break
		case 'GAME_QUIT':
			break
		default:
			break
	}
	return { rooms, users }
}

module.exports = { socketGameHandler }
