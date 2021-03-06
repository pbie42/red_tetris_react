import React, { Component } from 'react'

export function ChatConversationComponent(props) {
	const C = new Component()
	let div

	C.componentDidMount = function() {
		C.scrollToBottom()
	}

	C.componentWillUpdate = function() {
		C.scrollToBottom()
	}

	C.scrollToBottom = function() {
		const { scrollHeight, clientHeight } = div
		const maxScrollTop = scrollHeight - clientHeight
		div.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
	}

	C.render = () => {
		return (
			<div ref={node => (div = node)} className="chat-room">
				{C.props.messages.map((message, index) => (
					<div
						key={index}
						className={
							message.author === C.props.username ? 'my-message' : 'message'
						}
					>
						{message.author !== C.props.username && (
							<div className="other-message" />
						)}
						<div
							className={
								message.author === C.props.username
									? 'message-right'
									: 'message-left'
							}
						>
							<div>
								<h3>{message.author}</h3>
								<h2>{message.message}</h2>
							</div>
						</div>
						{message.author === C.props.username && (
							<div className="own-message" />
						)}
					</div>
				))}
			</div>
		)
	}

	return C
}
