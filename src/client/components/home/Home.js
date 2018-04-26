import React, { Component } from 'react'
import { HomeFormContainer } from '../../containers/home/HomeForm'
import logo from '../../static/Tetris-logo.png'

function RedTetris() {
	const C = new Component()

	C.componentWillLeave = function(cb) {
		setTimeout(cb(), 10000)
	}

	C.render = () => {
		return (
			<div>
				<h1>RED</h1>
			</div>
		)
	}

	return C
}

function HomeComponent(props) {
	const C = new Component()

	C.state = {
		change: false
	}

	C.componentDidMount = function() {
		// console.log(`C`, C)
	}

	C.pageChange = function() {
		console.log(`happening homie`)
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
