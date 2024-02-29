import { FilterTemplateClass } from "../templates/filterRecipesClass.js";
import { RecipeTemplateClass } from "../templates/recipeTemplateClass.js";

export class SearchRecipeClass {
  constructor() {
    this.searchInput = document.getElementsByClassName("search-input")[0];
    this.deleteSearchIcon = document.getElementsByClassName("search-input-reset-icon")[0];
    this.recipesWrapper = document.getElementsByClassName("recipes-wrapper")[0];
    this.errorMessage = document.getElementsByClassName("error-message")[0];
    this.recipeTemplate = new RecipeTemplateClass();
    this.numberOfRecipe = new FilterTemplateClass();
  }

  searchRecipeAlgorithmTemplate = (recipes) => {
    this.searchInput.addEventListener("input", (event) => {
      event.preventDefault();
      let inputValue = event.target.value;
      const matchingRecipes = [];
      let displayMatchingRecipes = "";

      if (!inputValue) {
        this.errorMessage.style.visibility = "hidden";
        this.deleteSearchIcon.style.visibility = "hidden";
      }

      if (inputValue.length > 0 && inputValue.length < 3) {
        this.errorMessage.style.visibility = "visible";
        this.errorMessage.textContent = `Vous devez taper au moins 3 caractères pour afficher les recettes`;
      }

      if (inputValue.length > 2) {
        this.errorMessage.style.visibility = "hidden";
        this.deleteSearchIcon.style.visibility = "visible";

        this.deleteSearchIcon.addEventListener("click", () => {
          this.deleteSearchIcon.style.visibility = "hidden";
          this.errorMessage.style.visibility = "hidden";
          event.target.value = "";

          this.numberOfRecipe.displayNumberOfRecipes(recipes);
          recipes.forEach(
            (recipe) => (displayMatchingRecipes += this.recipeTemplate.getRecipeCard(recipe))
          );

          this.recipesWrapper.innerHTML = displayMatchingRecipes;
        });

        const arrayRecipe = this.searchRecipeAlgorith(recipes, inputValue, matchingRecipes);

        if (!arrayRecipe || arrayRecipe.length === 0) {
          this.errorMessage.style.visibility = "visible";
          this.errorMessage.textContent = `Aucune recette ne contient ${inputValue} vous pouvez chercher 'tarte aux pommes', 'chocolat' à la place`;
        }

        arrayRecipe.forEach(
          (recipe) => (displayMatchingRecipes += this.recipeTemplate.getRecipeCard(recipe))
        );

        this.numberOfRecipe.displayNumberOfRecipes(arrayRecipe);
        this.recipesWrapper.innerHTML = displayMatchingRecipes;
      }
    });
  };

  searchRecipeAlgorith = (recipes, inputValue, matchingRecipes) => {
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
      }
    }
    return matchingRecipes;
  };
}
