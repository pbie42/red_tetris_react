import React, { Component } from 'react'
import { ViewerBoardContainer } from '../../containers/game/ViewerBoardContainer'

function RightBoardsComponent(props) {
	const C = new Component(props)

	C.render = () => {
		return (
			<div
				className={
					C.props.boards[1] || C.props.boards[3]
						? 'players-others moveInDivLeft showBackground'
						: 'players-others moveInDivLeft'
				}
			>
				{C.props.boards[1] ? (
					<ViewerBoardContainer
						id="others-grid"
						board={C.props.boards[1].board}
						username={C.props.boards[1].username}
					/>
				) : (
					''
				)}
				{C.props.boards[3] ? (
					<ViewerBoardContainer
						id="others-grid"
						board={C.props.boards[3].board}
						username={C.props.boards[3].username}
					/>
				) : (
					''
				)}
			</div>
		)
	}

	return C
}

export default RightBoardsComponent
