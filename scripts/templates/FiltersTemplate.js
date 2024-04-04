import { RecipesTemplate } from "./RecipesTemplate.js";
import { recipes } from "../../recipes.js";
import { SearchRecipes } from "../utils/SearchRecipes.js";
import { currentChoosenTags, filteredItems, searchInput } from "../utils/constants.js";

export class FiltersTemplate {
  constructor() {
    this.recipesTemplate = new RecipesTemplate();
    this.filtersSection = document.getElementsByClassName("filters-section")[0];
    this.tagsWrapper = document.getElementsByClassName("tags-wrapper")[0];
    this.numberOfRecipes = document.getElementsByClassName("numbers-recipes")[0];
    this.recipesWrapper = document.getElementsByClassName("recipes-wrapper")[0];
    this.filteredItems = null;
  }

  /**
   * Get all filters items
   * @param {[object]} recipes - All recipes
   * @returns {{Ingrédients: { ([string]) => {} }, filtersItems: [string]},
   * {Appareils: { ([string]) => {} }, filtersItems: [string]},
   * {Ustensiles: { ([string]) => {} }, filtersItems: [string]}} the object that contains all filters items and can display them
   */

  getFiltersItems = (recipes) => {
    // get filters values and put them in array
    const ingredients = [];
    const appliances = [];
    const ustensils = [];

    recipes.forEach((currentRecipe) => {
      currentRecipe.ingredients.forEach((recipe) => {
        if (!ingredients.includes(recipe.ingredient)) {
          ingredients.push(recipe.ingredient);
        }
      });
      currentRecipe.ustensils.forEach((ustensil) => {
        if (!ustensils.includes(ustensil)) {
          ustensils.push(ustensil);
        }
      });
    });

    recipes.filter(
      (recipe) => !appliances.includes(recipe.appliance) && appliances.push(recipe.appliance)
    );

    const filtersElements = {
      Ingrédients: {
        display: this.filtersTemplate(ingredients),
        filtersItems: ingredients,
      },
      Appareils: {
        display: this.filtersTemplate(appliances),
        filtersItems: appliances,
      },
      Ustensiles: {
        display: this.filtersTemplate(ustensils),
        filtersItems: ustensils,
      },
    };
    return filtersElements;
  };

  /**
   * Map filters values
   * @param {[string]} filterElements - All filters elements
   * @returns Template for each filter elements
   */

  filtersTemplate = (filterElements) =>
    filterElements.map(
      (element) =>
        `<p class="filters-elements text-sm font-normal m-0 cursor-pointer">${element}</p>`
    );

  /**
   * Fill filters values
   * @param {[string]} filterName - Filters categories
   * @param {[object]} filtersElements - Filters categories values + elements
   * @param {[string]} filteredItems - Items matches filters search
   * @returns Filters wrapper
   */

  displayFiltersValues = (filterName, filtersElements, filteredItems) => {
    this.filtersSection.innerHTML += `<div class="filter-wrapper absolute flex z-10 flex-col bg-white p-4 h-fit rounded-xl w-56 overflow-y-auto top-[690px]">
      <div class="flex justify-between w-48">
        <p class="m-0 filter-category">${filterName}</p>
        <img class="arrow-icon cursor-pointer" src="./assets/arrow.svg" alt="arrow icon">
      </div>
      <div class="filter-search-wrapper flex-col relative hidden">
        <input class="search-input-filter border border-style:solid mb-6 mt-4 p-3" type="search">
        <img class="absolute right-3 top-8" src="./assets/search-grey-icon.svg" alt="search icon">
        <div class="js-filters-items-wrapper--${filterName}">
          ${this.getFilteredItems(filtersElements, filterName, filteredItems)}
        </div>
      </div>
    </div>
   `;
  };

  getFilteredItems = (filtersElements, filterName, filteredItems) => {
    let recipesFilterValues = "";
    this.filteredItems = filteredItems;

    // join filters values to the wrapper using the filtersElements array
    if (this.filteredItems) {
      recipesFilterValues = `<div class="filter-items-wrapper flex flex-col gap-3">
      ${this.filtersTemplate(filtersElements).join("")}
      </div>`;
    } else {
      recipesFilterValues = `<div class="flex flex-col gap-3">${filtersElements[filterName][
        "display"
      ].join("")}</div>`;
    }
    return recipesFilterValues;
  };

  /**
   * Display filters values
   * @returns opening / closing for the filters
   */

  handleFilterValuesDisplay = () => {
    const arrowsIcons = document.getElementsByClassName("arrow-icon");
    let isFilterOpen = false;

    const filterWrapperAppliances = document.getElementsByClassName("filter-wrapper")[1];
    filterWrapperAppliances.style.left = "385px";
    const filterWrapperUstensils = document.getElementsByClassName("filter-wrapper")[2];
    filterWrapperUstensils.style.left = "675px";

    for (let i = 0; i < arrowsIcons.length; i++) {
      arrowsIcons[i].addEventListener("click", () => {
        isFilterOpen = !isFilterOpen;
        const filterDisplayWrapper = document.getElementsByClassName("filter-search-wrapper");
        const filterWrapper = document.getElementsByClassName("filter-wrapper");

        if (isFilterOpen) {
          filterDisplayWrapper[i].style.display = "flex";
          arrowsIcons[i].style.transform = "rotate(180deg)";
          filterWrapper[i].style.height = "315px";
        } else {
          filterDisplayWrapper[i].style.display = "none";
          arrowsIcons[i].style.transform = "rotate(0deg)";
          filterWrapper[i].style.height = "fit-content";
        }
      });
    }
  };

