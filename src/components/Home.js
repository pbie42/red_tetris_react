import React, { Component } from 'react'

function Home() {
	const component = new Component()
	component.state = {
		placeholder: ''
	}
	function placeHolder() {
		if (!component.state.placeholder)
			component.setState({ placeholder: 'Choose a username to begin' })
		else component.setState({ placeholder: '' })
	}
	component.componentDidMount = function() {
		setInterval(placeHolder(), 1000)
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
