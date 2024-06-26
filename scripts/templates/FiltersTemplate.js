import { recipes } from "../../recipes.js";
import { RecipesTemplate } from "./RecipesTemplate.js";
import { SearchRecipes } from "../utils/SearchRecipes.js";
import {
  currentChoosenTags,
  filteredItems,
  searchInput,
  INGREDIENTS,
  APPLIANCES,
  USTENSILS,
  ingredients,
  appliances,
  ustensils,
} from "../utils/constants.js";

export class FiltersTemplate {
  constructor() {
    this.recipesTemplate = new RecipesTemplate();
    this.filtersSection = document.getElementsByClassName("filters-section")[0];
    this.tagsWrapper = document.getElementsByClassName("tags-wrapper")[0];
    this.numberOfRecipes = document.getElementsByClassName("numbers-recipes")[0];
    this.recipesWrapper = document.getElementsByClassName("recipes-wrapper")[0];
    this.isIngredientsFilterOpen = false;
    this.isAppliancesFilterOpen = false;
    this.isUstensilsFilterOpen = false;
    this.ingredients = [];
    this.appliances = [];
    this.ustensils = [];
    this.recipes = recipes;
  }

  /**
   * Define all filters items
   * @param {[object]} recipes - All recipes
   */

  defineFiltersItems = (recipes) => {
    recipes.forEach((currentRecipe) => {
      currentRecipe.ingredients.forEach((recipe) => {
        if (!this.ingredients.includes(recipe.ingredient)) {
          this.ingredients.push(recipe.ingredient);
        }
      });
      currentRecipe.ustensils.forEach((ustensil) => {
        if (!this.ustensils.includes(ustensil)) {
          this.ustensils.push(ustensil);
        }
      });
    });

    recipes.filter(
      (recipe) =>
        !this.appliances.includes(recipe.appliance) && this.appliances.push(recipe.appliance)
    );
  };

  /**
   * Get all filters elements
   * @returns {{Ingrédients: { ([string]) => {} }, filtersItems: [string]},
   * {Appareils: { ([string]) => {} }, filtersItems: [string]},
   * {Ustensiles: { ([string]) => {} }, filtersItems: [string]}} the object that contains all filters items and a function to display them
   */

  getFiltersElements = () => {
    const filtersElements = {
      Ingrédients: {
        display: this.filtersTemplate(this.ingredients),
        filtersItems: this.ingredients,
      },
      Appareils: {
        display: this.filtersTemplate(this.appliances),
        filtersItems: this.appliances,
      },
      Ustensiles: {
        display: this.filtersTemplate(this.ustensils),
        filtersItems: this.ustensils,
      },
    };
    return filtersElements;
  };

  /**
   * Map filters items
   * @param {[string]} filterElements - All filters items
   * @returns Template for each filter item
   */

  filtersTemplate = (filterElements) =>
    filterElements.map(
      (element) =>
        `<p class="filters-elements text-sm font-normal m-0 cursor-pointer">${element}</p>`
    );

  /**
   * Fill filters values
   * @param {[string]} filterName - Filter name
   * @param {[object]} filtersElements - Filters categories values + items
   * @param {[string]} filteredItems - Items matches filters search
   * @returns Filters wrapper
   */

  filtersWrapperTemplate = (filterName, filtersElements) => {
    this.filtersSection.innerHTML += `<div class="filter-wrapper absolute flex z-10 flex-col bg-white p-4 h-fit rounded-xl w-56 overflow-y-auto top-[690px]">
      <div class="flex justify-between w-48">
        <p class="m-0 filter-category">${filterName}</p>
        <img class="arrow-icon cursor-pointer" src="./assets/arrow.svg" alt="arrow icon">
      </div>
      <div class="filter-search-wrapper flex-col relative hidden">
        <input class="search-input-filter border border-style:solid mb-6 mt-4 p-3" type="search">
        <img class="absolute right-3 top-8" src="./assets/search-grey-icon.svg" alt="search icon">
        <div class="js-filters-items-wrapper--${filterName}">
          ${this.getFilteredItems(filtersElements, filterName)}
        </div>
      </div>
    </div>
   `;
  };

