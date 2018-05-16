module.exports = class User {
	constructor(id, username) {
		this.id = id
		this.username = username
	}
	set board(board) {
		this.board = board
	}
	get board() {
		return this.board
	}
	// set username(username) {
	// 	this.username = username
	// }
	// get username() {
	// 	return this.username
	// }
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
