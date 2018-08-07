import React, { Component } from 'react'

function ErrorComponent(props) {
	const C = new Component(props)

	C.state = {
		change: false
	}

	C.componentDidMount = function () {
		function delayFade() {
			C.setState({ change: true })
		}
		setTimeout(delayFade, 4000)
		function delayRouteChange() {
			if (!C.props.errorName &&
				!C.props.roomName &&
				!C.props.error &&
				C.props.errorTooManyMembers) props.history.push('/lobby')
			else props.history.push('/')
		}
		setTimeout(delayRouteChange, 6000)
	}

	C.render = () => {
		return (
			<div
				className={
					!C.state.change ? 'container-error' : 'container-error container-fade'
				}
			>
				{!C.props.errorName &&
					C.props.roomName &&
					!C.props.error && (
						<div
							className={
								!C.state.change
									? 'error-message-container'
									: 'error-message-container moveOutDivDown'
							}
						>
							<h1>ERROR</h1>
							<h2>Room Name Taken</h2>
							<h3>You will be redirected now!</h3>
						</div>
					)}
				{C.props.errorName &&
					!C.props.roomName &&
					!C.props.error && (
						<div
							className={
								!C.state.change
									? 'error-message-container'
									: 'error-message-container moveOutDivDown'
							}
						>
							<h1>ERROR</h1>
							<h2>Username Taken</h2>
							<h3>You will be redirected now!</h3>
						</div>
					)}
				{!C.props.errorName &&
					!C.props.roomName &&
					!C.props.errorTooManyMembers &&
					!C.props.error && (
						<div
							className={
								!C.state.change
									? 'error-message-container'
									: 'error-message-container moveOutDivDown'
							}
						>
							<h1>ERROR</h1>
							<h2>You shouldn't be here lol</h2>
							<h3>You will be redirected now!</h3>
						</div>
					)}
				{!C.props.errorName &&
					!C.props.roomName &&
					!C.props.error &&
					C.props.errorTooManyMembers && (
						<div
							className={
								!C.state.change
									? 'error-message-container'
									: 'error-message-container moveOutDivDown'
							}
						>
							<h1>ERROR</h1>
							<h2>Too Many Members</h2>
							<h3>You will be redirected now!</h3>
						</div>
					)}
				{!C.props.errorName &&
					!C.props.roomName &&
					C.props.error && (
						<div
							className={
								!C.state.change
									? 'error-message-container'
									: 'error-message-container moveOutDivDown'
							}
						>
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
