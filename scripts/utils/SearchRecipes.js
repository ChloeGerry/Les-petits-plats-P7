import { FiltersTemplate } from "../templates/FiltersTemplate.js";
import { RecipesTemplate } from "../templates/RecipesTemplate.js";
import { SearchFiltersTags } from "./SearchFiltersTags.js";
import { currentChoosenTags, filteredItems, regex, searchInput } from "./constants.js";

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
    this.regex = regex;
  }

  /**
   * Template to display recipes cards according to main search
   * @param {[object]} recipes - All recipes
   */

  displayRecipeWithMainSearch = (recipes) => {
    this.filtersTemplate.defineFiltersItems(recipes);
    const filtersItemsAndDOMElements = this.filtersTemplate.getFiltersElements();

    this.searchFiltersTags.onChangeUpdateFiltersItems(
      filtersItemsAndDOMElements,
      (matchingFilterItems) => matchingFilterItems
    );

    this.searchInput.addEventListener("input", (event) => {
      event.preventDefault();
      let inputValue = event.target.value;
      const recipesMatchingInputValue = [];
      let displayMatchingRecipes = "";

      if (!inputValue) {
        searchInput.splice(0, searchInput.length);
        this.errorMessage.style.visibility = "hidden";
        this.deleteSearchIcon.style.visibility = "hidden";
        filteredItems.splice(0, filteredItems.length);
        this.filtersTemplate.displayNumberOfRecipes(recipes);

        recipes.forEach(
          (recipe) => (displayMatchingRecipes += this.recipesTemplate.recipeCardTemplate(recipe))
        );

        this.recipesWrapper.innerHTML = displayMatchingRecipes;
      }

      if (inputValue.length > 0 && inputValue.length < 3) {
        this.errorMessage.style.visibility = "visible";
        this.errorMessage.textContent = `Vous devez entrer au moins 3 caractères pour afficher les recettes`;
      }

      if (inputValue.length > 2 && this.regex.test(inputValue)) {
        this.errorMessage.style.visibility = "hidden";
        this.deleteSearchIcon.style.visibility = "visible";

        this.deleteSearchIcon.addEventListener("click", () => {
          this.deleteSearchIcon.style.visibility = "hidden";
          this.errorMessage.style.visibility = "hidden";
          event.target.value = "";
          searchInput.splice(0, searchInput.length);

          if (currentChoosenTags.length > 0) {
            this.displayRecipeByTags(recipes, currentChoosenTags[0]);
            for (let index = 1; index < currentChoosenTags.length; index++) {
              this.displayRecipeByTags(filteredItems[0], currentChoosenTags[index]);
            }
          } else {
            filteredItems.splice(0, filteredItems.length);

            recipes.forEach(
              (recipe) =>
                (displayMatchingRecipes += this.recipesTemplate.recipeCardTemplate(recipe))
            );

            this.filtersTemplate.displayNumberOfRecipes(recipes);
            this.recipesWrapper.innerHTML = displayMatchingRecipes;
          }
        });

        if (currentChoosenTags.length > 0) {
          const filteredRecipes = this.searchRecipeAlgorithm(
            filteredItems[0],
            inputValue,
            recipesMatchingInputValue
          );

          filteredItems.push(filteredRecipes);
          searchInput.push(inputValue);

          if (!filteredRecipes || filteredRecipes.length === 0) {
            this.errorMessage.style.visibility = "visible";
            this.errorMessage.textContent = `Aucune recette ne contient ${inputValue} et les filtres selectionnés`;
          }

          filteredRecipes.forEach(
            (recipe) => (displayMatchingRecipes += this.recipesTemplate.recipeCardTemplate(recipe))
          );
          this.filtersTemplate.displayNumberOfRecipes(filteredRecipes);
          this.recipesWrapper.innerHTML = displayMatchingRecipes;
        } else {
          const arrayRecipe = this.searchRecipeAlgorithm(
            recipes,
            inputValue,
            recipesMatchingInputValue
          );
          filteredItems.push(arrayRecipe);
          searchInput.push(inputValue);

          if (!arrayRecipe || arrayRecipe.length === 0) {
            this.errorMessage.style.visibility = "visible";
            this.errorMessage.textContent = `Aucune recette ne contient ${inputValue}, vous pouvez chercher 'tarte aux pommes' ou 'chocolat' par exemple`;
          }

          arrayRecipe.forEach(
            (recipe) => (displayMatchingRecipes += this.recipesTemplate.recipeCardTemplate(recipe))
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
   * @param {[object]} recipesMatchingInputValue - Recipes matching the input search
   * @returns {[string]} Matching recipes
   */

  searchRecipeAlgorithm = (recipes, inputValue, recipesMatchingInputValue) => {
    // add search algorithm for both methods
    return recipesMatchingInputValue;
  };

  /**
   * Search by tags algorithm
   * @param {[object]} recipes - All recipes
   * @param {string} inputValue - Value of the input search
   * @param {[object]} recipesMatchingInputValue - Recipes matching the filter input search
   * @returns {[string]} Matching recipes
   */

  searchRecipesByTags = (recipes, tagValue, recipesMatchingInputValue) => {
    recipes.forEach((recipe) => {
      recipe.ingredients.filter((recipeIngredient) => {
        recipe.ustensils.filter((recipeUstensil) => {
          const isApplianceEqual = recipe.appliance.toLowerCase().match(tagValue.toLowerCase());
          const isUstensilEqual = recipeUstensil.toLowerCase().match(tagValue.toLowerCase());
          const isIngredientsEqual = recipeIngredient.ingredient
            .toLowerCase()
            .match(tagValue.toLowerCase());

          if (
            (isApplianceEqual || isUstensilEqual || isIngredientsEqual) &&
            !recipesMatchingInputValue.includes(recipe)
          ) {
            recipesMatchingInputValue.push(recipe);
          }
        });
      });
    });
    return recipesMatchingInputValue;
  };

  /**
   * Template to display recipes cards according to search by tags
   * @param {[object]} recipes - All recipes
   * @param {string} choosenTagName - Choosen tag name
   */

  displayRecipeByTags = (recipes, choosenTagName) => {
    let displayMatchingRecipes = "";
    let recipesMatchingInputValue = [];

    const updatedArrayRecipe = this.searchRecipesByTags(
      recipes,
      choosenTagName,
      recipesMatchingInputValue
    );

    if (filteredItems.length > 0) {
      filteredItems.splice(0, filteredItems.length);
    }

    filteredItems.push(updatedArrayRecipe);

    updatedArrayRecipe.forEach(
      (recipe) => (displayMatchingRecipes += this.recipesTemplate.recipeCardTemplate(recipe))
    );

    this.filtersTemplate.displayNumberOfRecipes(updatedArrayRecipe);
    this.recipesWrapper.innerHTML = displayMatchingRecipes;
  };
}
