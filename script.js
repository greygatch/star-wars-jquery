$(document).ready(init);

// this will run when the page loads.
function init(){

  'use strict';

  $('.button').on('click', getSWData);
}


function getSWData(){
  var buttonText = this.innerHTML.toLowerCase();
  var apiUrl = 'http://swapi.co/api/' + buttonText;


  if($('#display').text()){
    $('#display').empty();
  }

  $.get(apiUrl, function(response){
    var requestCount = Math.ceil(response.count / 10);

    response.results.forEach(function(e){
      $('#display').append((e.name || e.title) + '<br/>');
    });

    if(requestCount > 1){
      for(var i = 2; i <= requestCount; i++){
        $.get(apiUrl + '/?page=' + i, function(response){
          response.results.forEach(function(e){
            $('#display').append(e.name + '<br/>');
          });
        });
      }
    }
  });
}
