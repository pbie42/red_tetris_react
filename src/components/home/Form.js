import React, { Component } from 'react'

function Form(props) {
	const C = new Component()
	let input

	C.state = {
		placeholder: '',
		interval: ''
	}

	function placeHolder() {
		if (!C.state.placeholder)
			C.setState({ placeholder: 'Choose a username to begin' })
		else C.setState({ placeholder: '' })
	}

	C.componentDidMount = function() {
		const interval = setInterval(placeHolder, 750)
		C.setState({ interval })
	}

	C.componentWillUnmount = function() {
		clearInterval(C.state.interval)
	}

	C.render = () => {
		return (
			<form action="">
				<div>
					<input
						type="text"
						placeholder={C.state.placeholder}
						name="username"
						ref={node => {
							input = node
						}}
						onKeyPress={e => {
							if (e.key === 'Enter') {
								e.preventDefault()
								if (!input.value) return
								props.dispatch(input.value)
								input.value = ''
								props.history.push('/chat')
							}
						}}
					/>
					<div>
						<div
							onClick={() => {
								if (!input.value) return
								props.history.push('/chat')
							}}
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

export default Form
