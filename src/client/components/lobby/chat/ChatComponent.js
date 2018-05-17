import React, { Component } from 'react'
import { NewRoomContainer } from '../../../containers/lobby/new_room/NewRoomContainer'
import { ChatInputContainer } from '../../../containers/lobby/chat/ChatInputContainer'
import { ChatConversationContainer } from '../../../containers/lobby/chat/ChatConversationContainer'

export function ChatComponent(props) {
	const C = new Component()

	C.render = () => {
		return (
			<div
				className={
					!C.props.change
						? 'lobby-chat-new moveInDivRight'
						: 'lobby-chat-new moveOutDivDown'
				}
			>
				<div
					className={
						C.props.showNewRoom
							? 'moveInDivRight'
							: ' moveInDivRight change-width'
					}
				>
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
				<div
					className={C.props.showNewRoom ? 'hide' : ''}
					style={{ display: C.props.display ? '' : 'none' }}
				/>
				<NewRoomContainer
					showNewRoom={C.props.showNewRoom}
					hideNewRoom={C.props.hideNewRoom}
					display={C.props.display}
					history={C.props.history}
					pageChange={C.props.pageChange}
				/>
			</div>
		)
	}

	return C
}
