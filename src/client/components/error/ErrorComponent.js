import React, { Component } from 'react'

function ErrorComponent(props) {
	const C = new Component(props)

	C.render = () => {
		return (
			<div className="container-game">
				{!C.props.errorName &&
					C.props.roomName &&
					!C.props.error && <h1>ERROR: Room Name Taken</h1>}
				{C.props.errorName &&
					!C.props.roomName &&
					!C.props.error && <h1>ERROR: Username Taken</h1>}
				{!C.props.errorName &&
					!C.props.roomName &&
					!C.props.error && <h1>ERROR: Accident</h1>}
				{!C.props.errorName &&
					!C.props.roomName &&
					C.props.error && <h1>ERROR: Other</h1>}
			</div>
		)
	}

	return C
}

export default ErrorComponent
