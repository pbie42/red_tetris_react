import React, { Component } from 'react'

const messages = [
	{
		author: 'Me',
		message:
			"So how is it going everyone I'm having a spectacular time today would anyone like to game?"
	},
	{ author: 'Jen', message: 'nothing' },
	{ author: 'Nick', message: 'You?' },
	{ author: 'Josie', message: 'Huh?' },
	{ author: 'Alex', message: 'Ohhhh' },
	{
		author: 'Me',
		message:
			"So how is it going everyone I'm having a spectacular time today would anyone like to game?"
	},
	{ author: 'Jen', message: 'nothing' },
	{ author: 'Nick', message: 'You?' },
	{ author: 'Josie', message: 'Huh?' },
	{ author: 'Alex', message: 'Ohhhh' },
	{
		author: 'Me',
		message:
			"So how is it going everyone I'm having a spectacular time today would anyone like to game?"
	},
	{ author: 'Jen', message: 'nothing' },
	{ author: 'Nick', message: 'You?' },
	{ author: 'Josie', message: 'Huh?' },
	{ author: 'Alex', message: 'Ohhhh' },
	{
		author: 'Me',
		message:
			"So how is it going everyone I'm having a spectacular time today would anyone like to game?"
	},
	{ author: 'Jen', message: 'nothing' },
	{ author: 'Nick', message: 'You?' },
	{ author: 'Josie', message: 'Huh?' },
	{ author: 'Alex', message: 'Ohhhh' },
	{
		author: 'Me',
		message:
			"So how is it going everyone I'm having a spectacular time today would anyone like to game?"
	},
	{ author: 'Jen', message: 'nothing' },
	{ author: 'Nick', message: 'You?' },
	{ author: 'Josie', message: 'Huh?' },
	{ author: 'Alex', message: 'Ohhhh' },
	{
		author: 'Me',
		message:
			"So how is it going everyone I'm having a spectacular time today would anyone like to game?"
	},
	{ author: 'Jen', message: 'nothing' },
	{ author: 'Nick', message: 'You?' },
	{ author: 'Josie', message: 'Huh?' },
	{ author: 'Alex', message: 'Ohhhh' },
	{
		author: 'Me',
		message:
			"So how is it going everyone I'm having a spectacular time today would anyone like to game?"
	},
	{ author: 'Jen', message: 'nothing' },
	{ author: 'Nick', message: 'You?' },
	{ author: 'Josie', message: 'Huh?' },
	{ author: 'Alex', message: 'Ohhhh' },
	{
		author: 'Me',
		message:
			"So how is it going everyone I'm having a spectacular time today would anyone like to game?"
	},
	{ author: 'Jen', message: 'nothing' },
	{ author: 'Nick', message: 'You?' },
	{ author: 'Josie', message: 'Huh?' },
	{ author: 'Alex', message: 'Ohhhh' },
	{
		author: 'Me',
		message:
			"So how is it going everyone I'm having a spectacular time today would anyone like to game?"
	},
	{ author: 'Jen', message: 'nothing' },
	{ author: 'Nick', message: 'You?' },
	{ author: 'Josie', message: 'Huh?' },
	{ author: 'Alex', message: 'Ohhhh' },
	{
		author: 'Me',
		message:
			"So how is it going everyone I'm having a spectacular time today would anyone like to game?"
	},
	{ author: 'Jen', message: 'nothing' },
	{ author: 'Nick', message: 'You?' },
	{ author: 'Josie', message: 'Huh?' },
	{ author: 'Alex', message: 'Ohhhh' },
	{
		author: 'Me',
		message:
			"So how is it going everyone I'm having a spectacular time today would anyone like to game?"
	},
	{ author: 'Jen', message: 'nothing' },
	{ author: 'Nick', message: 'You?' },
	{ author: 'Josie', message: 'Huh?' },
	{ author: 'Alex', message: 'Ohhhh' },
	{
		author: 'Me',
		message:
			"So how is it going everyone I'm having a spectacular time today would anyone like to game?"
	},
	{ author: 'Jen', message: 'nothing' },
	{ author: 'Nick', message: 'You?' },
	{ author: 'Josie', message: 'Huh?' },
	{ author: 'Alex', message: 'Ohhhh' },
	{
		author: 'Me',
		message:
			"So how is it going everyone I'm having a spectacular time today would anyone like to game?"
	},
	{ author: 'Jen', message: 'nothing' },
	{ author: 'Nick', message: 'You?' },
	{ author: 'Josie', message: 'Huh?' },
	{ author: 'Alex', message: 'Ohhhh' },
	{
		author: 'Me',
		message:
			"So how is it going everyone I'm having a spectacular time today would anyone like to game?"
	},
	{ author: 'Jen', message: 'nothing' },
	{ author: 'Nick', message: 'You?' },
	{ author: 'Josie', message: 'Huh?' },
	{ author: 'Alex', message: 'Ohhhh' },
	{
		author: 'Me',
		message:
			"So how is it going everyone I'm having a spectacular time today would anyone like to game?"
	},
	{ author: 'Jen', message: 'nothing' },
	{ author: 'Nick', message: 'You?' },
	{ author: 'Josie', message: 'Huh?' },
	{ author: 'Alex', message: 'Ohhhh' },
	{
		author: 'Me',
		message:
			"So how is it going everyone I'm having a spectacular time today would anyone like to game?"
	},
	{ author: 'Jen', message: 'nothing' },
	{ author: 'Nick', message: 'You?' },
	{ author: 'Josie', message: 'Huh?' },
	{ author: 'Alex', message: 'Ohhhh' }
]

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
