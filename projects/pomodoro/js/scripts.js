// Default Timer Settings
var timerMinutes = 25;
var timerSeconds = 0;

// Default Round Settings
var currentRounds = 1;
var currentMaxRounds = 1;

// Default App States
var startOrPause = 'Start';
var workOrBreak = 'Work';

// Default Setting Adjustments
var settingWorkMinutes = 25;
var settingBreakMinutes = 5;
var settingRounds = 1;

// Timer Running?
var timerRunning = false;

function updateTimerScreen() {
	document.getElementsByClassName('timer-round-number')[0].innerHTML = currentRounds + ' / ' + currentMaxRounds;
	document.getElementsByClassName('timer-work-or-break')[0].innerHTML = workOrBreak;

	if (timerMinutes >= 10) {
		document.getElementsByClassName('timer-screen')[0].innerHTML = timerMinutes + ':';
	} else if (timerMinutes < 10) {
		document.getElementsByClassName('timer-screen')[0].innerHTML = '0' + timerMinutes + ':';
	}

	if (timerSeconds >= 10) {
		document.getElementsByClassName('timer-screen')[0].innerHTML = document.getElementsByClassName('timer-screen')[0].innerHTML + timerSeconds;
	} else if (timerSeconds < 10) {
		document.getElementsByClassName('timer-screen')[0].innerHTML = document.getElementsByClassName('timer-screen')[0].innerHTML + '0' + timerSeconds;
	}
}

function backgroundFlash(counter) {
	console.log(counter);
	if (counter > 0) {
		counter--;
		document.getElementsByClassName('clock-body')[0].style.backgroundColor = 'red';
		setTimeout(function() {
	  	setTimeout(function() {
  	 		backgroundFlash(counter);
  		},250)
  		document.getElementsByClassName('clock-body')[0].style.backgroundColor = 'black';
		},250);
	}
}

function alarmSound() {
	var alarmSound = new Audio("sounds/alarm.wav");
	alarmSound.play();
}

function updater() {
	timerRunning = true;
	if (startOrPause === 'Start') {
		timerRunning = false;
		console.log('Timer paused.');
		return;
	}

	if (timerMinutes === 0 && timerSeconds === 0) {
		alarmSound();
		backgroundFlash(11);
		if (workOrBreak === 'Work') {
			workOrBreak = 'Break';
			timerMinutes = settingBreakMinutes;
			timerSeconds = 0;
		} else if ( workOrBreak === 'Break' && currentRounds < currentMaxRounds) {
			workOrBreak = 'Work';
			timerMinutes = settingWorkMinutes;
			timerSeconds = 0;
			currentRounds++;
		} else {
			updateTimerScreen();
			alarmSound();
			backgroundFlash(11);
			console.log('Timer Done!');
		}
	} else if (timerMinutes !== 0 && timerSeconds === 0) {
		timerMinutes--;
		timerSeconds = 59;
	} else if (timerSeconds !== 0) {
		timerSeconds--;
	} else {
		console.log('Time adjustment logic error.');
	}

	updateTimerScreen();
	console.log('Timer continues.', timerMinutes + ':' + timerSeconds);
	setTimeout(updater, 1000);
}

function resetButton() {
	timerRunning = false;
	timerMinutes = settingWorkMinutes;
	timerSeconds = 0;

	currentRounds = 1;
	currentMaxRounds = settingRounds;

	startOrPause = 'Start';
	workOrBreak = 'Work';
	document.getElementsByClassName('timer-button-start-pause')[0].innerHTML = startOrPause;

	updateTimerScreen();
}

function startOrPauseButton() {
	if (startOrPause === 'Start' && timerRunning === false) {
		startOrPause = 'Pause';
		updateTimerScreen();
		updater();
	} else if (startOrPause === 'Pause') {
		startOrPause = 'Start';
	}
	document.getElementsByClassName('timer-button-start-pause')[0].innerHTML = startOrPause;
}

function minusWorkTime() {
	if (settingWorkMinutes == 1) {
		console.log("settingWorkMinutes === 1 // Can't go lower.");
	} else if (settingWorkMinutes < 11) {
		settingWorkMinutes -= 1;
		document.getElementsByClassName('work-time-setting-box')[0].innerHTML = '0' + settingWorkMinutes + ':00';
	} else {
		settingWorkMinutes -= 1;
	document.getElementsByClassName('work-time-setting-box')[0].innerHTML = settingWorkMinutes + ':00';
	}
	resetButton();
}

function plusWorkTime() {
	settingWorkMinutes += 1;
	if (settingWorkMinutes < 10) {
		document.getElementsByClassName('work-time-setting-box')[0].innerHTML = '0' + settingWorkMinutes + ':00';
	} else {
	document.getElementsByClassName('work-time-setting-box')[0].innerHTML = settingWorkMinutes + ':00';
	}
	resetButton();
}

function minusBreakTime() {
	if (settingBreakMinutes == 1) {
		console.log("settingBreakMinutes === 1 // Can't go lower.");
	} else if (settingBreakMinutes < 11) {
		settingBreakMinutes -= 1;
		document.getElementsByClassName('break-time-setting-box')[0].innerHTML = '0' + settingBreakMinutes + ':00';
	} else {
		settingBreakMinutes -= 1;
		document.getElementsByClassName('break-time-setting-box')[0].innerHTML = settingBreakMinutes + ':00';
	}
	resetButton();
}

function plusBreakTime() {
	settingBreakMinutes += 1;
	if (settingBreakMinutes < 10) {
		document.getElementsByClassName('break-time-setting-box')[0].innerHTML = '0' + settingBreakMinutes + ':00';
	} else {
	document.getElementsByClassName('break-time-setting-box')[0].innerHTML = settingBreakMinutes + ':00';
	}
	resetButton();
}

function minusRound() {
	if (settingRounds == 1) {
		console.log("settingBreakMinutes === 1 // Can't go lower.");
	} else {
		settingRounds -= 1;
		currentMaxRounds = settingRounds;
		document.getElementsByClassName('rounds-setting-box')[0].innerHTML = settingRounds;
	}
	resetButton();
}

function plusRound() {
	settingRounds += 1;
	currentMaxRounds = settingRounds;
	document.getElementsByClassName('rounds-setting-box')[0].innerHTML = settingRounds;
	resetButton();
}