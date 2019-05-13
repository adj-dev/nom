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

// Takes the results as an arg and renders them to the DOM
function renderRestaurants(results) {
  for (let i = 0; i < results.length; i++) {
    let wrapper = $('<div class="wrapper">');
    let name = $('<h3>');

    name.text(results[i].name);
    let locale = $('<p>').text(results[i].location.locality);
    let address = $('<p>').text(`Address: ${results[i].location.address}`);
    let averageCostForTwo = $('<p>').text(`Average cost for two: $${results[i].averageCostForTwo}`);
    let rating = $('<p>').text(`Rating: ${results[i].rating.aggregate_rating}`);
    let votes = $('<p>').text(`Votes: ${results[i].rating.votes}`);

    wrapper.append(name).append(locale).append(averageCostForTwo).append(address).append(rating).append(votes);
    $('.container').append(wrapper);
  }
}

// Make a mock call to the API
fetchRestaurants('pizza');