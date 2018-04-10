import React, { Component } from 'react'
import { Form } from '../../containers/home/Form'

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
							<Form history={props.history} />
						</div>
					</div>
				</div>
			</div>
		)
	}
	return C
}

export default Home
