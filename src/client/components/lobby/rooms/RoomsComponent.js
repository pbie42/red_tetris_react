import React, { Component } from 'react'

export function RoomsComponent(props) {
	const C = new Component()

	C.render = () => {
		return (
			<div className="lobby-rooms">
				<div>
					<div />
					<div>
						<div>
							<div>
								<h1>Rooms</h1>
							</div>
						</div>
						<div>
							<div>
								<h2>test</h2>
							</div>
						</div>
					</div>
					<div>
						<div onClick={() => C.props.showNewRoom()}>+</div>
					</div>
				</div>
			</div>
		)
	}

	return C
}
