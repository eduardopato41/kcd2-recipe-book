// Function to fetch and display JSON data
async function fetchAndDisplayData() {
    try {
        // Get the query parameters from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const recipeId = urlParams.get('id');

        console.log("Recipe ID from URL:", recipeId);

        // Fetch the JSON file from the specified path
        const response = await fetch('./recipes/recipes.json');

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data into a JavaScript object
        const data = await response.json();

        // Find the specific recipe based on the ID from the URL
        const foundRecipe = data.find(item => item.id === recipeId);

        console.log("Found Item:", foundRecipe);

        // Get the HTML element where you want to display the data
        const recipeDisplay = document.getElementById('recipe');

        // == Create a div with heading for the name and a paragraph for the description of the recipe
        // Div (Recipe Heading)
        const recipeHeading = document.createElement('div');
        recipeHeading.setAttribute('id', 'recipe-heading');
        // Heading (Name)
        const recipeName = document.createElement('h2');
        recipeName.textContent = foundRecipe.name;
        // Paragraph (Description)
        const recipeDescription = document.createElement('p');
        recipeDescription.textContent = foundRecipe.description;
        //
        // Append Name and description to Div
        recipeHeading.appendChild(recipeName);
        recipeHeading.appendChild(recipeDescription);
        // Append the div to the main recipe display element
        recipeDisplay.appendChild(recipeHeading);

        // == Create a div for the base and ingredients used in the recipe
        const recipeIngredientsHeader = document.createElement('div');
        recipeIngredientsHeader.setAttribute('class', 'recipe-ingredients-header');
        //
        // Create a div for ingredients text
        const recipeIngredientsHeadingContainer = document.createElement('div');
        // Heading for the ingredients
        const recipeIngredientsHeading = document.createElement('h3');
        recipeIngredientsHeading.textContent = 'Ingredients';
        //
        // Create a div for the base text
        const recipeBaseHeadingContainer = document.createElement('div');
        recipeBaseHeadingContainer.setAttribute('class', 'recipe-base');
        // Base text
        const recipeBase = document.createElement('p');
        recipeBase.textContent = 'Base ';
        const recipeBaseName = document.createElement('span');
        recipeBaseName.setAttribute('class', 'pill-base');
        recipeBaseName.textContent = foundRecipe.base;

        // Append the base name to the base text
        recipeBase.appendChild(recipeBaseName);
        // Append the base text to the base heading container
        recipeBaseHeadingContainer.appendChild(recipeBase);
        // Append the ingredients heading to the ingredients heading container
        recipeIngredientsHeadingContainer.appendChild(recipeIngredientsHeading);
        // Append the base heading container and the ingredients heading container to the recipe ingredients header
        recipeIngredientsHeader.appendChild(recipeIngredientsHeadingContainer);
        recipeIngredientsHeader.appendChild(recipeBaseHeadingContainer);
        // Append the recipe ingredients header to the main recipe display element        
        recipeDisplay.appendChild(recipeIngredientsHeader);

        // == Create a list to display the ingredients
        const ingredientsList = document.createElement('ul');
        ingredientsList.setAttribute('id', 'recipe-ingredients-items');
        //
        // Iterate over the products and create HTML elements
        foundRecipe.ingredients.forEach(ingredient => {
            const ingredientsItem = document.createElement('li');
            ingredientsItem.setAttribute('class', 'pill-ingredient');

            ingredientsItem.textContent = ingredient.item + ' x' + ingredient.quantity;
            ingredientsList.appendChild(ingredientsItem);
        });
        //
        // Append the ingredients list to the main recipe display element
        recipeDisplay.appendChild(ingredientsList);

        // == Create a list to display the instructions
        const instructionsList = document.createElement('ul');
        instructionsList.setAttribute('id', 'recipe-instructions-items');
        //
        // Iterate over the products and create HTML elements
        foundRecipe.instructions.forEach(instruction => {
            const instructionsItem = document.createElement('li');

            instructionsItem.textContent = instruction;
            instructionsList.appendChild(instructionsItem);
        });
        //
        // Append the instructions list to the main recipe display element
        recipeDisplay.appendChild(instructionsList);

        // You can also log the full JSON object to the console for debugging
        console.log("Full JSON Data:", data);

    } catch (error) {
        // Handle any errors that occurred during the fetch operation
        console.error('Error fetching or parsing JSON:', error);

        // Show an error message to the user        
        const recipeDisplay = document.getElementById('recipe');
        const recipeHeading = document.createElement('div');
        recipeHeading.setAttribute('id', 'recipe-heading');
        // Heading (Name)
        const recipeName = document.createElement('h2');
        recipeName.textContent = 'Error Loading Recipe';
        // Paragraph (Description)
        const recipeDescription = document.createElement('p');
        recipeDescription.textContent = 'Sorry, an error occurred while loading the recipe.';
        //
        // Append Name and description to Div
        recipeHeading.appendChild(recipeName);
        recipeHeading.appendChild(recipeDescription);
        // Append the div to the main recipe display element
        recipeDisplay.appendChild(recipeHeading);
    }
}

// Call the function to start the process
fetchAndDisplayData();