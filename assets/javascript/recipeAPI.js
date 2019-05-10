//code goes herre to search recipes from SPoonacular
let searchTerm = 'indian';

const result = {
  "async": true,
  "crossDomain": true,
  "url": `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?query=burger&cuisine=american`,
  "method": "GET",
  "headers": {
    "X-RapidAPI-Key": "d8801f3ce8msha12100d587bc143p151da1jsn3c1a652ff0a6"
  }
}

$.ajax(settings).done(response => {
  console.log(response);
});
