import React, { Component } from 'react'

export function NewRoomComponent(props) {
	const C = new Component()

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
							<input type="text" name="" id="" placeholder="Room Name" />
						</div>
						<div>
							<input type="text" name="" id="" placeholder="Room Name" />
						</div>
						<div>
							<input type="text" name="" id="" placeholder="Room Name" />
						</div>
					</div>
				</div>
				<div>
					<div>
						<div onClick={() => C.props.hideNewRoom()}>Create</div>
					</div>
				</div>
			</div>
		)
	}

	return C
}
