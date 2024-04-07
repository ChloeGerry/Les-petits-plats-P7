import { FiltersTemplate } from "../templates/FiltersTemplate.js";
import { RecipesTemplate } from "../templates/RecipesTemplate.js";
import { SearchFiltersTags } from "./SearchFiltersTags.js";
import { currentChoosenTags, filteredItems, searchInput } from "./constants.js";

export class SearchRecipes {
  constructor() {
    this.recipesTemplate = new RecipesTemplate();
    this.filtersTemplate = new FiltersTemplate();
    this.searchFiltersTags = new SearchFiltersTags();
    this.searchInput = document.getElementsByClassName("search-input")[0];
    this.deleteSearchIcon = document.getElementsByClassName("search-input-reset-icon")[0];
    this.recipesWrapper = document.getElementsByClassName("recipes-wrapper")[0];
    this.errorMessage = document.getElementsByClassName("error-message")[0];
    this.filtersTags = document.querySelectorAll(".filters-elements");
  }

  /**
   * Template main search algorithm
   * @param {[object]} recipes - All recipes
   * @returns Cards of the matching recipes
   */

  searchRecipeAlgorithmTemplate = (recipes) => {
    const filtersElements = this.filtersTemplate.getFiltersItems(recipes);

    this.searchFiltersTags.onChangeUpdateFiltersItems(filtersElements, (matchingFilterItems) => {
      this.filteredItems = matchingFilterItems;
    });

    this.searchInput.addEventListener("input", (event) => {
      event.preventDefault();
      let inputValue = event.target.value;
      const matchingRecipes = [];
      let displayMatchingRecipes = "";

      if (!inputValue) {
        this.errorMessage.style.visibility = "hidden";
        this.deleteSearchIcon.style.visibility = "hidden";
        filteredItems.splice(0, filteredItems.length);
        this.filtersTemplate.displayNumberOfRecipes(recipes);

        recipes.forEach(
          (recipe) => (displayMatchingRecipes += this.recipesTemplate.getRecipeCard(recipe))
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
          searchInput.splice(0, searchInput.length);

          if (currentChoosenTags.length > 0) {
            this.searchRecipeByTags(recipes, currentChoosenTags[0]);
            for (let index = 1; index < currentChoosenTags.length; index++) {
              this.searchRecipeByTags(filteredItems[0], currentChoosenTags[index]);
            }
          } else {
            filteredItems.splice(0, filteredItems.length);

            recipes.forEach(
              (recipe) => (displayMatchingRecipes += this.recipesTemplate.getRecipeCard(recipe))
            );

            this.filtersTemplate.displayNumberOfRecipes(recipes);
            this.recipesWrapper.innerHTML = displayMatchingRecipes;
          }
        });

        if (currentChoosenTags.length > 0) {
          const filteredRecipes = this.searchRecipeAlgorithm(
            filteredItems[0],
            inputValue,
            matchingRecipes
          );

          filteredItems.push(filteredRecipes);
          searchInput.push(inputValue);

          if (!filteredRecipes || filteredRecipes.length === 0) {
            this.errorMessage.style.visibility = "visible";
            this.errorMessage.textContent = `Aucune recette ne contient ${inputValue} et les filtres selectionnés`;
          }

          filteredRecipes.forEach(
            (recipe) => (displayMatchingRecipes += this.recipesTemplate.getRecipeCard(recipe))
          );
          this.filtersTemplate.displayNumberOfRecipes(filteredRecipes);
          this.recipesWrapper.innerHTML = displayMatchingRecipes;
        } else {
          const arrayRecipe = this.searchRecipeAlgorithm(recipes, inputValue, matchingRecipes);
          filteredItems.push(arrayRecipe);
          searchInput.push(inputValue);

          if (!arrayRecipe || arrayRecipe.length === 0) {
            this.errorMessage.style.visibility = "visible";
            this.errorMessage.textContent = `Aucune recette ne contient ${inputValue}, vous pouvez chercher 'tarte aux pommes' ou 'chocolat' par exemple`;
          }

          arrayRecipe.forEach(
            (recipe) => (displayMatchingRecipes += this.recipesTemplate.getRecipeCard(recipe))
          );
          this.filtersTemplate.displayNumberOfRecipes(arrayRecipe);
          this.recipesWrapper.innerHTML = displayMatchingRecipes;
        }
      }
    });
  };

  /**
   * Main search algorithm
   * @param {[object]} recipes - All recipes
   * @param {string} inputValue - Value of the input search
   * @param {[object]} matchingRecipes - Recipes matching the input search
   * @returns {[string]} Matching recipes
   */

  searchRecipeAlgorithm = (recipes, inputValue, matchingRecipes) => {
    // add search algorithm for both methods
    return matchingRecipes;
  };

  searchRecipeByTags = (recipes, currentChoosenTag) => {
    let displayMatchingRecipes = "";
    let matchingRecipes = [];

    const updatedArrayRecipe = this.searchRecipeAlgorithm(
      recipes,
      currentChoosenTag,
      matchingRecipes
    );

    filteredItems.push(updatedArrayRecipe);

    if (updatedArrayRecipe.length === 0) {
      this.filtersTemplate.displayNumberOfRecipes([]);
      this.recipesWrapper.innerHTML = `<p>Aucune recette ne contient les filtres sélectionnés, vous pouvez essayer avec un autre filtre</p>`;
      return;
    }

    updatedArrayRecipe.forEach(
      (recipe) => (displayMatchingRecipes += this.recipesTemplate.getRecipeCard(recipe))
    );

    this.filtersTemplate.displayNumberOfRecipes(updatedArrayRecipe);
    this.recipesWrapper.innerHTML = displayMatchingRecipes;
  };
}
