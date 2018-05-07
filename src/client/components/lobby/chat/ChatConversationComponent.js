import React, { Component } from 'react'

export function ChatConversationComponent(props) {
	const C = new Component()
	let div

	console.log(`props`, props)

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
				{C.props.messages.map(message => (
					<div
						className={message.author === 'Me' ? 'my-message' : 'message'}
					>
						{message.author !== 'Me' && <div className="other-message" />}
						<div
							className={
								message.author === 'Me'
									? 'message-right'
									: 'message-left'
							}
						>
							<div>
								<h3>{message.author}</h3>
								<h2>{message.message}</h2>
							</div>
						</div>
						{message.author === 'Me' && <div className="own-message" />}
					</div>
				))}
			</div>
		)
	}

	return C
}
