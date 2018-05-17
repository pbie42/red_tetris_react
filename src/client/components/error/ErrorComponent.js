import React, { Component } from 'react'

function ErrorComponent(props) {
	const C = new Component(props)

	C.render = () => {
		return (
			<div className="container-error">
				{!C.props.errorName &&
					C.props.roomName &&
					!C.props.error && (
						<div className="error-message-container">
							<h1>ERROR</h1>
							<h2>Room Name Taken</h2>
							<h3>You will be redirected now!</h3>
						</div>
					)}
				{C.props.errorName &&
					!C.props.roomName &&
					!C.props.error && (
						<div className="error-message-container">
							<h1>ERROR</h1>
							<h2>Username Taken</h2>
							<h3>You will be redirected now!</h3>
						</div>
					)}
				{!C.props.errorName &&
					!C.props.roomName &&
					!C.props.errorTooManyMembers &&
					!C.props.error && (
						<div className="error-message-container">
							<h1>ERROR</h1>
							<h2>You shouldn't be here lol</h2>
							<h3>You will be redirected now!</h3>
						</div>
					)}
				{!C.props.errorName &&
					!C.props.roomName &&
					!C.props.error &&
					C.props.errorTooManyMembers && (
						<div className="error-message-container">
							<h1>ERROR</h1>
							<h2>Too Many Members</h2>
							<h3>You will be redirected now!</h3>
						</div>
					)}
				{!C.props.errorName &&
					!C.props.roomName &&
					C.props.error && (
						<div className="error-message-container">
							<h1>ERROR</h1>
							<h2>Other</h2>
							<h3>You will be redirected now!</h3>
						</div>
					)}
			</div>
		)
	}

	return C
}

export default ErrorComponent
