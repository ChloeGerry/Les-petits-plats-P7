import { FilterTemplateClass } from "../templates/filterRecipesClass.js";
import { RecipeTemplateClass } from "../templates/recipeTemplateClass.js";

export class SearchRecipeClass {
  constructor() {
    this.searchInput = document.getElementsByClassName("search-input")[0];
    this.deleteSearchIcon = document.getElementsByClassName("search-input-reset-icon")[0];
    this.recipesWrapper = document.getElementsByClassName("recipes-wrapper")[0];
    this.errorMessage = document.getElementsByClassName("error-message")[0];
    this.recipeTemplate = new RecipeTemplateClass();
    this.filterTemplate = new FilterTemplateClass();
    this.filtersItems = null;
  }

  /**
   * method to template the main search algorithm
   * @param {[object]} recipes - list of all recipes
   * @returns the cards of the matching recipes
   */

  searchRecipeAlgorithmTemplate = (recipes) => {
    const filtersElements = this.filterTemplate.getFiltersItems(recipes);
    this.filterTemplate.onChangeUpdateFiltersItems(
      filtersElements,
      (matchingFiltersItems) => (this.filtersItems = matchingFiltersItems)
    );
    const chloe = "’coucou’";

    this.searchInput.addEventListener("input", (event) => {
      event.preventDefault();
      let inputValue = event.target.value;
      const matchingRecipes = [];
      let displayMatchingRecipes = "";

      if (!inputValue) {
        this.errorMessage.style.visibility = "hidden";
        this.deleteSearchIcon.style.visibility = "hidden";
        this.filterTemplate.displayNumberOfRecipes(recipes);
        recipes.forEach(
          (recipe) => (displayMatchingRecipes += this.recipeTemplate.getRecipeCard(recipe))
        );

        this.recipesWrapper.innerHTML = displayMatchingRecipes;
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

          this.filterTemplate.displayNumberOfRecipes(recipes);
          recipes.forEach(
            (recipe) => (displayMatchingRecipes += this.recipeTemplate.getRecipeCard(recipe))
          );

          this.recipesWrapper.innerHTML = displayMatchingRecipes;
        });

        const arrayRecipe = this.searchRecipeAlgorithm(recipes, inputValue, matchingRecipes);
        console.log("this.filtersItems", this.filtersItems);

        if (!arrayRecipe || arrayRecipe.length === 0) {
          this.errorMessage.style.visibility = "visible";
          this.errorMessage.textContent = `Aucune recette ne contient ${inputValue}, vous pouvez chercher 'tarte aux pommes' ou 'chocolat' par exemple`;
        }

        arrayRecipe.forEach(
          (recipe) => (displayMatchingRecipes += this.recipeTemplate.getRecipeCard(recipe))
        );
        this.filterTemplate.displayNumberOfRecipes(arrayRecipe);
        this.recipesWrapper.innerHTML = displayMatchingRecipes;
      }
    });
  };

  /**
   * method that contains the main search algorithm
   * @param {[object]} recipes - list of all recipes
   * @param {string} inputValue - value of the input search
   * @param {[object]} matchingRecipes - list of recipes matching the input search
   * @returns the list of the matching recipes
   */

  searchRecipeAlgorithm = (recipes, inputValue, matchingRecipes) => {
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
    console.log("matchingRecipes", matchingRecipes);
    return matchingRecipes;
  };
}
