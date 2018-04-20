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

	C.placeHolder = function() {
		if (!C.state.placeholder)
			C.setState({ placeholder: 'Choose a username to begin' })
		else C.setState({ placeholder: '' })
	}

	C.submitNickname = function(input) {
		if (C.refs.input.value) {
			props.setNickname(C.refs.input.value)
			props.history.push('/chat')
			C.refs.input.value = ''
		}
	}

	C.enterNickname = function(e) {
		if (e.key === 'Enter') {
			e.preventDefault()
			if (C.refs.input.value) {
				props.setNickname(C.refs.input.value)
				props.history.push('/chat')
				C.refs.input.value = ''
			}
		}
	}

	C.setNickname = function(value) {
		props.setNickname(value)
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
						onChange={() => C.setNickname(C.refs.input.value)}
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
