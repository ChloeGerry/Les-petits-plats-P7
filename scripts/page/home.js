import { recipes } from "../../recipes.js";
import { FiltersTemplate } from "../templates/FiltersTemplate.js";
import { RecipesTemplate } from "../templates/RecipesTemplate.js";
import { SearchRecipes } from "../utils/SearchRecipes.js";
import { APPLIANCES, INGREDIENTS, USTENSILS } from "../utils/constants.js";

const displayRecipesCards = () => {
  const recipesWrapper = document.getElementsByClassName("recipes-wrapper")[0];
  const recipesTemplate = new RecipesTemplate();
  let recipesToAdd = "";

  recipes.map((recipe) => (recipesToAdd += recipesTemplate.recipeCardTemplate(recipe)));
  recipesWrapper.innerHTML = recipesToAdd;
};

const handleRecipesFilter = () => {
  const filtersCategories = [INGREDIENTS, APPLIANCES, USTENSILS];
  const filtersTemplate = new FiltersTemplate();

  filtersTemplate.defineFiltersItems(recipes);
  const filtersElements = filtersTemplate.getFiltersElements();
  filtersCategories.map((filterCategory) =>
    filtersTemplate.filtersWrapperTemplate(filterCategory, filtersElements)
  );

  filtersTemplate.displayNumberOfRecipes(recipes);
  const event = null;
  filtersTemplate.handleFiltersOpeningAndClosing(event);
};

const init = () => {
  handleRecipesFilter();
  displayRecipesCards();

  const searchRecipes = new SearchRecipes();
  searchRecipes.displayRecipeWithMainSearch(recipes);
};

init();
