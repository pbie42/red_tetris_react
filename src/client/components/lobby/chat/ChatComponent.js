import React, { Component } from 'react'
import { NewRoomComponent } from '../new_room/NewRoomComponent'

export function ChatComponent(props) {
	const C = new Component()

	C.state = {
		hide: true
	}

	C.render = () => {
		return (
			<div className="lobby-chat-new">
				<div>
					<div>
						<div>
							<h1>Chat</h1>
						</div>
					</div>
					<div>
						<div className="chat-room">
							<h2>test</h2>
						</div>
					</div>
					<div>
						<input
							type="text"
							name=""
							id=""
							placeholder="Enter message"
						/>
					</div>
				</div>
				<div className={C.props.showNewRoom ? 'hide' : ''} />
				<NewRoomComponent
					showNewRoom={C.props.showNewRoom}
					hideNewRoom={C.props.hideNewRoom}
				/>
			</div>
		)
	}

	return C
}
