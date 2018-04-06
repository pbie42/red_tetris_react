import React, { Component } from 'react'

class Home extends Component {
	render() {
		return (
			<div className="home">
				<div>
					<div>
						<h1>RED TETRIS</h1>
					</div>
				</div>
				<div>
					<div>
						<h1>Welcome to Red_Tetris</h1>
						<h2>To begin please select a username</h2>
						<form action="">
							<div>
								<label htmlFor="username">Username:</label>
								<input type="text" name="username" />
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default Home
