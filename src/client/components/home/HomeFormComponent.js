import React, { Component } from 'react'
import { verifyUsername } from '../../utils'

function HomeForm(props) {
	const C = new Component(props)
	let input

	C.state = {
		placeholder: '',
		interval: '',
		focus: '',
		error: false
	}

	C.componentDidMount = function() {
		const interval = setInterval(C.placeHolder, 750)
		C.setState({ interval })
		function focus() {
			C.refs.input.focus()
		}
		setTimeout(focus, 2000)
	}

	C.componentWillUnmount = function() {
		clearInterval(C.state.interval)
	}

	C.placeHolder = function() {
		if (C.state.error) {
			C.setState({ placeholder: 'Username already taken' })
		} else if (!C.state.placeholder)
			C.setState({ placeholder: 'Choose a username to begin' })
		else C.setState({ placeholder: '' })
	}

	C.handleUsername = function(username) {
		if (username && verifyUsername(username, C.props.users)) {
			C.props.userSetUsername(username)
			C.props.userAdd(username)
			C.props.pageChange()
			setTimeout(C.changeRoute, 800)
		} else C.setSubmitError()
		C.refs.input.value = ''
	}

	C.enterUsername = function(e) {
		let username = C.refs.input.value
		if (e.key === 'Enter') {
			e.preventDefault()
			C.handleUsername(username)
		}
	}

	C.submitUsername = function() {
		let username = C.refs.input.value
		C.handleUsername(username)
	}

	C.changeRoute = function() {
		C.props.history.push('/lobby')
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
						autoComplete="off"
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
