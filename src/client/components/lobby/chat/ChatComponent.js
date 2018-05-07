import React, { Component } from 'react'
import { NewRoomComponent } from '../new_room/NewRoomComponent'
import { ChatInputContainer } from '../../../containers/lobby/chat/ChatInputContainer'
import { ChatConversationContainer } from '../../../containers/lobby/chat/ChatConversationContainer'

export function ChatComponent(props) {
	const C = new Component()

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
						<ChatConversationContainer />
					</div>
					<ChatInputContainer />
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
