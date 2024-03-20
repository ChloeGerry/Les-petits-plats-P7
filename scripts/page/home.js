import { recipes } from "../../recipes.js";
import { FilterTemplateClass } from "../templates/filterRecipesClass.js";
import { RecipeTemplateClass } from "../templates/recipeTemplateClass.js";
import { APPLIANCES, INGREDIENTS, USTENSILS } from "../utils/constants.js";
import { SearchRecipeClass } from "../utils/searchRecipeClass.js";

const displayRecipesCards = () => {
  console.log("recipes", recipes);
  const recipesWrapper = document.getElementsByClassName("recipes-wrapper")[0];
  const recipeTemplate = new RecipeTemplateClass();
  let recipesToAdd = "";

  recipes.map((recipe) => (recipesToAdd += recipeTemplate.getRecipeCard(recipe)));
  recipesWrapper.innerHTML = recipesToAdd;
};

const filterRecipes = () => {
  const filtersCategories = [INGREDIENTS, APPLIANCES, USTENSILS];
  const filterTemplate = new FilterTemplateClass();

  const filtersElements = filterTemplate.getFiltersItems(recipes);
  filtersCategories.map((filterCategory) =>
    filterTemplate.filtersTemplate(filterCategory, filtersElements)
  );

  filterTemplate.displayNumberOfRecipes(recipes);
  filterTemplate.handleFilterValuesDisplay();
};

const init = () => {
  filterRecipes();
  displayRecipesCards();
  const search = new SearchRecipeClass();
  search.searchRecipeAlgorithmTemplate(recipes);
};

init();
