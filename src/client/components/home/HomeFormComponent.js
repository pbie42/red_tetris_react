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
		C.setState({ interval: setInterval(C.placeHolder, 750) })
		setTimeout(C.focus, 2000)
	}

	C.componentWillUnmount = function() {
		clearInterval(C.state.interval)
	}

	C.placeHolder = function() {
		if (C.state.error) C.setState({ placeholder: 'Username already taken' })
		else if (!C.state.placeholder)
			C.setState({ placeholder: 'Choose a username to begin' })
		else C.setState({ placeholder: '' })
	}

	C.handleUsername = function(username) {
		if (username && verifyUsername(username, C.props.users)) {
			C.props.userSetUsername(username)
			C.props.userAdd(username)
			C.props.pageChange()
			setTimeout(C.changeRoute, 800)
		} else C.setState({ error: true })
		C.refs.input.value = ''
	}

	C.enterUsername = function(e) {
		if (e.key === 'Enter') {
			e.preventDefault()
			C.handleUsername(C.refs.input.value)
		}
	}

	C.changeRoute = function() {
		C.props.history.push('/lobby')
	}

	C.focus = function() {
		C.refs.input.focus()
	}

	C.render = () => {
		return (
			<form className={C.state.error ? 'home-form-error' : 'nothing'}>
				<div>
					<input
						autoComplete="off"
						className="usernameinput"
						name="username"
						onChange={() => C.setState({ error: false })}
						onKeyPress={e => C.enterUsername(e)}
						placeholder={C.state.placeholder}
						ref="input"
						type="text"
					/>
					<div>
						<div
							className="username-button"
							onClick={() => C.handleUsername(C.refs.input.value)}
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
