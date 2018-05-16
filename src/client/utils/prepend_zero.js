function prependZero(num) {
	if (num.toString().length === 1) return '0' + num
	return num
}

module.exports = {
	prependZero
}
