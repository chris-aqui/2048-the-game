// Using DOMContentLoaded to ensure all html is loaded before doing any js work
document.addEventListener('DOMContentLoaded', () => {
	// find grid, score and results
	const gridDisplay = document.querySelector('.grid')
	const scoreDisplay = document.getElementById('score')
	const resultDisplay = document.getElementById('result')

	let squares = []
	const width = 4
	let score = 0

	//create the playing board
	function createBoard() {
		for (let i = 0; i < width * width; i++) {
			square = document.createElement('div')
			square.innerHTML = 0
			// add to grid
			gridDisplay.appendChild(square)
			// collect square to work with.
			squares.push(square)
			// console.log('##squares ', squares)
		}
		generate(squares)
    generate(squares)
	}
	// invoke function
	createBoard()
});

// generate a new number
function generate(arr) {
	let randomNumber = Math.floor(Math.random() * arr.length)
	if (arr[randomNumber].innerHTML == 0) {
		arr[randomNumber].innerHTML = 2
		// checkForGameOver()
	} else generate()
}