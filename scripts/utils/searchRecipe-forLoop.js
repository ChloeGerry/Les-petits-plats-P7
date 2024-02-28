import { RecipeTemplateClass } from "../templates/recipeTemplateClass.js";

export const searchRecipeForLoop = (recipes) => {
  const searchInput = document.getElementsByClassName("search-input")[0];
  searchInput.addEventListener("input", (event) => {
    event.preventDefault();
    const inputValue = event.target.value;
    const matchingRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
      for (let j = 0; j < recipes[i].ingredients.length; j++) {
        if (
          recipes[i].name.toLowerCase().match(inputValue.toLowerCase()) ||
          recipes[i].description.toLowerCase().match(inputValue.toLowerCase()) ||
          recipes[i].ingredients[j].ingredient.toLowerCase().match(inputValue.toLowerCase())
        ) {
          if (!matchingRecipes.includes(recipes[i])) {
            matchingRecipes.push(recipes[i]);
          }
        }

        const recipesWrapper = document.getElementsByClassName("recipes-wrapper")[0];
        const recipeTemplate = new RecipeTemplateClass();
        let displayMatchingRecipes = "";

        matchingRecipes.map(
          (recipe) => (displayMatchingRecipes += recipeTemplate.getRecipeCard(recipe))
        );
        recipesWrapper.innerHTML = displayMatchingRecipes;
      }
    }
  });
};
