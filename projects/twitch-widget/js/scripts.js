console.log("Javascript and Globals Loaded.");

const streamsFollowed = [
	'ctl17',
	'protech',
	'handmade_hero'
];

const channelURL = 'https://api.twitch.tv/kraken/channels/';
const streamURL = 'https://api.twitch.tv/kraken/streams/';

function renderChannelHTML(streamer) {
	console.log('Rendering HTML for', streamer);
	document.getElementById(streamer).innerHTML = '<a href="https://www.twitch.tv/'+sessionStorage.getItem(streamer+"_display_name")+'" target="_blank"><article><img class="logo" src="'+sessionStorage.getItem(streamer+"_logo")+'"><h3 class="displayName">'+sessionStorage.getItem(streamer+"_display_name")+'</h3><h4 class="online"></h4><div class="streamersData"><p>Playing - <span class="game">'+sessionStorage.getItem(streamer+"_game")+'</span></p><p><span class="status">'+sessionStorage.getItem(streamer+"_status")+'</span></p></div></article></a>';
}

//var select = document.querySelector('.select');
//var inner = select.querySelectorAll('.outer .inner');
function renderOnlineHTML(streamer) {
	console.log('Rendering online status HTML for', streamer);
	document.getElementById(streamer).querySelectorAll(".online")[0].innerHTML = '- ' + sessionStorage.getItem(streamer+"_online");
}

// Twitch.tv API Call Functions
function status(response) {
  console.log("Checking Status.");
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  
  return response.json()
}

function callTwitchAPIChannel(url, streamer) {
	console.log("API Called w/", streamer, "to", url);
	var url = url + streamer;
	fetch(url, {
    method: 'GET',
    headers: {
			'Client-ID': 'qb5z2kuc0fyff0a8hekb36tf7y2uui'
		}	
  })
	  .then(status)
	  .then(json)
	  .then(function(data) {
	    console.log('Request succeeded with JSON response', data, 'for', streamer);
	    sessionStorage.setItem(streamer+"_display_name", data.display_name);
	  	sessionStorage.setItem(streamer+"_logo", data.logo);
	  	sessionStorage.setItem(streamer+"_status", data.status);
	  	sessionStorage.setItem(streamer+"_game", data.game);
	  	sessionStorage.setItem(streamer+"_mature", data.mature);
	  	renderChannelHTML(streamer)
	  	callTwitchAPIOnline(streamURL,streamer)
	  }).catch(function(error) {
	    console.log('Request failed', error, 'for', streamer);
  });
}

function callTwitchAPIOnline(url, streamer) {
	sessionStorage.lastCallTime = Date.now() / 1000 | 0;
	console.log("API Called w/", streamer, "to", url, "at", sessionStorage.lastCallTime);
	var url = url + streamer;
	fetch(url, {
    method: 'GET',
    headers: {
			'Client-ID': 'qb5z2kuc0fyff0a8hekb36tf7y2uui'
		}	
  })
	  .then(status)
	  .then(json)
	  .then(function(data) {
	  	console.log('Request succeeded with JSON response', data, 'for', streamer);
	  	if (data.stream == null) {
	  		sessionStorage.setItem(streamer+"_online", "Offline");
	  	} else {
	  		sessionStorage.setItem(streamer+"_online", "Online");
	  	}
	  	renderOnlineHTML(streamer)
	  }).catch(function(error) {
	    console.log('Request failed', error, 'for', streamer);
  	});
}

function refreshOnlineStatus() {
	if (sessionStorage.lastCallTime == undefined || (Date.now()/1000|0)-(sessionStorage.lastCallTime) > 30) {
		//Re-call api for online status
		document.getElementById('refreshStatus').innerHTML = "Refreshed! 30 seconds until you can refresh again";
		for (var i=0; i < streamsFollowed.length; i++) {
			callTwitchAPIOnline(streamURL,streamsFollowed[i])			
		}
	} else {
		document.getElementById('refreshStatus').innerHTML = "Failed. Try again in " + ((Date.now()/1000|0)-(sessionStorage.lastCallTime)) + " seconds.";
		console.log("Refresh Failed -- Try again in a bit.", (Date.now()/1000|0)-(sessionStorage.lastCallTime));
	}
}

function renderPageOnLoad() {
	if (sessionStorage.pageAlreadyLoaded == undefined) {
		sessionStorage.pageAlreadyLoaded = "Page Loaded";
		for (var i=0; i < streamsFollowed.length; i++) {
			callTwitchAPIChannel(channelURL,streamsFollowed[i])		
		}
	} else {
		console.log("Page Already Loaded");
		for (var i=0; i < streamsFollowed.length; i++) {
			renderChannelHTML(streamsFollowed[i])
			renderOnlineHTML(streamsFollowed[i])
		}
	}
}

renderPageOnLoad()
