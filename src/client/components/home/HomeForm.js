import React, { Component } from 'react'

function HomeForm(props) {
	const C = new Component(props)
	let input

	C.state = {
		placeholder: '',
		interval: ''
	}

	C.componentDidMount = function() {
		const interval = setInterval(C.placeHolder, 750)
		C.setState({ interval })
	}

	C.componentWillUnmount = function() {
		clearInterval(C.state.interval)
	}

	C.enterNickname = function(e) {
		let value = C.refs.input.value
		if (e.key === 'Enter') {
			e.preventDefault()
			if (value && C.verifyNickname(value)) {
				props.setNickname(value)
				props.addUser(value)
				props.history.push('/chat')
			} else C.setSubmitError()
			C.refs.input.value = ''
		}
	}

	C.placeHolder = function() {
		if (!C.state.placeholder)
			C.setState({ placeholder: 'Choose a username to begin' })
		else C.setState({ placeholder: '' })
	}

	C.submitNickname = function() {
		console.log(`submitNickname`)
		let value = C.refs.input.value
		if (value && C.verifyNickname(value)) {
			props.setNickname(value)
			props.addUser(value)
			props.history.push('/chat')
		} else C.setSubmitError()
		C.refs.input.value = ''
	}

	C.verifyNickname = function(value) {
		const index = C.props.users.findIndex(user => value === user.name)
		if (index >= 0) return false
		return true
	}

	C.setSubmitError = function() {
		console.log(`ERROR BRO`)
	}

	C.render = () => {
		return (
			<form action="">
				<div>
					<input
						type="text"
						className="nicknameinput"
						placeholder={C.state.placeholder}
						name="username"
						ref="input"
						onKeyPress={e => {
							C.enterNickname(e)
						}}
					/>
					<div>
						<div
							className="nickname-button"
							onClick={() => C.submitNickname(input)}
						>
							Start →
						</div>
					</div>
				</div>
			</form>
		)
	}
	return C
}

export default HomeForm
