import React, { Component } from 'react'
import $ from 'jquery'

// const rooms = [
// 	{ name: 'test1', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test2', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test3', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test4', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test5', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test6', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test7', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test8', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test9', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test1', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test2', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test3', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test4', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test5', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test6', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test7', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test8', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test9', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test1', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test2', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test3', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test4', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test5', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test6', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test7', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test8', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test9', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test1', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test2', members: ['john', 'paul', 'george', 'ringo'] },
// 	{ name: 'test3', members: ['john', 'paul', 'george', 'ringo'] }
// ]

export function RoomsComponent(props) {
	const C = new Component()
	let scroll = 0
	let scrollMax
	let div

	console.log(`C.props`, C.props)

	C.state = {
		hideOthers: false,
		index: 0
	}

	C.componentDidMount = function() {
		// C.scrollToLeft()
		scrollMax = div.scrollWidth - div.clientWidth
		console.log(`scrollMax`, scrollMax)
	}

	C.componentWillUpdate = function() {
		// C.scrollToLeft()
	}

	C.scrollToLeft = function() {
		const { scrollWidth, clientWidth } = div
		const maxScrollTop = scrollWidth - clientWidth
		div.scrollLeft = maxScrollTop > 0 ? maxScrollTop : 0
	}

	C.goRight = function() {
		console.log(`scroll`, scroll)
		scroll += 270
		if (scroll > scrollMax + 180) {
			console.log(`scrollMax hit`, scroll)
			scroll = 0
		}
		$(div).animate({ scrollLeft: scroll }, 'fast')
	}

	C.goLeft = function() {
		console.log(`scroll`, scroll)
		scroll -= 270
		if (scroll < 0) scroll = 0
		$(div).animate({ scrollLeft: scroll }, 'fast')
	}

	C.hideOthers = function(index) {
		C.setState({ hideOthers: true, index })
	}

	C.showOthers = function(index) {
		C.setState({ hideOthers: false, index: 0 })
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
											>
												<h1>{room.roomName}</h1>
												<div>
													{room.members.map((person, index) => (
														<h2 key={index}>{person}</h2>
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
									  ))
									: C.props.rooms.map((room, index) => (
											<div
												key={index}
												className={
													index !== C.state.index ? 'hide-it' : ''
												}
												onMouseLeave={() => C.showOthers()}
											>
												<h1>{room.roomName}</h1>
												<div>
													{room.members.map((person, index) => (
														<h2 key={index}>{person}</h2>
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
						<div onClick={() => C.props.showNewRoom()}>
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
