import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

const Button = withRouter(({ history }) => (
	<div
		onClick={() => {
			history.push('/chat')
		}}
	>
		Start →
	</div>
))

function Home(props) {
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
			<div className="container-home">
				<div className="home">
					<div>
						<div>
							<h1>RED_TETRIS</h1>
							{/* <span>Worldwide</span> */}
						</div>
					</div>
					<div>
						<div>
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
											// e.preventDefault()
											if (e.key === 'Enter') {
												props.dispatch(input.value)
												input.value = ''
											}
										}}
									/>
									<div>
										<Button />
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
	return C
}

export default Home