  filtersTagsTemplate = (choosenTag, choosenTags) => {
    if (!choosenTags.includes(choosenTag)) {
      choosenTags.push(choosenTag);
      this.tagsWrapper.style.display = "flex";
      this.tagsWrapper.style.flexWrap = "wrap";
      this.tagsWrapper.innerHTML += `<div class="flex bg-yellow p-4 h-fit rounded-xl w-56 justify-between ${choosenTag}"><p class="text-sm font-normal">${choosenTag}</p>
      <img data-id="${choosenTag}" class="remove-tag-icon cursor-pointer" src="./assets/remove-icon.svg" alt="cross icon"></div>`;
    }
  };

  handleFiltersTags = (recipes) => {
    const filtersTags = document.querySelectorAll(".filters-elements");

    filtersTags.forEach((filterTag) => {
      filterTag.addEventListener("click", (event) => {
        const choosenTag = event.target.innerText;
        this.filtersTagsTemplate(choosenTag, currentChoosenTags);
        const search = new SearchRecipes();
        if (filteredItems.length > 0) {
          search.searchRecipeByTags(filteredItems[0], choosenTag);
        } else {
          search.searchRecipeByTags(recipes, choosenTag);
        }
        this.deleteFiltersTags();
      });
    });
  };

  deleteFiltersTags = () => {
    const deleteTagsIcons = document.querySelectorAll(".remove-tag-icon");

    deleteTagsIcons.forEach((deleteIcon) => {
      deleteIcon.addEventListener("click", () => {
        let displayMatchingRecipes = "";
        const tagDataId = deleteIcon.dataset.id;
        const tagToRemove = document.getElementsByClassName(`${tagDataId}`)[0];

        if (tagToRemove) {
          tagToRemove.remove();
          const choosenInput = searchInput.slice(1, searchInput.length);

          currentChoosenTags.forEach((choosenTag, index) => {
            if (choosenTag === tagDataId) {
              currentChoosenTags.splice(index, 1);
            }
          });

          // si tous les tags ont été supprimés
          if (currentChoosenTags.length === 0) {
            // et que la recherche principale est vide, j'affiche toutes les recettes disponibles
            if (choosenInput.length === 0) {
              filteredItems.splice(0, filteredItems.length);
              this.displayNumberOfRecipes(recipes);
              recipes.forEach(
                (recipe) => (displayMatchingRecipes += this.recipesTemplate.getRecipeCard(recipe))
              );

              this.recipesWrapper.innerHTML = displayMatchingRecipes;
            } else {
              // sinon, j'affiche les recettes qui matchent avec la recherche principale
              const matchingRecipes = [];
              const search = new SearchRecipes();

              const updatedArrayRecipe = search.searchRecipeAlgorithm(
                recipes,
                choosenInput[0],
                matchingRecipes
              );

              filteredItems.push(updatedArrayRecipe);

              if (!updatedArrayRecipe || updatedArrayRecipe.length === 0) {
                return (this.recipesWrapper.innerHTML = `<p>Aucune recette ne contient ${choosenInput[0]}, vous pouvez essayer avec un autre filtre</p>`);
              }

              updatedArrayRecipe.forEach(
                (recipe) => (displayMatchingRecipes += this.recipesTemplate.getRecipeCard(recipe))
              );
              this.filtersTemplate.displayNumberOfRecipes(updatedArrayRecipe);
              this.recipesWrapper.innerHTML = displayMatchingRecipes;
            }
          } else {
            // s'il reste des tags sélectionnés
            const search = new SearchRecipes();
            // et que la recherche principale est vide, affichage des recettes correspondants au dernier tag sélectionné
            if (choosenInput.length === 0) {
              search.searchRecipeByTags(recipes, currentChoosenTags[0]);
              for (let index = 1; index < currentChoosenTags.length; index++) {
                search.searchRecipeByTags(filteredItems[0], currentChoosenTags[index]);
              }
            } else {
              // et si la recherche principale est utilisée, croisement des recherches
              search.searchRecipeByTags(recipes, choosenInput[0]);
            }
          }
        }
      });
    });
  };

  /**
   * Display number of recipes shown
   * @param {[object]} recipes - All recipes
   * @returns Number of recipes display on the page
   */

  displayNumberOfRecipes = (recipes) => {
    this.numberOfRecipes.textContent = `${recipes.length} ${
      recipes.length > 1 ? "recettes" : "recette"
    }`;
  };
}
