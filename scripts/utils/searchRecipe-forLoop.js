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
      const recipesWrapper = document.getElementsByClassName("recipes-wrapper")[0];
      const recipeTemplate = new RecipeTemplateClass();
      let displayMatchingRecipes = "";

      for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
          const isNameEqual = recipes[i].name.toLowerCase().match(inputValue.toLowerCase());
          const isDescriptionEqual = recipes[i].description
            .toLowerCase()
            .match(inputValue.toLowerCase());
          const isIngredientsEqual = recipes[i].ingredients[j].ingredient
            .toLowerCase()
            .match(inputValue.toLowerCase());

          if (
            (isNameEqual || isDescriptionEqual || isIngredientsEqual) &&
            !matchingRecipes.includes(recipes[i])
          ) {
            matchingRecipes.push(recipes[i]);
          }

          matchingRecipes.forEach(
            (recipe) => (displayMatchingRecipes += recipeTemplate.getRecipeCard(recipe))
          );
        }
      }

      recipesWrapper.innerHTML = displayMatchingRecipes;
    } else return;
  });
};
