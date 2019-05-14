// Declare a global variable to hold our list of restaurants
let restaurantList;

function fetchRestaurants(keyword) {
  // Set restaurants to an empty array
  restaurantList = [];

  // Settings for ajax request
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://developers.zomato.com/api/v2.1/search?q=${keyword}&lat=44.977753&lon=-93.265015&radius=24140`,
    "method": "GET",
    "headers": {
      "user-key": "f4910eb62d5279e9608949f28307c69d"
    }
  }

  // Make ajax request and handle response
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
    // Render the results to the DOM
    renderRestaurants(restaurantList);
  });
}

// Takes the results (restaurant list) as an arg and renders them to the DOM
function renderRestaurants(results) {
  for (let i = 0; i < results.length; i++) {
    let place = results[i];
    // Create wrapper divs with Materialize classes for a card
    let col = $('<div class="col m12 l6">');
    let card = $('<div class="card">');
    // Set up card-image div
    let imgDiv = $('<div class="card-image">');
    let img = $('<img src="assets/images/nom.jpg">');
    imgDiv.append(img);
    // Set up card-title div
    let contentDiv = $('<div class="card-content">');
    let title = $('<span class="card-title">');
    title.text(place.name);
    contentDiv.append(title);
    // Set up card-action div
    let actionDiv = $('<div class="card-action">');
    let a = $('<a href="#">');
    a.text('More...');
    actionDiv.append(a);
    // Join it all together
    card.append(imgDiv).append(contentDiv).append(actionDiv);
    col.append(card);
    // Toss it into the DOM
    $('#results').append(col);

    // let locale = $('<p>').text(place.location.locality);
    // let address = $('<p>').text(`Address: ${place.location.address}`);
    // let averageCostForTwo = $('<p>').text(`Average cost for two: $${place.averageCostForTwo}`);
    // let rating = $('<p>').text(`Rating: ${place.rating.aggregate_rating}`);
    // let votes = $('<p>').text(`Votes: ${place.rating.votes}`);

    // col.append(name).append(locale).append(averageCostForTwo).append(address).append(rating).append(votes);
    // $('.container').append(col);
  }
}

// Make a mock call to the API
fetchRestaurants('pizza');