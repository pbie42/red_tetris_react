import React, { Component } from 'react'
import $ from 'jquery'

export function RoomsComponent(props) {
	const C = new Component(props)
	let scroll = 0
	let scrollMax
	let div

	C.state = {
		hideOthers: false,
		index: 0,
		display: ''
	}

	C.componentDidMount = function() {
		scrollMax = div.scrollWidth - div.clientWidth
	}

	C.componentWillUpdate = function() {
		scrollMax = div.scrollWidth - div.clientWidth
	}

	C.selectRoom = function(roomName) {
		console.log(`room selected`)
		C.props.addUserToRoom(C.props.username, roomName)
		// C.props.gameJoined(roomName)
		C.props.history.push(`/${roomName.replace(/ /g, '_')}[${C.props.username}]`)
	}

	// C.scrollToLeft = function() {
	// 	const { scrollWidth, clientWidth } = div
	// 	const maxScrollTop = scrollWidth - clientWidth
	// 	div.scrollLeft = maxScrollTop > 0 ? maxScrollTop : 0
	// }

	C.goRight = function() {
		scroll += 270
		if (scroll > scrollMax + 180) scroll = 0
		$(div).animate({ scrollLeft: scroll }, 'slow')
	}

	C.goLeft = function() {
		scroll -= 270
		if (scroll < 0) scroll = 0
		$(div).animate({ scrollLeft: scroll }, 'slow')
	}

	C.hideOthers = function(index) {
		C.setState({ hideOthers: true, index })
	}

	C.showOthers = function(index) {
		C.setState({ hideOthers: false, index: 0 })
	}

	C.hideShowNewRoom = function() {
		if (C.props.hideInput) C.props.showNewRoom()
		else C.props.hideNewRoom()
	}

	C.render = () => {
		return (
			<div className="lobby-rooms">
				<div>
					<div>
						<div onClick={() => C.goLeft()}>
							<i className="fas fa-caret-left" />
						</div>
					</div>
					<div>
						<div>
							<div>
								<h1>Rooms</h1>
							</div>
						</div>
						<div>
							<div ref={node => (div = node)} className="testing">
								{!C.state.hideOthers
									? C.props.rooms.map((room, index) => (
											<div
												key={index}
												onMouseOver={() => C.hideOthers(index)}
												onClick={() => C.selectRoom(room.roomName)}
											>
												<h1>
													{console.log(`room`, room)}
													{room.roomName}
												</h1>
												<div>
													{room.members.map((person, index) => {
														console.log(`person`, person)
														return <h2 key={index}>{person.username}</h2>
													})}
												</div>
												<div>
													<h2>
														{5 - room.members.length} player{5 -
															room.members.length >
														1
															? 's'
															: ''}{' '}
														can still join
													</h2>
												</div>
												<div>Countdown: Pending</div>
											</div>
									  ))
									: C.props.rooms.map((room, index) => (
											<div
												key={index}
												className={index !== C.state.index ? 'hide-it' : ''}
												onMouseLeave={() => C.showOthers()}
												onClick={() => C.selectRoom(room.roomName)}
											>
												<h1>{room.roomName}</h1>
												<div>
													{room.members.map((person, index) => (
														<h2 key={index}>{person.username}</h2>
													))}
												</div>
												<div>
													<h2>
														{5 - room.members.length} player{5 -
															room.members.length >
														1
															? 's'
															: ''}{' '}
														can still join
													</h2>
												</div>
												<div>Countdown: Pending</div>
											</div>
									  ))}
							</div>
						</div>
					</div>
					<div>
						<div onClick={() => C.hideShowNewRoom()}>
							<h1>{C.props.hideInput ? '+' : '-'}</h1>
						</div>
						<div>
							<i className="fas fa-caret-right" onClick={() => C.goRight()} />
						</div>
					</div>
				</div>
			</div>
		)
	}

	return C
}
