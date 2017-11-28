$(document).ready(function() {

var topics = ['cheeseburger', 'pasta', 'pancakes', 'cupcakes', 'coffee'];

function getGiphInfo() {

	var topic = $(this).attr('data-food');
	var queryURL = 'https://www.api.giphy.com/v1/gifs/search?q=' + topic +'&api+key=puh3MW9zQIIE8RC1EiQuEBjjEg5JFVU3&limit=10';



	$.ajax({
	url: queryURL,
	method: 'GET'
	}).done(function(response) {

		var foodDiv = $('<div class="food">');
		console.log(response);
	})

}

function createButtons() {
    $("#food-buttons").empty();

    for (var i = 0; i < topics.length; i++) {

      var button = $('<button>');
      button.addClass('food');
      button.attr('data-food', topics[i]);
      button.text(topics[i]);
      $("#food-buttons").append(button);
    }
}

$('#add-food').click(function(event) {
	var foodTopic = $('#food-input').val().trim();
	topics.push(foodTopic);
	createButtons();
});

$(document).click('.food', getGiphInfo);

createButtons();

});