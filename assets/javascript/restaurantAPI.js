/*
searchTerm should be set to be equal to the input value. To achieve this
a click handler will be set to trigger this function. 
*/

function fetchRestaurants(keyword) {
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
    // Declare an empty array to hold our desired data
    let desiredData = [];
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
      desiredData.push({
        name,
        cuisines,
        location,
        url,
        rating,
        resultsFound,
        averageCostForTwo
      });
    }

    return desiredData;
  });
}
