// var apiKey = "0195b7fd3cb14afbaa629e0c06b3d5b8";
var getRecipeBtn = document.querySelector("#search-btn");
var addItemsBtn = document.querySelector("#add-btn");
var recipeSummaries = ["chicken parmesan", "pancakes", "chicken strips", "mac 'n cheese"];  
var placeholder = ["it worked!!"]
var recipes = []

var recipeResultsContainer = document.querySelector("#recipe-results");
var ingredientContainer = document.querySelector("#ingredient-items");
var expandedRecipeContainer = document.querySelector("#recipe-expanded");
var ingredientInputs = [];


var displayIngredients = function(ingredientInputEl) {

    var ingredientInputEl = document.getElementById("ingredient-input").value
    // const lastItem = ingredientInputs[ingredientInputs.length - 1]
    console.log(ingredientInputEl);
    ingredientInputs.push(ingredientInputEl);
    console.log(ingredientInputs);

    var cardDivEl = document.createElement("div");
    cardDivEl.className = "card";
    var cardContentDivEl = document.createElement("div");
    cardContentDivEl.className = "card-content";
    var contentDivEl = document.createElement("div");
    contentDivEl.className = "content";
    contentDivEl.textContent = ingredientInputEl;

    cardContentDivEl.appendChild(contentDivEl);
    cardDivEl.appendChild(cardContentDivEl);
    ingredientContainer.appendChild(cardDivEl);
    
    
};


var expandRecipe = function() {
    //make the information a string
    //call the information needed
    // format the info into the card
    var cardDivEl = document.createElement("div");
    cardDivEl.className = "card";
    var cardContentDivEl = document.createElement("div");
    cardContentDivEl.className = "card-content";
    var contentDivEl = document.createElement("div");
    contentDivEl.className = "content";
    contentDivEl.textContent = placeholder;

    cardContentDivEl.appendChild(contentDivEl);
    cardDivEl.appendChild(cardContentDivEl);
    expandedRecipeContainer.appendChild(cardDivEl);

      // fetch(apiUrl)
        // .then(Response => Response.json())
        // .then(resp => {
        //     console.log(resp)
        // })  => is an annonymous function, instead of function()

    // Calls the information in another way
        // async function recipes() {
        //     const response = await fetch(apiUrl);
        //     const resp = await response.json();
        //     console.log(resp.name);
        // }
    
}

var clearElement = function(element){
    element.innerHTML = "";
}


var displayRecipeSummaries = function() {

    var apiKey = "0195b7fd3cb14afbaa629e0c06b3d5b8"
    var apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredientInputs}`
    
    
    fetch(apiUrl)
        .then(Response => Response.json())
        .then(data => {
            console.log(data);
            recipes.push(data);
        })
        console.log(recipes);
        

          // fetch(apiUrl)
        // .then(Response => Response.json())
        // .then(resp => {
        //     console.log(resp)
        // })  => is an annonymous function, instead of function()

    // Calls the information in another way
        // async function recipes() {
        //     const response = await fetch(apiUrl);
        //     const resp = await response.json();
        //     console.log(resp.name);
        // }
    
    
    for (i = 0; i < recipeSummaries.length; i++) {
        var cardDivEl = document.createElement("div");
        cardDivEl.className = "card";
        var cardContentDivEl = document.createElement("div");
        cardContentDivEl.className = "card-content";
        var contentDivEl = document.createElement("div");
        contentDivEl.className = "content";
        contentDivEl.textContent = recipeSummaries[i];  //change to API info using notes down below
        

        cardContentDivEl.appendChild(contentDivEl);
        cardDivEl.appendChild(cardContentDivEl);
        recipeResultsContainer.appendChild(cardDivEl);
        
    }
    
    contentDivEl.addEventListener("click", expandRecipe);
}

getRecipeBtn.addEventListener("click", displayRecipeSummaries);
addItemsBtn.addEventListener("click", displayIngredients);


