// Function to fetch and display JSON data
async function fetchAndDisplayData() {
    try {
        // Fetch the JSON file from the specified path
        const response = await fetch('./recipes/recipes.json');

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data into a JavaScript object
        const data = await response.json();

        // Get the HTML element where you want to display the data
        const recipeList = document.getElementById('recipe-list');

        // Iterate over the products and create HTML elements
        data.forEach(recipe => {
            // Create a list item
            const listItem = document.createElement('li');

            // Create a "a" tag for the recipe
            const link = document.createElement('a');
            // Set the href attributes and text
            link.setAttribute('href', `recipe.html?id=${recipe.id}`);
            link.innerHTML = `${recipe.name}`;

            listItem.appendChild(link);
            //listItem.textContent = `<a href="">${recipe.name}</a>, Description: ${recipe.description}`;
            recipeList.appendChild(listItem);
        });
        
        // You can also log the full JSON object to the console for debugging
        console.log("Full JSON Data:", data);

    } catch (error) {
        // Handle any errors that occurred during the fetch operation
        console.error('Error fetching or parsing JSON:', error);
    }
}

// Call the function to start the process
fetchAndDisplayData();