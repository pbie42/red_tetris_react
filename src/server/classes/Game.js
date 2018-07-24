function randomPiece() {
	const pieces = ['i', 'j', 'l', 'o', 's', 't', 'z']
	return pieces[Math.floor(Math.random() * pieces.length)]
}

function pieceOrder() {
	const pieces = []
	for (let i = 0; i < 100; i++) pieces.push(randomPiece())
	return pieces
}

module.exports = class Game {
	constructor(id, roomName, creator, members) {
		this.id = id
		this.roomName = roomName
		this.creator = creator
		this.inSession = false
		this.countdown = false
		this.members = members
		this.pieces = pieceOrder()
	}

	getInfo() {
		const { id, roomName, creator, inSession, countdown, members } = this
		return {
			id,
			roomName,
			creator,
			inSession,
			countdown,
			members: members.map(member => member.getInfo())
		}
	}
	getId() {
		return this.id
	}
	setId(newId) {
		this.id = newId
	}
	getRoomName() {
		return this.roomName
	}
	getCreator() {
		return this.creator
	}
	getInSession() {
		return this.inSession
	}
	getCountdown() {
		return this.countdown
	}
	setCountdown() {
		this.countdown = true
	}
	getMembers() {
		return this.members
	}
	getPiece(current) {
		return this.pieces[current]
	}
	getPieces() {
		return this.pieces
	}
	getNewPieces() {
		this.pieces = this.pieces.concat(pieceOrder())
		return this.pieces
	}
}
