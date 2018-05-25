// Default Variables
var gameRunning = false;
var playerIs_XorO = false;
var computerIs_XorO = false;
var whos_turn = null;
var turn_number = 1

var game_board = '         '; //Will just index 0-8 with X or O


function startNewGame() {
	console.log("New Game button clicked.");
	document.getElementsByClassName('tictactoe-options-1')[0].style.display = 'none';
	document.getElementsByClassName('tictactoe-options-2')[0].style.display = 'block';
}

function checkForWin(XorO) {

	var winningMap = [/XXX(X| )(X| )(X| )(X| )(X| )(X| )/,
										/(X| )(X| )(X| )XXX(X| )(X| )(X| )/,
										/(X| )(X| )(X| )(X| )(X| )(X| )XXX/,
										/X(X| )(X| )(X| )X(X| )(X| )(X| )X/,
										/(X| )(X| )X(X| )X(X| )X(X| )(X| )/,
										/X(X| )(X| )X(X| )(X| )X(X| )(X| )/,
										/(X| )X(X| )(X| )X(X| )(X| )X(X| )/,
										/(X| )(X| )X(X| )(X| )X(X| )(X| )X/]

	var playerMap = '';
	if (XorO === 'O') {
		playerMap = game_board.replace(/X/g, ' ').replace(/O/g, 'X');
	} else if (XorO === 'X') {
		playerMap = game_board.replace(/O/g, ' ');	
	}

	console.log(playerMap);
	for (var i = 0; i < winningMap.length; i++) {
		if (playerMap.match(winningMap[i]) !== null) {
			console.log("winning condition", whos_turn);
			gameRunning = false;
			if (whos_turn === 'human') {
				document.getElementsByClassName('tictactoe-win-loss-message')[0].innerHTML = 'Player Wins!';
			} else {
				document.getElementsByClassName('tictactoe-win-loss-message')[0].innerHTML = 'Computer Wins!';
			}
			document.getElementsByClassName('tictactoe-game-banner')[0].style.visibility = 'visible';
		}
	}

	if (game_board.indexOf(' ') === -1) {
		console.log('draw condition');
		document.getElementsByClassName('tictactoe-win-loss-message')[0].innerHTML = "It's a Draw!";
		document.getElementsByClassName('tictactoe-game-banner')[0].style.visibility = 'visible';
		gameRunning = false;
	}
}

function computerCellClick(cell) {
	if (game_board[cell] === ' ') {
		game_board = game_board.split('');
		game_board[cell] = computerIs_XorO;
		game_board = game_board.join('');
		document.getElementById('ttt-cell-' + (cell + 1).toString()).innerHTML = computerIs_XorO;
	}
}

