import React, { Component } from 'react'
import { NewRoomContainer } from '../../../containers/lobby/new_room/NewRoomContainer'
import { ChatInputContainer } from '../../../containers/lobby/chat/ChatInputContainer'
import { ChatConversationContainer } from '../../../containers/lobby/chat/ChatConversationContainer'

export function ChatComponent(props) {
	const C = new Component()

	C.render = () => {
		return (
			<div className="lobby-chat-new">
				<div className={C.props.showNewRoom ? 'move-in' : 'change-width'}>
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
				<NewRoomContainer
					showNewRoom={C.props.showNewRoom}
					hideNewRoom={C.props.hideNewRoom}
				/>
			</div>
		)
	}

	return C
}
