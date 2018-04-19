import React, { Component } from 'react'
import { HomeFormContainer } from '../../containers/home/HomeForm'

function Home(props) {
	const C = new Component()

	C.render = () => {
		return (
			<div className="container-home">
				<div className="home">
					<div>
						<div>
							<h1>RED_TETRIS</h1>
						</div>
					</div>
					<div>
						<div>
							<HomeFormContainer history={props.history} />
						</div>
					</div>
				</div>
			</div>
		)
	}
	return C
}

export default Home
