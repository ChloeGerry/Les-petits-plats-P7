import { RecipeTemplateClass } from "../templates/recipeTemplateClass.js";

export const searchRecipeForLoop = (recipes) => {
  const searchInput = document.getElementsByClassName("search-input")[0];
  searchInput.addEventListener("input", (event) => {
    event.preventDefault();
    let inputValue = event.target.value;
    const matchingRecipes = [];

    if (inputValue.length > 2) {
      // const recipesWrapper = document.getElementsByClassName("recipes-wrapper")[0];
      // const recipeTemplate = new RecipeTemplateClass();
      // let displayMatchingRecipes = "";

      const deleteSearchIcon = document.getElementsByClassName("search-input-reset-icon")[0];
      deleteSearchIcon.style.visibility = "visible";

      deleteSearchIcon.addEventListener("click", () => {
        event.target.value = "";
        // recipes.map((recipe) => (displayMatchingRecipes += recipeTemplate.getRecipeCard(recipe)));
        // recipesWrapper.innerHTML = displayMatchingRecipes;
      });

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
    } else return;
  });
};
