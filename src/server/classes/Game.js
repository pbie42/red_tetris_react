const { pieceOrder } = require('../../client/utils')

module.exports = class Game {
	constructor(id, roomName, creator, members) {
		this.id = id
		this.roomName = roomName
		this.creator = creator
		this.inSession = false
		this.countdown = false
		this.members = members
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
	getMembers() {
		return this.members
	}
}
