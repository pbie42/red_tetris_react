import React, { Component } from 'react'

function HomeForm(props) {
	const C = new Component(props)
	let input

	C.state = {
		placeholder: '',
		interval: '',
		error: false
	}

	C.componentDidMount = function() {
		const interval = setInterval(C.placeHolder, 750)
		C.setState({ interval })
	}

	C.componentWillUnmount = function() {
		clearInterval(C.state.interval)
	}

	C.enterUsername = function(e) {
		let value = C.refs.input.value
		if (e.key === 'Enter') {
			e.preventDefault()
			if (value && C.verifyUsername(value)) {
				props.setUsername(value)
				props.addUser(value)
				props.history.push('/chat')
			} else C.setSubmitError()
			C.refs.input.value = ''
		}
	}

	C.placeHolder = function() {
		if (C.state.error) {
			C.setState({ placeholder: 'Username already taken' })
		} else if (!C.state.placeholder)
			C.setState({ placeholder: 'Choose a username to begin' })
		else C.setState({ placeholder: '' })
	}

	C.submitUsername = function() {
		console.log(`submitUsername`)
		let value = C.refs.input.value
		if (value && C.verifyUsername(value)) {
			props.setUsername(value)
			props.addUser(value)
			props.history.push('/chat')
		} else C.setSubmitError()
		C.refs.input.value = ''
	}

	C.verifyUsername = function(value) {
		const index = C.props.users.findIndex(user => value === user.name)
		if (index >= 0) return false
		return true
	}

	C.setSubmitError = function() {
		C.setState({ error: true })
	}

	C.noError = function() {
		C.setState({ error: false })
	}

	C.render = () => {
		return (
			<form className={C.state.error ? 'home-form-error' : 'nothing'}>
				<div>
					<input
						className="usernameinput"
						name="username"
						onChange={() => C.noError()}
						onKeyPress={e => {
							C.enterUsername(e)
						}}
						placeholder={C.state.placeholder}
						ref="input"
						type="text"
					/>
					<div>
						<div
							className="username-button"
							onClick={() => C.submitUsername(input)}
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