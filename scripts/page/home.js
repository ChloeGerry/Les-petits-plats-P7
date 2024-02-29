import { recipes } from "../../recipes.js";
import { FilterTemplateClass } from "../templates/filterRecipesClass.js";
import { RecipeTemplateClass } from "../templates/recipeTemplateClass.js";
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
  const filtersCategories = ["Ingrédients", "Appareils", "Ustensiles"];
  const filterTemplate = new FilterTemplateClass();

  filtersCategories.map((filterCategory) =>
    filterTemplate.filtersTemplate(filterCategory, recipes)
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
