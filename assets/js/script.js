// var storedIngredients = ["apple", "chicken", "egg"];
// localStorage.setItem("ingredients", JSON.stringify(storedIngredients))
// var apiKey = "ddc5bf55d47a481586f8f6a808808cad";
var apiKey = "0195b7fd3cb14afbaa629e0c06b3d5b8";
var getRecipeBtn = document.querySelector("#search-btn");
var addItemsBtn = document.querySelector("#add-btn");
var clearItemsBtn = document.querySelector("#clear-btn");
var recipeTitle = [];  
var expandedRecipe = ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, eveniet ratione beatae iure molestias aperiam, quod officia harum cum dolore reprehenderit accusantium? Magnam quia illum assumenda accusamus enim, voluptatibus cumque."]
var recipes = [];
var placeholder = "It worked!!";

var recipeResultsContainer = document.querySelector("#recipe-results");
var ingredientContainer = document.querySelector("#ingredient-items");
var expandedRecipeContainer = document.querySelector("#recipe-expanded");
var ingredientInputs = [];

var getLocalStorage = function() {
    ingredientInputs = JSON.parse(localStorage.getItem("ingredients"));
    if (!ingredientInputs) {
        ingredientInputs = [];
    } else {
        displayLocalStorage(ingredientInputs);
    }
}

var displayLocalStorage = function(storedIngredients) {
    for (i = 0; i < ingredientInputs.length; i++) {
        var cardDivEl = document.createElement("div");
        cardDivEl.className = "card";
        var cardContentDivEl = document.createElement("div");
        cardContentDivEl.className = "card-content";
        var contentDivEl = document.createElement("div");
        contentDivEl.className = "content";
        contentDivEl.textContent = storedIngredients[i];
        // var contentXBtn = document.createElement("button");
        // contentXBtn.className = "x-btn";
        // contentXBtn.textContent = "X";

        // contentDivEl.appendChild(contentXBtn);
        cardContentDivEl.appendChild(contentDivEl);
        cardDivEl.appendChild(cardContentDivEl);
        ingredientContainer.appendChild(cardDivEl);
    }
}

getLocalStorage();

var displayIngredients = function() {

    var ingredientInputEl = document.getElementById("ingredient-input").value.toLowerCase().trim();
    
    if (!ingredientInputEl) {
        return;
    } else if (!ingredientInputs.includes(ingredientInputEl)) {
        ingredientInputs.push(ingredientInputEl);
        localStorage.setItem("ingredients", JSON.stringify(ingredientInputs));
        document.getElementById("ingredient-input").value = "";
        var cardDivEl = document.createElement("div");
        cardDivEl.className = "card";
        var cardContentDivEl = document.createElement("div");
        cardContentDivEl.className = "card-content";
        var contentDivEl = document.createElement("div");
        contentDivEl.className = "content";
        contentDivEl.textContent = ingredientInputEl;
        // var contentXBtn = document.createElement("button");
        // contentXBtn.className = "x-btn";
        // contentXBtn.textContent = "X";

        // contentDivEl.appendChild(contentXBtn);

        cardContentDivEl.appendChild(contentDivEl);
        cardDivEl.appendChild(cardContentDivEl);
        ingredientContainer.appendChild(cardDivEl);

        // contentDivEl.addEventListener("click", removeIngredient);
    }    
};

var removeItems = function() {
    localStorage.clear();
    location.reload();
}

// var removeIngredient = function(evt) {
//     debugger;
//     if (evt.target.classList.contains("x-btn")) {
//         var index = ingredientInputs.indexOf("egg");
//         console.log(index);
//     }

// }

var expandRecipe = function() {
    //console.log(this.id);
    var recipeId = this.id;
    //console.log(recipeId);
    instructionApiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
    //console.log(instructionApiUrl);
    //call the information needed
    fetch(instructionApiUrl)
        .then(Response => Response.json())
        .then(data => {
            console.log(data)
        })
    // format the info into the card
    var cardDivEl = document.createElement("div");
    cardDivEl.className = "card";
    var cardContentDivEl = document.createElement("div");
    cardContentDivEl.className = "card-content";
    var instructionsEl = document.createElement("p");
    var headerEl = document.createElement("h6");
    headerEl.className = "title", "is-3";
    headerEl.textContent = placeholder;
    instructionsEl.className = "content";
    instructionsEl.textContent = expandedRecipe; //instructions

    cardContentDivEl.appendChild(headerEl);
    cardContentDivEl.appendChild(instructionsEl);
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

    var recipeApiUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredientInputs}`
    
    
    //Pull Title from API
    fetch(recipeApiUrl)
        .then(Response => Response.json())
        .then(data => {
            //console.log(data[0].title);
            for (let i = 0; i < data.length; i++) {
                recipes.push(data[i]);
            }
        }).then(() => {
            for (i = 0; i < recipes.length; i++) {
                var cardDivEl = document.createElement("div");
                cardDivEl.className = "card";
                var cardContentDivEl = document.createElement("div");
                cardContentDivEl.className = "card-content";
                var contentDivEl = document.createElement("a");
                contentDivEl.className = "content";
                contentDivEl.setAttribute("id", recipes[i].id)
                contentDivEl.textContent = recipes[i].title;  //change to API info using notes down below
                
        
                cardContentDivEl.appendChild(contentDivEl);
                cardDivEl.appendChild(cardContentDivEl);
                recipeResultsContainer.appendChild(cardDivEl);
                contentDivEl.addEventListener("click", expandRecipe);
            }
            
        })
        console.log(recipes);
    
    
    
    
    
}

getRecipeBtn.addEventListener("click", displayRecipeSummaries);
addItemsBtn.addEventListener("click", displayIngredients);
clearItemsBtn.addEventListener("click", removeItems);


