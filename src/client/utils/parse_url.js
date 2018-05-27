function parseUrl(url) {
	let room = ''
	let player = ''
	let x = -1
	while (url[++x]) {
		if (url[x] === '[') {
			let y = x
			while (url[y] && url[++y] !== ']') player += url[y]
			x = y
		}
		if (url[x] === ']') break
		room += url[x]
	}
	room = room.replace(/_/g, ' ')
	player = player.replace(/_/g, ' ')
	return { room, player }
}

export { parseUrl }
