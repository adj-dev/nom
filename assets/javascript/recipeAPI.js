//code goes herre to search recipes from SPoonacular
class nomRecipe {
    constructor(
        id,
        title,
        cuisinesList,
        ingredientsList,
        instructionsList,
        imageSrc) 
        {
            this.id = id;
            this.title = title;
            this.cuisines = cuisinesList;
            this.ingredientsList = ingredientsList;
            this.instructionsList = instructionsList;
            this.imageSrc = imageSrc;
        }
    };

    let nomRecipes = [];

    let noOfResults = 0;
    //set var searchTerm until its hooked to real term
    var searchTerm =  "italian";
    getRecipesInfoByCuisines(searchTerm);
    
    function displayRecipesInfoByCuisines()

    {                
        //remove the fake contents before filling
        $(".s4").remove();
        // loop through each recipe collection and display
        for (var i = 0; i < nomRecipes.length; i++) {
            //iterate through each recipe 
            var recipe = nomRecipes[i];
            //console.log(nomRecipes[i]);

            //prep the div that will hold all the information
            var recipeMainDiv = $("<div>");  
            recipeMainDiv.addClass("col s4")

            //second div for hoverable
            var hoverDiv = $("<div>");
            hoverDiv.addClass("card hoverable");

            //div for images
            var imageDiv = $("<div>");
            imageDiv.addClass("card-image");

            //prep the image
            var src = recipe.imageSrc;
            var img =$("<img>");
            img.addClass("imgRecipe");
            img.attr("id", recipe.id);
            img.attr("src", src);  
            //attch the image to imageDiv
            imageDiv.append(img);

            //build the titleDiv 
            var titleDiv = $("<div>");  
            titleDiv.addClass("card-content");

            //build the title
            var title = $("<a>");
            title.attr("href", "#");
            title.text(recipe.title);
            title.addClass("recipeTitle");
            title.attr("id", recipe.id);
            //attach to titleDiv
            titleDiv.append(title);

            //prep card action Div for going to restaurants route
            var restaurantDiv = $("<div>");
            restaurantDiv.addClass("card-action");
            //create a tag for take me to NOM
            var nom = $("<a>");
            nom.attr("href","#");
            nom.text("Take me to the NOM");
            nom.addClass("gotoRestaurant");
            nom.attr("cuisine", recipe.cuisines[0]);
            //attach to the card action Div
            restaurantDiv.append(nom)

            //combine everything to add it to recipe div             
            hoverDiv.append(imageDiv);
            hoverDiv.append(titleDiv);
            hoverDiv.append(restaurantDiv);  
            recipeMainDiv.append(hoverDiv);
            $("#recipe").append(recipeMainDiv);
        }
    }

    function getRecipesInfoByCuisines(searchTerm)
    {
        console.log("I am here in getRecipesInfoByCuisines");
        searchTerm = 'italian';
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=12&tags=" + searchTerm,
            "method": "GET",
            "headers": {
            "X-RapidAPI-Key": "d8801f3ce8msha12100d587bc143p151da1jsn3c1a652ff0a6",
            //"User-Agent": "PostmanRuntime/7.11.0",
            "Accept": "*/*",
            "Cache-Control": "no-cache",
            "Postman-Token": "0155e68f-22b2-49f3-aad2-395f5eebeed9,da7c6390-d5c4-4487-a81f-cc8dd7ec8e37",
            //"Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            //"accept-encoding": "gzip, deflate",
            //"Connection": "keep-alive",
            "cache-control": "no-cache"
            }
        }
      
        $.ajax(settings).done(function (response) {
            //return list of recipes
            //noOfResults - this is for future display 12 results per page and display the total no of recipes
            var recipes = response.recipes;
            console.log(recipes);
            //buildRecipesCollection
            for (var i = 0; i < recipes.length; i++)
            {            
                //iterate through each recipe and add to the class and then collection (array of class recipe)
                var recipeId = recipes[i].id;
                var title = recipes[i].title;
                var cuisines = recipes[i].cuisines;
                var ingredientsList = recipes[i].extendedIngredients;
                var image = recipes[i].image;
                var instructionsList = recipes[i].analyzedInstructions[0].steps;
                var recipe = new nomRecipe(recipeId, title, cuisines, ingredientsList, instructionsList, image);
                nomRecipes.push(recipe);
            }
            displayRecipesInfoByCuisines();
        }
    )};

    //this would happen when the recipe image/title clicked it would send the id along
    function displayRecipesDetailedById(id)
    {        
        // find recipe by id and display
        for (var i = 0; i < nomRecipes.length; i++) {
            //iterate through each recipe 
            var recipe = nomRecipes[i];
            //find the recipe we wants details on
            console.log(" 1: " + recipe.id + " 2: " + id );
            if(recipe.id == id)
            {                
                $(".recipeTitle").remove();
                $(".imgRecipe").remove();
                //prep the div that will hold all the information
                var recipeMainDiv = $("<div>");  
                recipeMainDiv.addClass("col-md-4");

                //get one p to add as needed
                var p = $("<p>)");

                //build the title 
                var title = $("<h3>");  
                title.text(recipe.title);

                //prep the image
                var src = recipe.imageSrc;
                var img =$("<img>");
                img.addClass("imgRecipe");
                img.attr("src", src);   

                //combine everything to add it to recipe div
                recipeMainDiv.append(p);
                recipeMainDiv.append(img);   
                recipeMainDiv.append(p);
                recipeMainDiv.append(title);
                $("#recipe").append(recipeMainDiv);

                //the cusines, instructions and ingredients etc work 
                var cuisDiv = $("<div>");  
                cuisDiv.append(p);
                var cuisineList = recipe.cuisines;
                // console.log(cuisineList);
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
                // console.log(cuisines);
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
                var ingredientsList = recipe.ingredientsList;
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
                var instructionsList = recipe.instructionsList;
                //console.log(instructionsList);
                var instructionsP =  $("<p>");
                for (var i=0; i < instructionsList.length; i++)
                {
                    var instructions = $("<ul>");
                    instructions.text(instructionsList[i].step);    
                    instructionsP.append(instructions);              
                } 
                recipeDiv.append(instructionsP);
                $("#recipe").append(recipeDiv);
                break;
            }
        }
    }

    //when the image from the list of recipes is clicked
    $(document).on('click', '.imgRecipe', function(){
        //get the id and send it for the display detailed info function
        var recipeId = $(this)[0].id;
        displayRecipesDetailedById(recipeId);
    });

    //when the title from the list of recipes is clicked
    $(document).on('click', '.recipeTitle', function(){
        //get the id and send it for the display detailed info function
        var recipeId = $(this)[0].id;
        displayRecipesDetailedById(recipeId);
    });
