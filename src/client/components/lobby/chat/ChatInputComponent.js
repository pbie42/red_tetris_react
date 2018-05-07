import React from 'react'

export const ChatInputComponent = props => {
	let input

	return (
		<div>
			<input
				type="text"
				placeholder="Enter message"
				ref={node => (input = node)}
				onKeyPress={e => {
					if (e.key === 'Enter') {
						props.addMessage(input.value, props.username)
						input.value = ''
					}
				}}
			/>
		</div>
	)
}
