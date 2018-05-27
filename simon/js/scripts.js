var currentPattern = [];
var currentTurn = 1;
var userMoves = 0;
var strictMode = false;
var gameRunning = false;
var demoRunning = false;

function newGamePatternMaker() {
	while (currentPattern.length < 20) {
		var colorMap = ['Blue', 'Red', 'Yellow', 'Green'];
		var randomColor = Math.floor(Math.random() * Math.floor(4));
		currentPattern.push(colorMap[randomColor]);
	}
}

function computerDemo() {
	console.log('Computer Demo Running.');
	var i = 0;

	if (gameRunning === true) {
		demoRunning = true;
		document.getElementsByClassName('simon_digital_banner')[0].innerHTML = 'WATCH CLOSE';
		if (currentTurn < 10) {
			document.getElementsByClassName('simon_number_screen')[0].innerHTML = '0' + currentTurn;
		} else if (currentTurn >= 10) {
			document.getElementsByClassName('simon_number_screen')[0].innerHTML = currentTurn;	
		}
	}
	
	function demoLoop() {
		
		if (gameRunning === false) {
			return;
		}
		
  	setTimeout(function () {
      switch (currentPattern[i]) {
				case ('Blue'):
					bluePressed();
					break;
				case ('Red'):
					redPressed();
					break;
				case ('Yellow'):
					yellowPressed();
					break;
				case ('Green'):
					greenPressed();
					break;
      }
      i++;
      if (i < currentTurn) {
         demoLoop();
      } else {
      	demoRunning = false;
      	userMoves = 0;
      	document.getElementsByClassName('simon_digital_banner')[0].innerHTML = 'YOUR TURN';
      }
   }, 750);
  }
  demoLoop()
}

function simon_start_button() {
	console.log("Start button pressed.");
	if (gameRunning === false && demoRunning === false) {
		newGamePatternMaker();
		gameRunning = true;
		computerDemo();	
	}
}

function simon_reset_button() {
	console.log("Reset button pressed.");
	currentPattern = [];
	currentTurn = 1;
	userMoves = 0;
	gameRunning = false;
	demoRunning = false;
	document.getElementsByClassName('simon_digital_banner')[0].innerHTML = 'PRESS PLAY';
	document.getElementsByClassName('simon_number_screen')[0].innerHTML = '00';
}

function simon_strict_button() {
	console.log("Strict button pressed.");
	if (strictMode === false) {
		strictMode = true;
		document.getElementsByClassName('simon_digital_banner')[0].innerHTML = 'STRICT - ON';
		document.getElementsByClassName('simon_strict_button')[0].style.backgroundColor = '#fc5f99';
	} else if (strictMode === true) {
		strictMode = false;
		document.getElementsByClassName('simon_digital_banner')[0].innerHTML = 'STRICT - OFF';
		document.getElementsByClassName('simon_strict_button')[0].style.backgroundColor = '#f0f0f0';
	}
	if (gameRunning === true) {
		demoRunning = true;
		setTimeout(computerDemo, 1000);
	} else if (gameRunning === false) {
		demoRunning = true;
		setTimeout(simon_reset_button, 1000);
	}
}

function bluePressed() {
	var buttonSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
	buttonSound.play();
	document.getElementsByClassName('blue_button')[0].style.backgroundColor = '#75baff';
	setTimeout(function() {document.getElementsByClassName('blue_button')[0].style.backgroundColor = '#4958cc'}, 500);
}

function redPressed() {
	var buttonSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
	buttonSound.play();
	document.getElementsByClassName('red_button')[0].style.backgroundColor = '#fc5f99';
	setTimeout(function() {document.getElementsByClassName('red_button')[0].style.backgroundColor = '#bc3c3c'}, 500);	
}

function yellowPressed() {
	var buttonSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
	buttonSound.play();
	document.getElementsByClassName('yellow_button')[0].style.backgroundColor = '#fff242';
	setTimeout(function() {document.getElementsByClassName('yellow_button')[0].style.backgroundColor = '#e2d631'}, 500);
}

function greenPressed() {
	var buttonSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
	buttonSound.play();
	document.getElementsByClassName('green_button')[0].style.backgroundColor = '#6ef75b';
	setTimeout(function() {document.getElementsByClassName('green_button')[0].style.backgroundColor = '#43bc32'}, 500);
}

function failureSound(counter) {
	console.log(counter);

	bluePressed();
	redPressed();
	yellowPressed();
	greenPressed();
	counter--;
	if (counter > 0) {
		setTimeout(function() {
			failureSound(counter);
		}, 500);

	}
	
		
}

function checkUserMove(color) {
	console.log('Checking');
	console.log('User -',userMoves, color);
	console.log('Comp -',userMoves, currentPattern[userMoves-1]);
	if (color !== currentPattern[userMoves-1]) {
		if (strictMode === true) {
			console.log('Game Failed in Strict Mode');
			document.getElementsByClassName('simon_digital_banner')[0].innerHTML = 'START OVER';
			gameRunning = false;
			failureSound(1);
			setTimeout(simon_reset_button, 1500);
			return;
		} else if (strictMode === false) {
			console.log('Game Failed in Normal Mode');
			document.getElementsByClassName('simon_digital_banner')[0].innerHTML = 'TRY AGAIN';
			demoRunning = true;
			failureSound(1);
			setTimeout(computerDemo, 1500);
			return;
		}
	}
	if (userMoves === currentTurn) {
		if (userMoves === 20) {
			console.log('Victory - 20 moves correct');
			document.getElementsByClassName('simon_digital_banner')[0].innerHTML = 'YOU WIN!';
			gameRunning = false;
			setTimeout(computerDemo, 2000);
		} else if (userMoves < 20) {
			currentTurn++;
			userMoves = 0;
			demoRunning = true;
			setTimeout(computerDemo,1000);	
		}
	}
}

function buttonPress(button) {
	var color = button.getAttribute('data-button-color');
	if (gameRunning === true && demoRunning === false && userMoves < currentTurn) {
		userMoves++;
		console.log(color, 'on turn', userMoves, '/', currentTurn);
		switch (color) {
			case ('Blue'):
				bluePressed();
				break;
			case ('Red'):
				redPressed();
				break;
			case ('Yellow'):
				yellowPressed();
				break;
			case ('Green'):
				greenPressed();
				break;
		}
		checkUserMove(color);
	}
}
