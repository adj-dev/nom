// Declare a global variable to hold our list of restaurants
let restaurantList;

// Store users location globally
let lat = localStorage.getItem('lat');
let lon = localStorage.getItem('lon');

console.log(lat, lon);
// Settings for ajax request
const settings = {
  "async": true,
  "crossDomain": true,
  "url": undefined,
  "method": "GET",
  "headers": {
    "user-key": "f4910eb62d5279e9608949f28307c69d"
  }
}

function fetchRestaurants(keyword) {
  // Set restaurants to an empty array
  restaurantList = [];

  // Get user location if we haven't already
  // This allows us to eliminate the amount of time
  // it takes for us to get the users coords if we already
  // have them stored in our global variable.
  if (!lat && !lon) {
    navigator.geolocation.getCurrentPosition(pos => {
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;

      // save position in local storage
      localStorage.setItem('lat', lat);
      localStorage.setItem('lon', lon);

      settings.url = `https://developers.zomato.com/api/v2.1/search?q=${keyword}&lat=${lat}&lon=${lon}&radius=24000&sort=real_distance`;
      // Make the api call AFTER getting user coords
      makeCall();
    }, error => {
      console.log(error);
    });
  } else if (keyword === '') {
    renderNoResults();
  } else {
    settings.url = `https://developers.zomato.com/api/v2.1/search?q=${keyword}&lat=${lat}&lon=${lon}&radius=24000&sort=real_distance`;
    makeCall();
  }

  // Render for empty string request
  function renderNoResults() {
    $('#results').empty();
    let message = $('<h4 id="no-results">');
    message.text("Please enter a food type into the search bar");
    $('#results').append(message);
  }

  // Make ajax request and handle response
  function makeCall() {
    $.ajax(settings).done(response => {
      // Grab restaurants object from response
      let { restaurants } = response;
      // Grab the results_found property from response
      let resultsFound = response.results_found;
      // Iterate through each item (restaurant) in the response
      for (let item of restaurants) {
        let { restaurant } = item;
        let name = restaurant.name;
        let cuisines = restaurant.cuisines;
        let location = {
          locality: restaurant.location.locality,
          address: restaurant.location.address
        };
        let url = restaurant.url;
        let rating = {
          aggregate_rating: restaurant.user_rating.aggregate_rating,
          votes: restaurant.user_rating.votes
        };
        let averageCostForTwo = restaurant.average_cost_for_two;
        // Add each hand-picked iteration to the desiredData array
        restaurantList.push({
          name,
          cuisines,
          location,
          url,
          rating,
          resultsFound,
          averageCostForTwo
        });
      }

      renderRestaurants(restaurantList);
    });
  }
};

// Takes the results (restaurant list) as an arg and renders them to the DOM
function renderRestaurants(results) {
  // Clear the current results if user makes another search
  $('#results').empty();
  for (let i = 0; i < results.length; i++) {
    let place = results[i];
    // Create wrapper divs with Materialize classes for a card
    let col = $('<div class="col m12 l6">');
    let card = $('<div class="card">');
    // Set up card-image div
    let imgDiv = $('<div class="card-image">');
    let img = $('<img src="assets/images/nom.jpg">');
    imgDiv.append(img);
    // Set up card-content div
    let contentDiv = $('<div class="card-content">');
    let title = $('<span class="card-title">');
    let rating = $('<p>').text(`Rating: ${place.rating.aggregate_rating} / 5`);
    let votes = $('<p>').text(`Votes: ${place.rating.votes}`);
    let locale = $('<p>').text(`Where: ${place.location.locality}`);
    let cost = $('<p>').text(`Average cost for two: $${place.averageCostForTwo}`);
    title.text(place.name);
    contentDiv.append(title, rating, votes, locale, cost);
    // Set up card-action div
    let actionDiv = $('<div class="card-action">');
    let a = $(`<a href="${place.url}" target="_blank">`);
    a.text('More...');
    actionDiv.append(a);
    // Join it all together
    card.append(imgDiv).append(contentDiv).append(actionDiv);
    col.append(card);
    // Toss it into the DOM
    $('#results').append(col);
  }
}

// Set a localStorage key equal to the search term
$(document).on('click', '#getRestaurants', () => {
  let searchTerm = $('#food-input').val();

  // If the search input is empty, simply point to the pre-existing value for "search" key
  if (searchTerm === '') {
    searchTerm = localStorage.getItem('search');
  }
  localStorage.setItem('search', searchTerm);
});