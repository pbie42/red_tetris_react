import React, { Component } from 'react'
import { ViewerBoardContainer } from '../../containers/game/ViewerBoardContainer'

function GameMessageComponent(props) {
	const C = new Component(props)

	C.render = () => {
		return (
			<div>
				{C.props.userId === C.props.roomId ? (
					<h1>{C.props.message}</h1>
				) : (
					<h1> </h1>
				)}
				{C.props.userId !== C.props.roomId ? (
					<h1>{C.props.message}</h1>
				) : (
					<h1> </h1>
				)}
			</div>
		)
	}

	return C
}

export default GameMessageComponent
