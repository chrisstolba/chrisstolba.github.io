var XMLHttpRequestObject = false; 
if (window.XMLHttpRequest) {
	XMLHttpRequestObject = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
	XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
}

function getData(dataSource, divID) { 
	if(XMLHttpRequestObject) {
	var obj = document.getElementById(divID); 
	XMLHttpRequestObject.open("GET", dataSource); 
	XMLHttpRequestObject.onreadystatechange = function() { 
		if (XMLHttpRequestObject.readyState == 4 && 
			XMLHttpRequestObject.status == 200) { 
			var text = XMLHttpRequestObject.responseText;
			var splitTextByLine = text.split("\n");
			var randomQuoteNumber = Math.floor(Math.random()*splitTextByLine.length);
			var newRandomQuote = splitTextByLine[randomQuoteNumber];
			obj.innerHTML = newRandomQuote;
		} 
	} 
	XMLHttpRequestObject.send(null); 
	}
}

//<a target="_blank" href="https://twitter.com/intent/tweet?text=Hello%20world">
function postToTwitter() {
	var postThisQuote = document.getElementById('quoteContent').innerHTML;
	var formatedQuote = formatThisQuote(postThisQuote);
	console.log(formatedQuote);
	var postToTwitterLink = "https://twitter.com/intent/tweet?text=" + formatedQuote;
	console.log(postToTwitterLink);
	window.open(postToTwitterLink, "_blank");
}

function formatThisQuote(quote) {
	var newQuoteArr = [];
	for (var i=0; i < quote.length; i++) {
		switch(quote[i]){
			case '\n':
        		//console.log("newline");
        		newQuoteArr.push('%0D');
        		break;
    		case ' ':
        		//console.log("space");
        		newQuoteArr.push('%20');
        		break;
        	case '"':
        		//console.log("double quote");
        		newQuoteArr.push('%22');
        		break;
        	case '%':
        		//console.log('%');
        		newQuoteArr.push('%25');
        		break;
        	case '-':
        		//console.log("hyphen");
        		newQuoteArr.push('%2D');
        		break;
        	case '.':
        		//console.log("period");
        		newQuoteArr.push('%2E');
        		break;
        	case '<':
        		//console.log("<");
        		newQuoteArr.push('%3C');
        		break;
        	case '>':
        		//console.log(">");
        		newQuoteArr.push('%3E');
        		break;
        	case '\\':
        		//console.log("backslash");
        		newQuoteArr.push('%5C');
        		break;
        	case '^':
        		//console.log("carrot");
        		newQuoteArr.push('%5E');
        		break;
        	case '_':
        		//console.log("underscore");
        		newQuoteArr.push('%5F');
        		break;
        	case '`':
        		//console.log("back apostraphe");
        		newQuoteArr.push('%60');
        		break;
        	case '{':
        		//console.log('left bracket');
        		newQuoteArr.push('%7B');
        		break;
        	case '}':
        		//console.log("right bracket");
        		newQuoteArr.push('%7D');
        		break;
        	case '|':
        		//console.log("bar");
        		newQuoteArr.push('%7C');
        		break;
        	case '~':
        		//console.log("tilda");
        		newQuoteArr.push('%7E');
        		break;
    		default:
        		newQuoteArr.push(quote[i]);
		}
		//console.log(newQuoteArr);
	}
	return newQuoteArr.join('');
}