// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	return JSON.parse(localStorage.getItem('recipes')) || [];
}	

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	// references main elem
	let mainWrapper = document.querySelector("main");

	//  Loops through each of the recipes in the passed in array,
	//	creates a <recipe-card> element for each one, and populate
	//  each <recipe-card> with that recipe data using element.data = ...
	//  Append each element to <main>

	for (let i = 0; i < recipes.length; i++) {
		let card = document.createElement("recipe-card");
		// grabs recipe from local storage and initializes card element with that data
		card.data = recipes[i];
		// appends each element to main
		mainWrapper.append(card);
	}
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	// grabs recipes list from local storage turns it into a string
	let recipesString = JSON.stringify(recipes);
	// adds the string version of recipes into the local storage array
	localStorage.setItem("recipes", recipesString);
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	// B2. TODO - Get a reference to the <xform> element
	const formElem = document.querySelector("form");

	// adds a new recipe-card elem to main with the form data.
	// saves to local storage
	formElem.addEventListener("submit", () => {
		// creates a FormData object from our create recipe card form
		let formData = new FormData(formElem);
		// makes an empty object so we can insert keys and values from recipeObject
		let recipeObject = new Object();
		// iterates through the key value pairs of formData and populates recipeObject
		for (let [recipeKey, value] of formData.entries()) {
			recipeObject[recipeKey] = value;
		}
		// creates newCard elem and initializes its data with recipeObject data in the correct format
		let newCard = document.createElement('recipe-card');
		newCard.data = recipeObject;

		// adds recipe card elem to main
		const mainWrapper = document.querySelector("main");
		mainWrapper.append(newCard)

		// grabs local recipes from storage so we can add on to it
		let localRecipes = getRecipesFromStorage();
		// adds recipe data into our localRecipes array so we can save it into local storage
		localRecipes.push(recipeObject);
		saveRecipesToStorage(localRecipes);
	})

	
	// clears all recipe local storage upon button click
	let clearButton = document.querySelectorAll('button')[[1]];
	// sets local storage value of 'recipes' to an empty array and clears main elems
	clearButton.addEventListener('click', () => {
		localStorage.setItem('recipes', JSON.stringify([]));
		let main = document.querySelector('main');
		main.innerHTML = "";
	})
}
