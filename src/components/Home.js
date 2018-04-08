import React, { Component } from 'react'

class Home extends Component {
	render() {
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
									placeholder="Choose a username to begin"
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
}

export default Home
