import React, { Component } from 'react'
import $ from 'jquery'

const rooms = [
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test2', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test3', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test4', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test5', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test6', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test7', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test8', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test9', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test2', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test3', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test4', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test5', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test6', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test7', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test8', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test9', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test2', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test3', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test4', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test5', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test6', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test7', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test8', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test9', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test2', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test3', people: ['john', 'paul', 'george', 'ringo'] }
]

export function RoomsComponent(props) {
	const C = new Component()
	let scroll = 0
	let scrollMax
	let div

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
								{rooms.map((room, index) => (
									<div key={index}>
										<h1>{room.name}</h1>
									</div>
								))}
							</div>
						</div>
					</div>
					<div>
						<div onClick={() => C.props.showNewRoom()}>
							<h1>+</h1>
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
