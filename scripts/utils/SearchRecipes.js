import { FiltersTemplate } from "../templates/FiltersTemplate.js";
import { RecipesTemplate } from "../templates/RecipesTemplate.js";
import { SearchFiltersTags } from "./SearchFiltersTags.js";

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
    this.filteredItems = null;
  }

  /**
   * method to template the main search algorithm
   * @param {[object]} recipes - list of all recipes
   * @returns the cards of the matching recipes
   */

  searchRecipeAlgorithmTemplate = (recipes) => {
    const filtersElements = this.filtersTemplate.getFiltersItems(recipes);

    this.searchFiltersTags.onChangeUpdateFiltersItems(
      filtersElements,
      (matchingFilterItems) => matchingFilterItems
    );

    this.searchInput.addEventListener("input", (event) => {
      event.preventDefault();
      let inputValue = event.target.value;
      const matchingRecipes = [];
      let displayMatchingRecipes = "";

      if (!inputValue) {
        this.errorMessage.style.visibility = "hidden";
        this.deleteSearchIcon.style.visibility = "hidden";
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

          this.filtersTemplate.displayNumberOfRecipes(recipes);
          recipes.forEach(
            (recipe) => (displayMatchingRecipes += this.recipesTemplate.getRecipeCard(recipe))
          );

          this.recipesWrapper.innerHTML = displayMatchingRecipes;
        });

        const arrayRecipe = this.searchRecipeAlgorithm(recipes, inputValue, matchingRecipes);

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
    });
  };

  /**
   * method that contains the main search algorithm
   * @param {[object]} recipes - list of all recipes
   * @param {string} inputValue - value of the input search
   * @param {[object]} matchingRecipes - list of recipes matching the input search
   * @returns {[string]} the list of the matching recipes
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
    return matchingRecipes;
  };

  searchRecipeByTags = (recipes, currentChoosenTag) => {
    if (currentChoosenTag) {
      let displayMatchingRecipes = "";
      const matchingRecipes = [];
      const arrayRecipe = this.searchRecipeAlgorithm(recipes, currentChoosenTag, matchingRecipes);

      if (!arrayRecipe || arrayRecipe.length === 0) {
        return (this.recipesWrapper.innerHTML = `<p>Aucune recette ne contient ${currentChoosenTag}, vous pouvez essayer avec un autre filtre</p>`);
      }

      arrayRecipe.forEach(
        (recipe) => (displayMatchingRecipes += this.recipesTemplate.getRecipeCard(recipe))
      );
      this.filtersTemplate.displayNumberOfRecipes(arrayRecipe);
      this.recipesWrapper.innerHTML = displayMatchingRecipes;
    }
  };
}