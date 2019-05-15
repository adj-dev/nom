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
    
    function displayRecipesInfoByCuisines()
        // Before rendering results change background image settings
        $('#recipeBg').css('height', '100%');
    {                  
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
            titleDiv.addClass("card-content recipeInfo");

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
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=12&tags=italian",
            "method": "GET",
            "headers": {
              "X-RapidAPI-Key": "d8801f3ce8msha12100d587bc143p151da1jsn3c1a652ff0a6",
              "Accept": "*/*",
              "cache-control": "no-cache"
            }
          }

        //remove the fake contents before filling
        $(".s4").remove();
        $("#keyword").text(searchTerm);
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

    //searching recipes by ID 829076
    function getRecipesInfoByID(recipeId)
    {        
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeId + "/information",
            "method": "GET",
            "headers": {
              "X-RapidAPI-Key": "d8801f3ce8msha12100d587bc143p151da1jsn3c1a652ff0a6",
              "Accept": "*/*",
              "cache-control": "no-cache"
            }
          }

        $("#ingredList").remove();
        var instructionsP =  $("#recipe_instructions");
        instructionsP.text("");

        $.ajax(settings).done(function (response) {
            //return list of recipes
            //noOfResults - this is for future display 12 results per page and display the total no of recipes

            console.log(response);
            //Set recipe information
            var recipeId = response.id;
            var title = response.title;
            var cuisines = response.cuisines;
            var ingredientsList = response.extendedIngredients;
            var image = response.image;
            var instructionsList = response.analyzedInstructions[0].steps;
            var recipe = new nomRecipe(recipeId, title, cuisines, ingredientsList, instructionsList, image);
            nomRecipes.push(recipe);
          
            displayRecipesDetailedById();
        }
    )};


    //this would happen when the recipe image/title clicked it would send the id along
    function displayRecipesDetailedById()
    {       
        for (var i = 0; i < nomRecipes.length; i++) {      
            var recipe = nomRecipes[i];

            //prep the title 
            var title = $("#recipeName");  
            title.text(recipe.title);

            //prep the image
            var src = recipe.imageSrc;
            var img =$("#recipeImage");
            img.addClass("imgRecipe");
            img.attr("src", src);   

            //organize ingredients
            var ingredientsMain = $("#ingredients");
            var ingredList = $("<ul>");  
            ingredList.attr("id", "ingredList");
            ingredientsMain.append(ingredList);

            //display ingredients
            var ingredients = "";
            var ingredientsList = recipe.ingredientsList;
            for (var i=0; i < ingredientsList.length; i++)
            {
                var ingredients = $("<li>");
                ingredients.text(ingredientsList[i].name);   
                ingredList.append(ingredients);        
            }        

            //organize and display recipe
            var recipeCard = $("#recipeName");
            var instructionsList = recipe.instructionsList;

            //console.log(instructionsList);
            var instructionsP =  $("#recipe_instructions");
            var instructions = $("<ul>");
            instructionsP.append(instructions);  
            for (var i=0; i < instructionsList.length; i++)
            {
                var instructions = $("<li>");
                instructions.text(instructionsList[i].step);    
                instructionsP.append(instructions);              
            } 
        }
    }

    //set the data for the details page to display
    function setRecipeDetails(recipeId){
         //iterate through each recipe 
        for (var i = 0; i < nomRecipes.length; i++) {
            //find the recipe we wants details on
            if(nomRecipes[i].id == recipeId)
            { 
                //set the matching recipe
                var recipe = nomRecipes[i];
                console.log("JSON " + JSON.stringify(recipe));
                localStorage.setItem("recipe", JSON.stringify(recipe));
            }
        }
    }

    // click handler for the recipe
    $(document).on('click', '#getRecipes', function() {
        searchTerm = $("#food-input").val();
        //console.log(searchTerm);
        // Only attempt api call if input isn't empty
        if (searchTerm != '') {  
            //localStorage.clear();
            localStorage.setItem("search", searchTerm);
            window.location.href="recipes.html";
        }
    });

    //when the image from the list of recipes is clicked
    $(document).on('click', '.imgRecipe', function(){
        //get the id and send it for the display detailed info function
        var recipeId = $(this)[0].id;
        localStorage.setItem("recipeId", recipeId);
        setRecipeDetails();
        window.location.href="recipe_layout.html";
    });
    
    //when the title from the one of recipes is clicked
    $(document).on('click', '.recipeTitle', function(){
        //get the id and send it for the display detailed info function
        var recipeId = $(this)[0].id;
        localStorage.setItem("recipeId", recipeId);
        setRecipeDetails();
        window.location.href="recipe_layout.html";
    });

