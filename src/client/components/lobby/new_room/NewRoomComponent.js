import React, { Component } from 'react'
import { verifyRoomName } from '../../../utils'

export function NewRoomComponent(props) {
	const C = new Component(props)

	C.state = {
		error: false,
		roomName: ''
	}

	C.enterRoomName = function(e) {
		if (e.key === 'Enter') {
			e.preventDefault()
			C.submitRoomName()
		}
	}

	C.submitRoomName = function() {
		let roomName = C.refs.input.value
		if (roomName && verifyRoomName(roomName, C.props.rooms)) {
			C.setState({ roomName })
			C.props.roomAdd(roomName, [C.props.username])
			C.props.pageChange()
			setTimeout(C.changeRoute, 800)
		} else C.setState({ error: true })
		C.refs.input.value = ''
	}

	C.changeRoute = function() {
		C.props.history.push(
			`/${C.state.roomName.replace(/ /g, '_')}[${C.props.username}]`
		)
	}

	C.render = () => {
		return (
			<div
				className={C.props.showNewRoom ? 'hide' : 'show'}
				style={{ display: C.props.display ? '' : 'none' }}
			>
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
