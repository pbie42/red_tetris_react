import React, { Component } from 'react'

function Home() {
	const component = new Component()
	component.state = {
		placeholder: '',
		interval: ''
	}
	function placeHolder() {
		if (!component.state.placeholder)
			component.setState({ placeholder: 'Choose a username to begin' })
		else component.setState({ placeholder: '' })
	}
	component.componentDidMount = function() {
		const interval = setInterval(placeHolder, 750)
		component.setState({ interval })
	}
	component.componentWillUnmount = function() {
		clearInterval(component.state.interval)
	}
	component.render = () => {
		return (
			<div className="home">
				<div>
					<div>
						<h1>RED_TETRIS</h1>
						<span>Worldwide</span>
					</div>
				</div>
				<div>
					<div>
						<form action="">
							<div>
								<input
									type="text"
									placeholder={component.state.placeholder}
									name="username"
								/>
								<div>
									<div>Start →</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
	return component
}

export default Home
