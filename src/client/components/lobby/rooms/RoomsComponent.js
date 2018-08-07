import React, { Component } from 'react'
import $ from 'jquery'
import { verifyMemberCount } from '../../../utils'

export function RoomsComponent(props) {
	const C = new Component(props)
	let scroll = 0
	let scrollMax
	let div

	C.state = {
		hideOthers: false,
		index: 0,
		display: '',
		change: false,
		selectedRoom: '',
		roomError: false
	}

	C.componentDidMount = function () {
		scrollMax = div.scrollWidth - div.clientWidth
	}

	C.componentWillUpdate = function () {
		scrollMax = div.scrollWidth - div.clientWidth
	}

	C.selectRoom = function (roomName) {
		if (verifyMemberCount(C.props.rooms, roomName)) {
			console.log(`Members verified`)
			C.setState({ change: true, selectedRoom: roomName })
			C.props.roomAddUser(C.props.username, roomName)
			C.props.pageChange()
			setTimeout(C.changeRoute, 800)
		} else {
			console.log(`Too many members`)
			C.setState({ selectedRoom: roomName, roomError: true })
			setTimeout(() => {
				C.setState({ selectedRoom: '', roomError: false })
			}, 1000);
		}
	}

	C.changeRoute = function () {
		C.props.history.push(
			`/${C.state.selectedRoom.replace(/ /g, '_')}[${C.props.username}]`
		)
	}

	C.goRight = function () {
		scroll += 270
		if (scroll > scrollMax + 180) scroll = 0
		$(div).animate({ scrollLeft: scroll }, 'slow')
	}

	C.goLeft = function () {
		scroll -= 270
		if (scroll < 0) scroll = 0
		$(div).animate({ scrollLeft: scroll }, 'slow')
	}

	C.hideOthers = function (index) {
		C.setState({ hideOthers: true, index })
	}

	C.showOthers = function (index) {
		C.setState({ hideOthers: false, index: 0 })
	}

	C.hideShowNewRoom = function () {
		if (C.props.hideInput) C.props.showNewRoom()
		else C.props.hideNewRoom()
	}

	C.render = () => {
		return (
			<div
				className={
					!C.props.change
						? 'lobby-rooms moveInDivLeft'
						: 'lobby-rooms moveOutDivDown'
				}
			>
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
									? C.props.rooms.map((room, index) => {
										const error = C.state.roomError && C.state.selectedRoom === room.roomName ? 'room-error' : ''
										console.log(`C.state.roomError`, C.state.roomError)
										console.log(`C.state.selectedRoom`, C.state.selectedRoom)
										console.log(`error`, error)
										return (
											<div
												key={index}
												onMouseOver={() => C.hideOthers(index)}
												onClick={() => C.selectRoom(room.roomName)}
												className={error}
											>
												<h1>{room.roomName}</h1>
												<div>
													{room.members.map((person, index) => {
														return (
															<h2 key={index}>
																{person.username}
															</h2>
														)
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
												<div>{room.message}</div>
											</div>
										)
									})
									: C.props.rooms.map((room, index) => {
										const error = C.state.roomError && C.state.selectedRoom === room.roomName ? 'room-error' : ''
										console.log(`error`, error)
										return (
											<div
												key={index}
												className={
													index !== C.state.index ? 'hide-it' + error : '' + error
												}
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
												<div>{room.message}</div>
											</div>
										)
									})}
							</div>
						</div>
					</div>
					<div>
						<div onClick={() => C.hideShowNewRoom()}>
							<h1>{C.props.hideInput ? '+' : '-'}</h1>
						</div>
						<div>
							<i
								className="fas fa-caret-right"
								onClick={() => C.goRight()}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return C
}
