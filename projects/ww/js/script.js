if (sessionStorage._WW_cityName && sessionStorage._WW_weatherDescription && sessionStorage._WW_temperatureF && sessionStorage._WW_temperatureC) {
	console.log("Running setWeatherOnPage()");
	setWeatherOnPage();
} else {
	console.log("Running getWeatherJSON()");
	getWeatherJSON();
}

//Get Weather Main Function
function getWeatherJSON() {
    //If Geolocation is enabled run setPostion()
    if (navigator.geolocation) {
    	console.log("Running setPosition()");
        navigator.geolocation.getCurrentPosition(setPosition);
    } else {
    	console.log("Geolocations Disabled");
        temp.innerHTML = "Geolocation is not supported by this browser.";
    }
}

//Set xPos and yPos to Lat and Lon for API Call by location
function setPosition(position) {
    sessionStorage._WW_xPos = position.coords.latitude;
    sessionStorage._WW_yPos = position.coords.longitude; 
    sessionStorage._WW_apiCall = "http://api.openweathermap.org/data/2.5/weather?lat="+sessionStorage._WW_xPos+"&lon="+sessionStorage._WW_yPos+"&APPID=f2356112c969da84026d0b449c16fa88";
    console.log(sessionStorage._WW_xPos,sessionStorage._WW_yPos,sessionStorage._WW_apiCall);
    console.log("Running callAPI()");
    callAPI();
}

//Call the API, get JSON, set City, Weather Description and Temperature variables with sessionStorage
function callAPI() {
	//Get API Response in JSON
	var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET",sessionStorage._WW_apiCall,false);
    Httpreq.send(null);
	var jsonObj = JSON.parse(Httpreq.responseText);
	
	//Get City, Temp, and Weather Description out of JSON and set with sessionStorage
	sessionStorage._WW_cityName = jsonObj["name"];
	sessionStorage._WW_weatherDescription = jsonObj["weather"][0]["main"];
	sessionStorage._WW_temperatureF = Math.round((9/5*((jsonObj["main"]["temp"])-273.15))+32);
	sessionStorage._WW_temperatureC = Math.round(jsonObj["main"]["temp"]-273.15);
	console.log(sessionStorage._WW_cityName,sessionStorage._WW_weatherDescription,sessionStorage._WW_temperatureF, sessionStorage._WW_temperatureF);
	console.log("Running setWeatherOnPage()");
	setWeatherOnPage();
}

//Sets the HTML to the weather values recieved and changes the questionmark to a weather icon
function setWeatherOnPage() {
	//Set City, Temp, and Weather Icon on Page
	document.getElementById("updateCityName").innerHTML = sessionStorage._WW_cityName;
	
	document.getElementById("updatedTemperature").innerHTML = sessionStorage._WW_temperatureF + ' <i class="wi wi-fahrenheit"></i>';
	
	switch (sessionStorage._WW_weatherDescription) {
		case "Clouds":
			document.getElementById("weatherIcon").classList.add("wi");
			document.getElementById("weatherIcon").classList.add("wi-day-cloudy");
			document.getElementById("weatherIcon").style.display = "inline";
			break;
		case "Clear":
			document.getElementById("weatherIcon").classList.add("wi");
			document.getElementById("weatherIcon").classList.add("wi-day-sunny");
			document.getElementById("weatherIcon").style.display = "inline";
			break;
		case "Snow":
			document.getElementById("weatherIcon").classList.add("wi");
			document.getElementById("weatherIcon").classList.add("wi-day-snow");
			document.getElementById("weatherIcon").style.display = "inline";
			break;
		case "Rain":
		case "Drizzle":
			document.getElementById("weatherIcon").classList.add("wi");
			document.getElementById("weatherIcon").classList.add("wi-day-rain");
			document.getElementById("weatherIcon").style.display = "inline";
			break;
		case "Thunderstorm":
			document.getElementById("weatherIcon").classList.add("wi");
			document.getElementById("weatherIcon").classList.add("wi-day-thunderstorm");
			document.getElementById("weatherIcon").style.display = "inline";
			break;
		case "Haze":
		case "Atmosphere":
			document.getElementById("weatherIcon").classList.add("wi");
			document.getElementById("weatherIcon").classList.add("wi-cloud-up");
			document.getElementById("weatherIcon").style.display = "inline";
			break;
		default:
			console.log("No weather description found.")
	}
}


// onclick events to change weather format from C to F
function setF() {
	if (sessionStorage._WW_temperatureF) {
		document.getElementById("updatedTemperature").innerHTML = sessionStorage._WW_temperatureF + ' <i class="wi wi-fahrenheit"></i>';
		document.getElementById("f-button").classList.add("btn-primary");
		document.getElementById("c-button").classList.remove("btn-primary");
	}
}

// onclick events to change weather format from F to C
function setC() {
	if (sessionStorage._WW_temperatureC)  {
		document.getElementById("updatedTemperature").innerHTML = sessionStorage._WW_temperatureC + ' <i class="wi wi-celsius"></i>';
		document.getElementById("c-button").classList.add("btn-primary");
		document.getElementById("f-button").classList.remove("btn-primary");
	}
}