import { recipes } from "../../recipes.js";
import { filteredRecipes } from "../filteredRecipes.js";
import { recipeTemplate } from "../template/recipeTemplate.js";

const displayRecipesCards = () => {
  const recipesWrapper = document.getElementsByClassName("recipes-wrapper")[0];

  console.log("recipes", recipes);

  let recipesToAdd = "";

  recipes.map((recipe) => {
    const recipeModel = recipeTemplate(recipe);
    recipesToAdd += recipeModel.setRecipeCard();
  });

  recipesWrapper.innerHTML = recipesToAdd;
};

const filterRecipes = () => {
  filteredRecipes(recipes);
};

const init = () => {
  filterRecipes();
  displayRecipesCards();
};

init();
