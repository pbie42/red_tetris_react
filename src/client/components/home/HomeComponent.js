import React, { Component } from 'react'
import { HomeFormContainer } from '../../containers/home/HomeFormContainer'
import logo from '../../static/tetris_logo.png'

function HomeComponent(props) {
	const C = new Component(props)

	C.state = {
		change: false
	}

	C.componentWillMount = function() {
		// console.log(`Home will mount`)
	}

	C.componentDidMount = function() {
		// console.log(`Home Mounted`)
	}

	C.pageChange = function() {
		C.setState({ change: true })
	}

	C.render = () => {
		return (
			<div
				className={
					C.state.change === false
						? 'container-home'
						: 'container-home container-fade'
				}
			>
				<div className="home">
					<div
						className={
							C.state.change === true ? 'moveOutDivDown' : 'moveInDivTop'
						}
					>
						<img className="test" src={logo} alt="" />
					</div>
					<div>
						<div className={C.state.change === true ? 'hideDiv' : 'showDiv'}>
							<HomeFormContainer
								history={props.history}
								pageChange={C.pageChange}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
	return C
}

export default HomeComponent