function computersTurn() {
	if (gameRunning === false) {return;}
	console.log('Computers Turn');
	var blockThreeXs = /XX |X X| XX/;
	var blockThreeOs = /OO |O O| OO/;
	var whatToBlock;

	if (computerIs_XorO === 'O') {
		whatToBlock = blockThreeXs;
	} else if (computerIs_XorO === 'X') {
		whatToBlock = blockThreeOs;
	}

	if ((game_board[0]+game_board[1]+game_board[2]).match(whatToBlock) !== null) {
		computerCellClick(0);
		computerCellClick(1);
		computerCellClick(2);
	} else if ((game_board[3]+game_board[4]+game_board[5]).match(whatToBlock) !== null) {
		computerCellClick(3);
		computerCellClick(4);
		computerCellClick(5);
	} else if ((game_board[6]+game_board[7]+game_board[8]).match(whatToBlock) !== null) {
		computerCellClick(6);
		computerCellClick(7);
		computerCellClick(8);
	} else if ((game_board[0]+game_board[3]+game_board[6]).match(whatToBlock) !== null) {
		computerCellClick(0);
		computerCellClick(3);
		computerCellClick(6);
	} else if ((game_board[1]+game_board[4]+game_board[7]).match(whatToBlock) !== null) {
		computerCellClick(1);
		computerCellClick(4);
		computerCellClick(7);
	} else if ((game_board[2]+game_board[5]+game_board[8]).match(whatToBlock) !== null) {
		computerCellClick(2);
		computerCellClick(5);
		computerCellClick(8);
	} else if ((game_board[0]+game_board[4]+game_board[8]).match(whatToBlock) !== null) {
		computerCellClick(0);
		computerCellClick(4);
		computerCellClick(8);
	} else if ((game_board[2]+game_board[4]+game_board[6]).match(whatToBlock) !== null) {
		computerCellClick(2);
		computerCellClick(4);
		computerCellClick(6);
	} else {
		switch (' ') {
			case (game_board[4]):
				computerCellClick(4);
				break;
			case (game_board[0]):
				computerCellClick(0);
				break;
			case (game_board[2]):
				computerCellClick(2);
				break;
			case (game_board[8]):
				computerCellClick(8);
				break;
			case (game_board[6]):
				computerCellClick(6);
				break;
			case (game_board[1]):
				computerCellClick(1);
				break;
			case (game_board[5]):
				computerCellClick(5);
				break;
			case (game_board[7]):
				computerCellClick(7);
				break;
			case (game_board[3]):
				computerCellClick(3);
				break;
		}
	}

	checkForWin(computerIs_XorO);
	if (gameRunning === true) {
		whos_turn = 'human';
		turn_number++;
		document.getElementsByClassName('tictactoe-whos-turn')[0].innerHTML = "Turn " + turn_number + " - Player's Turn";
	}
}

function playerPickX() {
	console.log("Player picked X's");
	
	playerIs_XorO = 'X';
	computerIs_XorO = 'O';
	gameRunning = true;
	whos_turn = 'human';

	document.getElementsByClassName('tictactoe-options-2')[0].style.display = 'none';
	document.getElementsByClassName('tictactoe-options-3')[0].style.display = 'block';
	document.getElementsByClassName('tictactoe-whos-turn')[0].innerHTML = "Turn 1 - Player's Turn";


}

function playerPickO() {
	console.log("Player picked O's");

	playerIs_XorO = 'O';
	computerIs_XorO = 'X';
	gameRunning = true;
	whos_turn = 'computer';

	document.getElementsByClassName('tictactoe-options-2')[0].style.display = 'none';
	document.getElementsByClassName('tictactoe-options-3')[0].style.display = 'block';
	document.getElementsByClassName('tictactoe-whos-turn')[0].innerHTML = "Turn 1 - Computer's Turn";

	setTimeout(computersTurn,1000);
}

function resetCurrentGame() {
	console.log("Reset Game button clicked.");
	document.getElementsByClassName('tictactoe-options-3')[0].style.display = 'none';
	document.getElementsByClassName('tictactoe-options-2')[0].style.display = 'block';
	gameRunning = false;
	playerIs_XorO = false;
	computerIs_XorO = false;
	whos_turn = null;
	turn_number = 1;
	game_board = '         ';
	for (var i = 1; i < 10; i++) {
		document.getElementById('ttt-cell-' + i).innerHTML = '';
	}
	document.getElementsByClassName('tictactoe-game-banner')[0].style.visibility = 'hidden';
}

function cellClick(cell) {
	console.log("Cell", cell.getAttribute("data-cell-number"), "clicked.");
	if (gameRunning === true && whos_turn === 'human' && game_board[cell.getAttribute("data-cell-number")-1] === ' ') {
		game_board = game_board.split('');
		game_board[cell.getAttribute("data-cell-number")-1] = playerIs_XorO;
		game_board = game_board.join('');
		document.getElementById('ttt-cell-' + cell.getAttribute("data-cell-number")).innerHTML = playerIs_XorO;
		checkForWin(playerIs_XorO);
		if (gameRunning === true) {
			whos_turn = 'computer';
			turn_number++;
			document.getElementsByClassName('tictactoe-whos-turn')[0].innerHTML = "Turn " + turn_number + " - Computer's Turn";
			setTimeout(computersTurn,1000);
		}
	}
}