  getFilteredItems = (filtersElements, filterName) => {
    let recipesFilterValues = "";

    // join filters values to the wrapper using the filtersElements array
    if (filtersElements.length > 0) {
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
   * @param {event} event - Filter input event listener
   * handle the opening / closing for the filters
   */

  handleFiltersOpeningAndClosing = (event) => {
    const arrowsIcons = document.getElementsByClassName("arrow-icon");
    const filterWrapperAppliances = document.getElementsByClassName("filter-wrapper")[1];
    filterWrapperAppliances.style.left = "385px";
    const filterWrapperUstensils = document.getElementsByClassName("filter-wrapper")[2];
    filterWrapperUstensils.style.left = "675px";
    const filterCategories = document.getElementsByClassName("filter-category");

    for (let arrowIndex = 0; arrowIndex < arrowsIcons.length; arrowIndex++) {
      arrowsIcons[arrowIndex].addEventListener("click", () => {
        const filterName = filterCategories[arrowIndex].innerHTML;

        switch (arrowIndex) {
          case 0:
            this.isIngredientsFilterOpen = !this.isIngredientsFilterOpen;
            this.handleFilterValuesDisplay(
              this.isIngredientsFilterOpen,
              arrowIndex,
              event,
              filterName
            );
            break;
          case 1:
            this.isAppliancesFilterOpen = !this.isAppliancesFilterOpen;
            this.handleFilterValuesDisplay(
              this.isAppliancesFilterOpen,
              arrowIndex,
              event,
              filterName
            );
            break;
          case 2:
            this.isUstensilsFilterOpen = !this.isUstensilsFilterOpen;
            this.handleFilterValuesDisplay(
              this.isUstensilsFilterOpen,
              arrowIndex,
              event,
              filterName
            );
            break;
          default:
            console.log("Une erreur est survenue");
        }
      });
    }
  };

  handleFilterValuesDisplay = (isFilterOpen, index, event, filterName) => {
    const arrowsIcons = document.getElementsByClassName("arrow-icon");
    const filterDisplayWrapper = document.getElementsByClassName("filter-search-wrapper");
    const filterWrapper = document.getElementsByClassName("filter-wrapper");
    const filtersElements = this.getFiltersElements();
    const choosenFilter = document.getElementsByClassName(
      `js-filters-items-wrapper--${filterName}`
    )[0];

    if (isFilterOpen) {
      filterDisplayWrapper[index].style.display = "flex";
      arrowsIcons[index].style.transform = "rotate(180deg)";
      filterWrapper[index].style.height = "315px";
    } else {
      filterDisplayWrapper[index].style.display = "none";
      arrowsIcons[index].style.transform = "rotate(0deg)";
      filterWrapper[index].style.height = "fit-content";
      if (event) {
        event.target.value = "";
      }
    }

    if (searchInput.length === 0 && currentChoosenTags.length === 0) {
      this.defineFiltersItems(this.recipes);
      choosenFilter.innerHTML = this.getFilteredItems(filtersElements, filterName);
    }

    if (searchInput.length > 0 && currentChoosenTags.length === 0) {
      const choosenTag = null;
      const filtersElements = this.getFiltersElements();
      this.updateFiltersItems(filtersElements, filterName, choosenTag, choosenFilter);
    }

    if (currentChoosenTags.length > 0) {
      const choosenTag = null;
      const filtersElements = this.getFiltersElements();
      this.updateFiltersItems(filtersElements, filterName, choosenTag, choosenFilter);
    }

    this.handleFiltersTags(recipes, filterName);
  };

  choosenTagTemplate = (choosenTag, choosenTags, filterName) => {
    if (!choosenTags.includes(choosenTag)) {
      choosenTags.push(choosenTag);
      this.tagsWrapper.style.display = "flex";
      this.tagsWrapper.style.flexWrap = "wrap";
      this.tagsWrapper.innerHTML += `<div class="flex bg-yellow p-4 h-fit rounded-xl w-56 justify-between ${choosenTag}"><p class="text-sm font-normal">${choosenTag}</p>
      <img data-id="${choosenTag}" data-parent="${filterName}" class="remove-tag-icon cursor-pointer" src="./assets/remove-icon.svg" alt="cross icon"></div>`;
    }
  };

  handleFiltersTags = (recipes, filterName) => {
    const filtersTags = document.querySelectorAll(".filters-elements");
    const filtersElements = this.getFiltersElements();
    const choosenFilter = document.getElementsByClassName(
      `js-filters-items-wrapper--${filterName}`
    )[0];

    filtersTags.forEach((filterTag) => {
      filterTag.addEventListener("click", (event) => {
        const choosenTag = event.target.innerText;
        this.choosenTagTemplate(choosenTag, currentChoosenTags, filterName);
        const search = new SearchRecipes();
        this.defineFiltersItems(this.recipes);

        if (filteredItems.length > 0) {
          search.displayRecipeByTags(filteredItems[0], choosenTag);
          this.updateFiltersItems(filtersElements, filterName, choosenTag, choosenFilter);
        } else {
          search.displayRecipeByTags(recipes, choosenTag);
          this.updateFiltersItems(filtersElements, filterName, choosenTag, choosenFilter);
        }

        this.deleteFiltersTags();
        const arrowsIcons = document.getElementsByClassName("arrow-icon");
        const filterDisplayWrapper = document.getElementsByClassName("filter-search-wrapper");
        const filterWrapper = document.getElementsByClassName("filter-wrapper");

        for (let arrowIndex = 0; arrowIndex < arrowsIcons.length; arrowIndex++) {
          filterDisplayWrapper[arrowIndex].style.display = "none";
          arrowsIcons[arrowIndex].style.transform = "rotate(0deg)";
          filterWrapper[arrowIndex].style.height = "fit-content";

          switch (arrowIndex) {
            case 0:
              this.isIngredientsFilterOpen = !this.isIngredientsFilterOpen;
              break;
            case 1:
              this.isAppliancesFilterOpen = !this.isIngredientsFilterOpen;
              break;
            case 2:
              this.isUstensilsFilterOpen = !this.isIngredientsFilterOpen;
              break;
            default:
              console.log("Une erreur est survenue");
          }
        }
      });
    });
  };

  updateFiltersItems = (filtersElements, filterName, choosenTag, choosenFilter) => {
    const matchingFiltersValues = [];
    const updatedFiltersElements = filtersElements[filterName]["filtersItems"];

    updatedFiltersElements.forEach((updatedFiltersElement) => {
      switch (filterName) {
        case INGREDIENTS:
          filteredItems[0].forEach((filteredItem) => {
            filteredItem.ingredients.filter((recipeIngredient) => {
              const isIngredientsEqual = recipeIngredient.ingredient.match(updatedFiltersElement);

              if (
                isIngredientsEqual &&
                !matchingFiltersValues.includes(recipeIngredient.ingredient) &&
                choosenTag !== recipeIngredient.ingredient
              ) {
                matchingFiltersValues.push(recipeIngredient.ingredient);
              }
            });
          });
          break;
        case APPLIANCES:
          filteredItems[0].forEach((filteredItem) => {
            const isApplianceEqual = filteredItem.appliance.match(updatedFiltersElement);

            if (isApplianceEqual && !matchingFiltersValues.includes(filteredItem.appliance)) {
              matchingFiltersValues.push(filteredItem.appliance);
            }
          });
          break;
        case USTENSILS:
          filteredItems[0].forEach((filteredItem) => {
            filteredItem.ustensils.filter((recipeUstensils) => {
              const isUstensilEqual = recipeUstensils.match(updatedFiltersElement);

              if (isUstensilEqual && !matchingFiltersValues.includes(recipeUstensils)) {
                matchingFiltersValues.push(recipeUstensils);
              }
            });
          });
          break;
        default:
          console.log("Pas de filtre correspondant");
      }
    });

    let currentArray = [];

    switch (filterName) {
      case INGREDIENTS:
        ingredients.splice(0, ingredients.length);
        ingredients.push(matchingFiltersValues);

        this.removeUnmatchingRecipesTags(
          this.ingredients,
          matchingFiltersValues,
          currentArray,
          choosenFilter,
          filterName
        );
        break;
      case APPLIANCES:
        appliances.splice(0, appliances.length);
        appliances.push(matchingFiltersValues);

        this.removeUnmatchingRecipesTags(
          this.appliances,
          matchingFiltersValues,
          currentArray,
          choosenFilter,
          filterName
        );
        break;
      case USTENSILS:
        ustensils.splice(0, ustensils.length);
        ustensils.push(matchingFiltersValues);

        this.removeUnmatchingRecipesTags(
          this.ustensils,
          matchingFiltersValues,
          currentArray,
          choosenFilter,
          filterName
        );
        break;
      default:
        console.log("Pas de tableau correspondant");
    }
  };

  removeUnmatchingRecipesTags = (
    filtersElements,
    matchingFiltersValues,
    currentArray,
    choosenFilter,
    filterName
  ) => {
    filtersElements.filter((element) => {
      if (matchingFiltersValues.includes(element) && !currentArray.includes(element)) {
        currentArray.push(element);
      }
    });

    if (filtersElements === this.ingredients) {
      this.ingredients = currentArray;
    } else if (filtersElements === this.appliances) {
      this.appliances = currentArray;
    } else if (filtersElements === this.ustensils) {
      this.ustensils = currentArray;
    }

    const currentfiltersElements = this.getFiltersElements();
    choosenFilter.innerHTML = this.getFilteredItems(currentfiltersElements, filterName);
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

          this.defineFiltersItems(this.recipes);
          const filtersElements = this.getFiltersElements();
          const tagParent = deleteIcon.dataset.parent;
          const choosenFilter = document.getElementsByClassName(
            `js-filters-items-wrapper--${tagParent}`
          )[0];

          // if all tags have been delated
          if (currentChoosenTags.length === 0) {
            // & the main search is empty, I display all availaible recipes
            if (choosenInput.length === 0) {
              filteredItems.splice(0, filteredItems.length);
              this.displayNumberOfRecipes(recipes);
              recipes.forEach(
                (recipe) =>
                  (displayMatchingRecipes += this.recipesTemplate.recipeCardTemplate(recipe))
              );

              this.recipesWrapper.innerHTML = displayMatchingRecipes;
              choosenFilter.innerHTML = this.getFilteredItems(filtersElements, tagParent);
            } else {
              // else, I display recipes matching main search or an error message
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
                (recipe) =>
                  (displayMatchingRecipes += this.recipesTemplate.recipeCardTemplate(recipe))
              );
              this.displayNumberOfRecipes(updatedArrayRecipe);
              this.recipesWrapper.innerHTML = displayMatchingRecipes;
            }
          } else {
            // if there's still selected tags
            const search = new SearchRecipes();
            // & main search is empty, I display recipes matching remaining choosen tags
            if (choosenInput.length === 0) {
              search.displayRecipeByTags(recipes, currentChoosenTags[0]);
              for (let index = 1; index < currentChoosenTags.length; index++) {
                search.displayRecipeByTags(filteredItems[0], currentChoosenTags[index]);
              }
              const filtersElements = this.getFiltersElements();
              this.updateFiltersItems(
                filtersElements,
                tagParent,
                currentChoosenTags[0],
                choosenFilter
              );
            } else {
              // & main search is used, I cross searches
              search.displayRecipeByTags(recipes, choosenInput[0]);
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
