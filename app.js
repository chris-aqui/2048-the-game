// Using DOMContentLoaded to ensure all html is loaded before doing any js work
document.addEventListener('DOMContentLoaded', () => {
	// find grid, score and results
	const gridDisplay = document.querySelector('.grid')
	const scoreDisplay = document.getElementById('score')
	const resultDisplay = document.getElementById('result')
	//
	var upButton = document.querySelector('.up')
	var downButton = document.querySelector('.down')
	var leftButton = document.querySelector('.left')
	var rightButton = document.querySelector('.right')

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
		// generate(squares)
		generate()
    generate()
	}
	// invoke function
	createBoard()
//
	// generate a new number
	function generate() {
		let randomNumber = Math.floor(Math.random() * squares.length)
		if (squares[randomNumber].innerHTML == 0) {
			squares[randomNumber].innerHTML = 2
			checkForGameOver()
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
				// use parseInt to change inner-html string to a Number
				let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

				// filter ot all the numbers from the row that are not zero?
				let filteredRow = row.filter(num => num)

				// find out how many zeros are missing
				let missing = 4 - filteredRow.length

				// make an array of zeros missing
				let zeros = Array(missing).fill(0)

				// adds zeros to the right
				let newRow = zeros.concat(filteredRow)

				squares[i].innerHTML 		= newRow[0]
				squares[i +1].innerHTML = newRow[1]
				squares[i +2].innerHTML = newRow[2]
				squares[i +3].innerHTML = newRow[3]
			}
		}
	}
	// moveRight()

	// swipe left
	function moveLeft() {
		for (let i=0; i < 16; i++) {
			if (i % 4 === 0) {
				// get each square in a row
				let totalOne = squares[i].innerHTML
				let totalTwo = squares[i+1].innerHTML
				let totalThree = squares[i+2].innerHTML
				let totalFour = squares[i+3].innerHTML

				// use parseInt to change inner-html string to a Number
				// put that into an array
				let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

				// filter out t
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
	//
	function combineRow() {
		for (let i =0; i < 15; i++) {
			if (squares[i].innerHTML === squares[i +1].innerHTML) {
				let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i +1].innerHTML)
				squares[i].innerHTML = combinedTotal
				squares[i +1].innerHTML = 0
				score += combinedTotal
				scoreDisplay.innerHTML = score
			}
		}
		checkForWin()
	}

	function combineColumn() {
		for (let i =0; i < 12; i++) {
			if (squares[i].innerHTML === squares[i +width].innerHTML) {
				let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i +width].innerHTML)
				squares[i].innerHTML = combinedTotal
				squares[i +width].innerHTML = 0
				score += combinedTotal
				scoreDisplay.innerHTML = score
			}
		}
		checkForWin()
	}

	//assign functions to keyCodes
	function control(e) {
		if(e.keyCode === 37) {
			keyLeft()
			leftButton.classList.add("pressed");
			setTimeout(function(){
				leftButton.classList.remove("pressed")
			}, 300)
			//
		} else if (e.keyCode === 38) {
			keyUp()
			upButton.classList.add("pressed");
			setTimeout(function(){
				upButton.classList.remove("pressed")
			}, 300)
			//
		} else if (e.keyCode === 39) {
			keyRight()
			rightButton.classList.add("pressed");
			setTimeout(function(){
				rightButton.classList.remove("pressed")
			}, 300)
			//
		} else if (e.keyCode === 40) {
			keyDown()
			downButton.classList.add("pressed");
			setTimeout(function(){
				downButton.classList.remove("pressed")
			}, 300)
			//
		}
	}
	document.addEventListener('keyup', control)

	function keyRight() {
		moveRight()
		combineRow()
		moveRight()
		generate()
	}

	function keyLeft() {
		moveLeft()
		combineRow()
		moveLeft()
		generate()
	}

	function keyUp() {
		moveUp()
		combineColumn()
		moveUp()
		generate()
	}

	function keyDown() {
		moveDown()
		combineColumn()
		moveDown()
		generate()
	}

	//check for the number 2048 in the squares to win
	function checkForWin() {
		for (let i=0; i < squares.length; i++) {
			if (squares[i].innerHTML == 2048) {
				resultDisplay.innerHTML = 'You WIN'
				document.removeEventListener('keyup', control)
				setTimeout(() => clear(), 3000)
			}
		}
	}

	//check if there are no zeros on the board to lose
	function checkForGameOver() {
		let zeros = 0
		for (let i=0; i < squares.length; i++) {
			if (squares[i].innerHTML == 0) {
				zeros++
			}
		}
		if (zeros === 0) {
			resultDisplay.innerHTML = 'You LOSE'
			document.removeEventListener('keyup', control)
			setTimeout(() => clear(), 3000)
		}
	}

	//clear timer
	function clear() {
		clearInterval(myTimer)
	}


	//add colours
	function addColours() {
		for (let i=0; i < squares.length; i++) {
			if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192'
			else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#eee4da'
			else if (squares[i].innerHTML  == 4) squares[i].style.backgroundColor = '#ede0c8'
			else if (squares[i].innerHTML  == 8) squares[i].style.backgroundColor = '#f2b179'
			else if (squares[i].innerHTML  == 16) squares[i].style.backgroundColor = '#ffcea4'
			else if (squares[i].innerHTML  == 32) squares[i].style.backgroundColor = '#e8c064'
			else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#ffab6e'
			else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#fd9982'
			else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#ead79c'
			else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#76daff'
			else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#beeaa5'
			else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#d7d4f0'
		}
	}
	addColours()

	var myTimer = setInterval(addColours, 50)
	//

	upButton.addEventListener('click', function(){
		keyUp()
		upButton.classList.add("pressed");
		setTimeout(function(){
			upButton.classList.remove("pressed")
		}, 300)
	})
	//
	downButton.addEventListener('click', function(){
		keyDown()
		downButton.classList.add("pressed");
		setTimeout(function(){
			downButton.classList.remove("pressed")
		}, 300)
	})
	leftButton.addEventListener('click', function(){
		keyLeft()
		leftButton.classList.add("pressed");
		setTimeout(function(){
			leftButton.classList.remove("pressed")
		}, 300)
	})
	rightButton.addEventListener('click', function(){
		keyRight()
		rightButton.classList.add("pressed");
		setTimeout(function(){
			rightButton.classList.remove("pressed")
		}, 300)
	})
//
});
