import { recipes } from "../../recipes.js";
import { FiltersTemplate } from "../templates/FiltersTemplate.js";
import { RecipesTemplate } from "../templates/RecipesTemplate.js";
import { APPLIANCES, INGREDIENTS, USTENSILS } from "../utils/constants.js";
import { SearchRecipes } from "../utils/SearchRecipes.js";

const displayRecipesCards = () => {
  console.log("recipes", recipes);
  const recipesWrapper = document.getElementsByClassName("recipes-wrapper")[0];
  const recipesTemplate = new RecipesTemplate();
  let recipesToAdd = "";

  recipes.map((recipe) => (recipesToAdd += recipesTemplate.getRecipeCard(recipe)));
  recipesWrapper.innerHTML = recipesToAdd;
};

const filterRecipes = () => {
  const filtersCategories = [INGREDIENTS, APPLIANCES, USTENSILS];
  const filtersTemplate = new FiltersTemplate();

  const filtersElements = filtersTemplate.getFiltersItems(recipes);
  filtersCategories.map((filterCategory) =>
    filtersTemplate.displayFiltersValues(filterCategory, filtersElements, null)
  );

  filtersTemplate.displayNumberOfRecipes(recipes);
  filtersTemplate.handleFilterValuesDisplay();
};

const init = () => {
  filterRecipes();
  displayRecipesCards();
  const search = new SearchRecipes();
  search.searchRecipeAlgorithmTemplate(recipes);
};

init();
