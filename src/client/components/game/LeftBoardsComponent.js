import React, { Component } from 'react'
import { ViewerBoardContainer } from '../../containers/game/ViewerBoardContainer'

function LeftBoardsComponent(props) {
	const C = new Component(props)

	C.render = () => {
		return (
			<div
				className={
					C.props.boards[0] || C.props.boards[2]
						? 'players-others moveInDivRight showBackground'
						: 'players-others moveInDivRight'
				}
			>
				{C.props.boards[0] ? (
					<ViewerBoardContainer
						board={C.props.boards[0].board}
						username={C.props.boards[0].username}
						id="others-grid"
					/>
				) : (
					''
				)}
				{C.props.boards[2] ? (
					<ViewerBoardContainer
						id="others-grid"
						board={C.props.boards[2].board}
						username={C.props.boards[2].username}
					/>
				) : (
					''
				)}
			</div>
		)
	}

	return C
}

export default LeftBoardsComponent
