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

//  swipe right
function moveRight(){
	for (let i = 0; i < 16; i++) {
		// find row
		if(i % 4 === 0){
			let totalOne = squares[i].innerHTML
			let totalTwo = squares[i+1].innerHTML
			let totalThree = squares[i+2].innerHTML
			let totalFour = squares[i+3].innerHTML
			// use parseInt to change innerhtml string to a Number
			let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
			console.log('##row ', row)
			//

			// filter ot all the numbers from the row?
			let filteredRow = row.filter(num => num)
			let missing = 4 - filteredRow.length
			let zeros = Array(missing).fill(0)
			let newRow = filteredRow.concat(zeros)
			console.log('##newRow ', newRow)

			squares[i].innerHTML = newRow[0]
			squares[i +1].innerHTML = newRow[1]
			squares[i +2].innerHTML = newRow[2]
			squares[i +3].innerHTML = newRow[3]
		}
	}
}

// swipe left
function moveLeft() {
	for (let i=0; i < 16; i++) {
		if (i % 4 === 0) {
			let totalOne = squares[i].innerHTML
			let totalTwo = squares[i+1].innerHTML
			let totalThree = squares[i+2].innerHTML
			let totalFour = squares[i+3].innerHTML
			let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

			let filteredRow = row.filter(num => num)
			let missing = 4 - filteredRow.length
			let zeros = Array(missing).fill(0)
			let newRow = filteredRow.concat(zeros)

			squares[i].innerHTML = newRow[0]
			squares[i +1].innerHTML = newRow[1]
			squares[i +2].innerHTML = newRow[2]
			squares[i +3].innerHTML = newRow[3]
		}
	}
}

// swipe up
function moveUp() {
	for (let i=0; i < 4; i++) {
		let totalOne = squares[i].innerHTML
		let totalTwo = squares[i+width].innerHTML
		let totalThree = squares[i+(width*2)].innerHTML
		let totalFour = squares[i+(width*3)].innerHTML
		let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

		let filteredColumn = column.filter(num => num)
		let missing = 4 - filteredColumn.length
		let zeros = Array(missing).fill(0)
		let newColumn = filteredColumn.concat(zeros)

		squares[i].innerHTML = newColumn[0]
		squares[i +width].innerHTML = newColumn[1]
		squares[i+(width*2)].innerHTML = newColumn[2]
		squares[i+(width*3)].innerHTML = newColumn[3]
	}
}

// swipe down
function moveDown() {
	for (let i=0; i < 4; i++) {
		let totalOne = squares[i].innerHTML
		let totalTwo = squares[i+width].innerHTML
		let totalThree = squares[i+(width*2)].innerHTML
		let totalFour = squares[i+(width*3)].innerHTML
		let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

		let filteredColumn = column.filter(num => num)
		let missing = 4 - filteredColumn.length
		let zeros = Array(missing).fill(0)
		let newColumn = zeros.concat(filteredColumn)

		squares[i].innerHTML = newColumn[0]
		squares[i +width].innerHTML = newColumn[1]
		squares[i+(width*2)].innerHTML = newColumn[2]
		squares[i+(width*3)].innerHTML = newColumn[3]
	}
}
