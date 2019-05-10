let searchTerm = 'indian';

const settings = {
  "async": true,
  "crossDomain": true,
  "url": `https://developers.zomato.com/api/v2.1/search?q=${searchTerm}&lat=44.977753&lon=-93.265015&radius=24140`,
  "method": "GET",
  "headers": {
    "user-key": "f4910eb62d5279e9608949f28307c69d"
  }
}

$.ajax(settings).done(response => {
  console.log(response);
});
