$(document).ready(function() {

// List of my favoriate things
var topics = ['Ocean', 'Spaghetti', 'Pancakes', 'Cupcakes', 'Coffee', 'Puppies', 'Yoga'];

// Create dynamic buttons for each topic and diplay them in HTML
function createButtons() {
	$("#fave-buttons").empty();

	for (var j = 0; j < topics.length; j++) {

	  var button = $('<button>');
	  button.addClass('faves');
	  button.attr('data-fave', topics[j]);
	  button.text(topics[j]);
	  $("#fave-buttons").append(button);
	}

	// When a button is clicked make AJAX call using search query from topics array
	$('button').on('click', function() {
		var currentTopic = $(this).attr('data-fave');
		var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
	        currentTopic + '&api_key=dc6zaTOxFJmzC&limit=10';

		$.ajax({
		url: queryURL,
		method: 'GET'
		}).done(function(response) {

	// Take the reponse and append to the HTML
			console.log(response);
			var results = response.data;

			for (var i = 0; i < results.length; i++) {
				var gifDiv = $('<div class="fave-div">');
				gifDiv.empty();
				var rating = results[i].rating;
				var r = $('<div>').text('Rating: ' + rating);

				var image = $('<img>');
				image.attr('src', results[i].images.fixed_height_still.url);
				image.attr('class', 'gif');
				image.attr('data-state', 'still')
				image.attr('data-still', results[i].images.fixed_height_still.url)
				image.attr('data-animate', results[i].images.fixed_height.url)


				gifDiv.prepend(r);
				gifDiv.prepend(image);
				$('#faves').prepend(gifDiv);
				console.log(currentTopic);
			}
		})
	});
};

createButtons();

// Add your own Favorites to my list
// When 'Submit' button is clicked, the user input is captured
// and added to the topics array, a new button is created
	$('#add-fave').on('click', function(event) {
		event.preventDefault();
		var newTopic = $('#fave-input').val().trim();
		topics.push(newTopic);
		createButtons();
	});

// Animate GIFs when they are clicked
	// Select any element with the class name 'gif'
	// and run function when element is clicked
	$('.gif').on('click', function() {
		
		var img = $(this);
		var state = img.attr('data-state');

		// Checks to see if data-state attribute is set to 'still'
		// If 'still' = true, then on-click the image url is changed to the URL set in data-animate
		// The data-state attribute is changed to 'animate'
		if (state === 'still') {
			img.attr('src', img.attr('data-animate'));
			img.attr('data-state', 'animate');
		}

		// If the data-state is anything other than still
		// On-click the image url is changed to the URL save in data-still
		// The data-state is set to still
		else {
			img.attr('src', img.attr('data-still'));
			img.attr('data-state', 'still');
		}

	});
});
















