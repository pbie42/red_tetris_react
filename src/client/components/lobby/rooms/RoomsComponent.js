import React, { Component } from 'react'

const rooms = [
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] },
	{ name: 'test1', people: ['john', 'paul', 'george', 'ringo'] }
]

export function RoomsComponent(props) {
	const C = new Component()
	let div

	C.componentDidMount = function() {
		C.scrollToLeft()
	}

	C.componentWillUpdate = function() {
		C.scrollToLeft()
	}

	C.scrollToLeft = function() {
		const { scrollWidth, clientWidth } = div
		const maxScrollTop = scrollWidth - clientWidth
		div.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
	}

	C.render = () => {
		return (
			<div className="lobby-rooms">
				<div>
					<div>
						<div>&#60;</div>
					</div>
					<div>
						<div>
							<div>
								<h1>Rooms</h1>
							</div>
						</div>
						<div>
							<div ref={node => (div = node)}>
								{rooms.map(room => (
									<div>
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
					</div>
				</div>
			</div>
		)
	}

	return C
}
