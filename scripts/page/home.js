import { recipes } from "../../recipes.js";
import { filteredRecipes } from "../filteredRecipes.js";
import { recipeTemplate } from "../template/recipeTemplate.js";

const displayRecipesCards = () => {
  const recipesWrapper = document.getElementsByClassName("recipes-wrapper")[0];

  console.log("recipes", recipes);

  recipes.map((recipe) => {
    const recipeModel = recipeTemplate(recipe);
    const recipeCard = recipeModel.setRecipeCard();
    recipesWrapper.appendChild(recipeCard);
  });
};

const filterRecipes = () => {
  filteredRecipes(recipes);
};

const init = () => {
  filterRecipes();
  displayRecipesCards();
};

init();
