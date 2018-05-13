console.log("javascript loaded");

var searchQuery;
var results;

function searchNow() {
  console.log("in function");
  searchQuery = document.getElementById("searchField").value;
  console.log(searchQuery);
  console.log("running search");
  getData()
}

function getData() {
  if (sessionStorage.lastSearch == searchQuery) {
    console.log("same search... stopping call");
    return 0;
  } else {
    sessionStorage.lastSearch = searchQuery;
    document.getElementById("searchResultsArea").innerHTML = "";
  }

  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    data: {
      action: 'query',
      list: 'search',
      srsearch: searchQuery,
      format: 'json',
      formatversion: 2
    },
    dataType: 'jsonp',
    success: function (x) {
      results = x;
      console.log("x =",x.query.search);
      var i = 0;
      while (i < x.query.search.length) {
        console.log(i,x.query.search.lenght,x.query.search[i].title,x.query.search[i].snippet,results.query.search[i].pageid);
        document.getElementById("searchResultsArea").innerHTML += "<article><a target=\"_blank\" href=\"https://en.wikipedia.org/?curid="+results.query.search[i].pageid+"\"><h3>"+results.query.search[i].title+"</h3><p>"+results.query.search[i].snippet+"</p></a></article>";
        i++;
      }
    }
  })
}
