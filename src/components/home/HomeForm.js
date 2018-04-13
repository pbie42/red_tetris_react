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

	C.submitNickname = function() {
		if (!input.value) return
		props.setNickname(input.value)
		props.history.push('/chat')
		input.value = ''
	}

	C.enterNickname = function(e) {
		if (e.key === 'Enter') {
			e.preventDefault()
			if (!input.value) return
			props.setNickname(input.value)
			props.history.push('/chat')
			input.value = ''
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
						ref={node => {
							input = node
						}}
						onKeyPress={e => {
							C.enterNickname(e)
						}}
						onChange={() => C.setNickname(input.value)}
					/>
					<div>
						<div className="nickname-button" onClick={() => C.submitNickname()}>
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
