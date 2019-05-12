//code goes herre to search recipes from SPoonacular
let searchTerm = 'indian';

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=10&tags=italian",
    "method": "GET",
    "headers": {
      "X-RapidAPI-Key": "d8801f3ce8msha12100d587bc143p151da1jsn3c1a652ff0a6",
      "User-Agent": "PostmanRuntime/7.11.0",
      "Accept": "*/*",
      "Cache-Control": "no-cache",
      "Postman-Token": "0155e68f-22b2-49f3-aad2-395f5eebeed9,da7c6390-d5c4-4487-a81f-cc8dd7ec8e37",
      "Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "accept-encoding": "gzip, deflate",
      "Connection": "keep-alive",
      "cache-control": "no-cache"
    }
  }
  
  $.ajax(settings).done(response => {
    // Make ajax request and handle response
    console.log(response.recipes);
    var recipes = response.recipes;
    // loop through each recipe
    //for (var i = 0; i < recipes.length; i++) {
    for (var r = 0; r < 1; r++) {        
        //iterate through each recipe 
        var recipe = recipes[r];
        //build the title 
        var title = $("<h3>");  
        title.text(recipe.title);
        //prep the div that will hold all the information
        var recipeMainDiv = $("<div>");  
        recipeMainDiv.addClass("col-md-4");
        //get one p to add as needed
        var p = $("<p>)");
        //prep the image
        var src = recipe.image;
        var img =$("<img>");
        img.addClass("imgRecipe");
        img.attr("src", src);   
        //combine everything to add it to recipe div
        recipeMainDiv.append(p);
        recipeMainDiv.append(img);   
        recipeMainDiv.append(p);
        recipeMainDiv.append(title);
        $("#recipe").append(recipeMainDiv);
        /*for future needs confirm the instructions and ingredients etc work */
        var cuisDiv = $("<div>");  
        cuisDiv.append(p);
        var cuisineList = recipe.cuisines;
        console.log(cuisineList);
        var cuisines = "";
        for (var c=0; c < cuisineList.length; c++)
        {
            if (cuisines == "")
            {
                cuisines = cuisineList[c];
            }
            else
            {
                cuisines = cuisines + " ," + cuisineList[c];
            }            
        }        
        var cuisinesP = $("<h4>");
        cuisinesP.text(cuisines);  
        console.log(cuisines);
        cuisDiv.append(cuisinesP);
        $("#recipe").append(cuisDiv);

        //organize and display ingredients
        var ingredDiv = $("<div>");  
        ingredDiv.append(p);        
        var ingredients = "";
        var ingredTitle = $("<h3>");
        ingredTitle.text("Ingredients:");
        ingredDiv.append(ingredTitle);
        ingredDiv.append(p);
        var ingredientsList = recipe.extendedIngredients;
        for (var i=0; i < ingredientsList.length; i++)
        {
            var ingredients = $("<ul>");
            ingredients.text(ingredientsList[i].name);   
            ingredDiv.append(ingredients);        
        }        
        $("#recipe").append(ingredDiv);

        //organize and display recipe
        var recipeDiv = $("<div>");
        recipeDiv.append(p);
        var instructionsTitle = $("<h3>");
        instructionsTitle.text("Instructions:");
        recipeDiv.append(instructionsTitle);
        recipeDiv.append(p);
        var instructionsList = recipe.analyzedInstructions[0].steps;
        console.log(instructionsList);
        var instructionsP =  $("<p>)");
        for (var i=0; i < instructionsList.length; i++)
        {
            var instructions = $("<ul>");
            instructions.text(instructionsList[i].step);    
            instructionsP.append(instructions);              
        } 
        recipeDiv.append(instructionsP);
        $("#recipe").append(recipeDiv);
    }
  });

