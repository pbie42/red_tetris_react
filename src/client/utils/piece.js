function randomPiece() {
	const pieces = ['i', 'j', 'l', 'o', 's', 't', 'z']
	return pieces[Math.floor(Math.random() * pieces.length)]
}

function pieceOrder() {
	const pieces = []
	for (let i = 0; i < 100; i++) pieces.push(randomPiece())
	return pieces
}

export { randomPiece, pieceOrder }
