$(document).ready(function() {
  // Pressing enter from text box is now the same has hitting the submit button
  $('#search').keydown(function(event) {
        if (event.keyCode == 13) {
            $("#submit").click()
            return false;
         }
    });
});
// Wikipedia API
$("#submit").click(function() {
  // error handling timeout function
  var wikiRequestTimeout = setTimeout(function() {
    $("#wikipedia-links").text("Failed to get wikipedia resources");
  }, 8000);
  // Remove previous entries
  $("#wikipedia-links").html('');
  
  var search = $("#search").val();
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&meta=&continue=&limit=20&search=" + search;
  $.ajax({
    url: url,
    dataType: "jsonp",
    success: function(data) {
      // Header and search related elements are no longer centered vertically
      $(".pageCenter").removeClass("pageCenter").addClass("horizontalCenter");
      
      var articleList = data[1];
      var articleSnippit = data[2];
      var articleURL = data[3];
      
      for (i = 0; i < articleList.length; i ++) {
        var articleListStr = articleList[i];
        var articleSnippitStr = articleSnippit[i];
        var articleURLStr = articleURL[i];
        
        $("#wikipedia-links").append('<a target="_blank" href="' + articleURLStr + '"><button class="btn btn-primary button-inline articleButton">' + '<h2>' + articleListStr + '</h2>' + '<p>' + articleSnippitStr + '</p>' + "</button></a>");
        };
      // clear the error handling timeout
      clearTimeout(wikiRequestTimeout);
    },
  });
});