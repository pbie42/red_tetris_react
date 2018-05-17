const { newBoard } = require('../../client/utils')

module.exports = class User {
	constructor(id, username) {
		this.id = id
		this.username = username
		this.board = newBoard()
		this.current = 0
	}
	setBoard(newBoard) {
		this.board = newBoard
	}
	getBoard() {
		return this.board
	}
	getCurrent() {
		return this.current
	}
	updateCurrent() {
		this.current++
	}
	getInfo() {
		const { id, username } = this
		return { id, username }
	}
	getUsername() {
		return this.username
	}
	getId() {
		return this.id
	}
}
