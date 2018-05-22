// Default values onload and after "clear"
var answer = null;
var storedNumber = null;
var userInput = '0';
var userInputAdded = false;
var operator = '';

function pushNumberToScreen(element) {
	var pushThisDigit = element.getAttribute("data-number").toString();
	console.log("Digit pushed - ",pushThisDigit);
	if (userInput.length < 16) {
		if (userInput === '0') {
			if (pushThisDigit === '.') {
				userInput += pushThisDigit;
			} else {
				userInput = pushThisDigit;
			}
		} else if (pushThisDigit === '.' && userInput.indexOf('.') === -1) {
			userInput += pushThisDigit;
		} else if (pushThisDigit !== '.') {
			userInput += pushThisDigit;
		}
	} else {
		answer = "Error - too many digits!";
		userInput = "Error - too many digits!";
		operator = '';
		document.getElementById('answerDisplay').innerHTML = answer;
	}
	userInputAdded = true;
	document.getElementById('inputDisplay').innerHTML = operator + ' ' + userInput;
	console.log(userInput, userInputAdded);
}

function calculation(number1, number2, operation) {
	var newAnswer;
	switch (operation) {
		case ('/'):
			newAnswer = number1 / number2;
			break;
		case ('x'):
			newAnswer = number1 * number2;
			break;
		case ('-'):
			newAnswer = (Number(number1) - Number(number2)).toString();
			break;
		case ('+'):
			newAnswer = (Number(number1) + Number(number2)).toString();
			break;
	}
	if (userInputAdded) {
		storedNumber = userInput;
	}
	document.getElementById('answerDisplay').innerHTML = newAnswer;
	document.getElementById('inputDisplay').innerHTML = operator + ' ' + storedNumber;
	return newAnswer;
}

function equals() {
	if (answer === null && storedNumber === null) {
		storedNumber = userInput;
		userInput = '0';
		userInputAdded = false;
		document.getElementById('answerDisplay').innerHTML = storedNumber;
		document.getElementById('inputDisplay').innerHTML = operator + ' ' + '0';
	} else if (answer === null && storedNumber !== null && operator !== '') {
		answer = calculation(storedNumber, userInput, operator);
		storedNumber = userInput;
		userInput = '0';
		userInputAdded = false;
	} else if (answer !== null && userInputAdded === true) {
		answer = calculation(answer, userInput, operator);
		storedNumber = userInput;
		userInput = '0';
		userInputAdded = false;
	} else if (answer !== null && userInputAdded === false && storedNumber !== null) {
		answer = calculation(answer, storedNumber, operator);
		userInput = '0';
		userInputAdded = false;
	} else if (answer !== null && userInputAdded === false && storedNumber !== null) {
		console.log("got called");
		answer = calculation(answer, userInput, operator);
		userInput = '0';
		userInputAdded = false;
	}
}

function operationButtonHighLighter(button) {
	document.getElementById('divideButton').style.backgroundColor = "darkgray";
	document.getElementById('multiplyButton').style.backgroundColor = "darkgray";
	document.getElementById('subtractButton').style.backgroundColor = "darkgray";
	document.getElementById('addButton').style.backgroundColor = "darkgray";
	if (button !== 'default') {
		document.getElementById(button).style.backgroundColor = "gray";
	}
}

function divide() {
	console.log("divide() called with -", operator, userInputAdded);

	switch (operator) {
		
		case (''):
			console.log("First operator stored /");
			equals();
			operationButtonHighLighter('divideButton');
			operator = '/';
			document.getElementById('inputDisplay').innerHTML = operator + ' ' + userInput;
			break;
		
		case ('/'):
			if (userInputAdded) {
				console.log("divide() Called Again w/ New Input - Calling equals()");
				equals();
				operationButtonHighLighter('divideButton');
				break;
			} else {
				console.log("divide() Recalled - Waiting For New Input to Call equals()");
				break;
			}

		default:
			console.log("Last operator was '", operator ,"' Calling equals() then setting new operator to '/'");
			equals();
			operationButtonHighLighter('divideButton');
			operator = '/';
			storedNumber = null;
			document.getElementById('inputDisplay').innerHTML = operator + ' ' + userInput;
			break;
	}
}

function multiply() {
	console.log("multiply() called with -", operator, userInputAdded);

	switch (operator) {
		
		case (''):
			console.log("First operator stored x");
			equals();
			operationButtonHighLighter('multiplyButton');
			operator = 'x';
			document.getElementById('inputDisplay').innerHTML = operator + ' ' + userInput;
			break;
		
		case ('x'):
			if (userInputAdded) {
				console.log("multiply() Called Again w/ New Input - Calling equals()");
				equals();
				operationButtonHighLighter('multiplyButton');
				break;
			} else {
				console.log("multiply() Recalled - Waiting For New Input to Call equals()");
				break;
			}

		default:
			console.log("Last operator was '", operator ,"' Calling equals() then setting new operator to 'x'");
			equals();
			operationButtonHighLighter('multiplyButton');
			operator = 'x';
			storedNumber = null;
			document.getElementById('inputDisplay').innerHTML = operator + ' ' + userInput;
			break;
	}
}

function subtract() {
	console.log("subtract() called with -", operator, userInputAdded);

	switch (operator) {
		
		case (''):
			console.log("First operator stored -");
			equals();
			operationButtonHighLighter('subtractButton');
			operator = '-';
			document.getElementById('inputDisplay').innerHTML = operator + ' ' + userInput;
			break;
		
		case ('-'):
			if (userInputAdded) {
				console.log("subtract() Called Again w/ New Input - Calling equals()");
				equals();
				operationButtonHighLighter('subtractButton');
				break;
			} else {
				console.log("subtract() Recalled - Waiting For New Input to Call equals()");
				break;
			}

		default:
			console.log("Last operator was '", operator ,"' Calling equals() then setting new operator to '-'");
			equals();
			operationButtonHighLighter('subtractButton');
			operator = '-';
			storedNumber = null;
			document.getElementById('inputDisplay').innerHTML = operator + ' ' + userInput;
			break;
	}
}

function add() {
	console.log("add() called with -", operator, userInputAdded);

	switch (operator) {
		
		case (''):
			console.log("First operator stored +");
			equals();
			operationButtonHighLighter('addButton');
			operator = '+';
			document.getElementById('inputDisplay').innerHTML = operator + ' ' + userInput;
			break;
		
		case ('+'):
			if (userInputAdded) {
				console.log("add() Called Again w/ New Input - Calling equals()");
				equals();
				operationButtonHighLighter('addButton');
				break;
			} else {
				console.log("add() Recalled - Waiting For New Input to Call equals()");
				break;
			}

		default:
			console.log("Last operator was '", operator ,"' Calling equals() then setting new operator to '+'");
			equals();
			operationButtonHighLighter('addButton');
			operator = '+';
			storedNumber = null;
			document.getElementById('inputDisplay').innerHTML = operator + ' ' + userInput;
			break;
	}
}

function clearScreen() {
	console.log("clear() Called");
	answer = null;
	storedNumber = null;
	userInput = '0';
	userInputAdded = false;
	operator = '';
	document.getElementById('answerDisplay').innerHTML = '0';
	document.getElementById('inputDisplay').innerHTML = '0';
	operationButtonHighLighter('default');
}