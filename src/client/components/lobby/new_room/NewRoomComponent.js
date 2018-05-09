import React, { Component } from 'react'

export function NewRoomComponent(props) {
	const C = new Component()

	C.state = {
		error: false
	}

	C.enterRoomName = function(e) {
		let value = C.refs.input.value
		if (e.key === 'Enter') {
			e.preventDefault()
			if (value && C.verifyRoomName(value)) {
				props.addRoom(value, [C.props.username])
				// function test() {
				// 	props.history.push('/lobby')
				// }
				// props.pageChange()
				// setTimeout(test, 800)
				C.props.hideNewRoom()
			} else C.setSubmitError()
			C.refs.input.value = ''
		}
	}

	C.submitRoomName = function() {
		let value = C.refs.input.value
		if (value && C.verifyRoomName(value)) {
			props.addRoom(value, [C.props.username])
			// props.history.push('/lobby')
			C.props.hideNewRoom()
		} else C.setSubmitError()
		C.refs.input.value = ''
	}

	C.verifyRoomName = function(value) {
		const index = C.props.rooms.findIndex(room => value === room.roomName)
		if (index >= 0) return false
		return true
	}

	C.setSubmitError = function() {
		C.setState({ error: true })
	}

	C.render = () => {
		return (
			<div className={C.props.showNewRoom ? 'hide' : ''}>
				<div>
					<div>
						<h1>New Room</h1>
					</div>
				</div>
				<div>
					<div className="new-room-inputs">
						<div>
							<input
								onKeyPress={e => {
									C.enterRoomName(e)
								}}
								ref="input"
								type="text"
								name=""
								id=""
								placeholder="Enter Room Name"
							/>
						</div>
					</div>
				</div>
				<div>
					<div>
						<div onClick={() => C.submitRoomName()}>Create</div>
					</div>
				</div>
			</div>
		)
	}

	return C
}
