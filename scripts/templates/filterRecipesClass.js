export class FilterTemplateClass {
  constructor() {
    this.filtersSection = document.getElementsByClassName("filters-section")[0];
    this.numberOfRecipes = document.getElementsByClassName("numbers-recipes")[0];
    this.inputSearchFilterCategory = document.getElementsByClassName("search-input-filter");
    this.filterCategories = document.getElementsByClassName("filter-category");
  }

  /**
   * method to get all the filters items
   * @param {[object]} recipes - list of all recipes
   * @returns the object that contains all filters items and can display them
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

    // create a function to map filters values
    const displayFiltersValues = (filterElements) =>
      filterElements.map((element) => `<p class="text-sm font-normal m-0">${element}</p>`);

    const filtersElements = {
      Ingrédients: {
        display: displayFiltersValues(ingredients),
        filtersItems: ingredients,
      },
      Appareils: {
        display: displayFiltersValues(appliances),
        filtersItems: appliances,
      },
      Ustensiles: {
        display: displayFiltersValues(ustensils),
        filtersItems: ustensils,
      },
    };
    return filtersElements;
  };

  /**
   * method to fill the filters values
   * @param {[string]} filterName - list of all filters categories
   * @param {[object]} recipes - list of all recipes
   * @returns the template for a filter
   */

  filtersTemplate = (filterName, recipes) => {
    let recipesFilterValues = "";

    const filtersElements = this.getFiltersItems(recipes);

    // join filters values to the wrapper using the filtersElements array
    recipesFilterValues = `<div class="flex flex-col gap-3">${filtersElements[filterName][
      "display"
    ].join("")}</div>`;

    this.filtersSection.innerHTML += `<div class="filter-wrapper absolute flex z-10 flex-col bg-white p-4 h-fit rounded-xl w-56 overflow-y-hidden top-[690px]">
      <div class="flex justify-between w-48">
        <p class="m-0 filter-category">${filterName}</p>
        <img class="arrow-icon cursor-pointer" src="./assets/arrow.svg" alt="arrow icon">
      </div>
      <div class="filter-search-wrapper flex-col relative hidden">
        <input class="search-input-filter border border-style:solid mb-6 mt-4 p-3" type="search">
        <img class="absolute right-3 top-8" src="./assets/search-grey-icon.svg" alt="search icon">
        ${recipesFilterValues}
      </div>
    </div>
   `;
  };

  /**
   * method to display the filters values
   * @returns the opening / closing for the filters
   */

  handleFilterValuesDisplay = () => {
    const arrowsIcons = document.getElementsByClassName("arrow-icon");
    let isFilterOpen = false;

    const filterWrapperAppliances = document.getElementsByClassName("filter-wrapper")[1];
    filterWrapperAppliances.style.left = "370px";
    const filterWrapperUstensils = document.getElementsByClassName("filter-wrapper")[2];
    filterWrapperUstensils.style.left = "640px";

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

  filterItems = () => {
    this.filtersSection.innerHTML += `<div class="flex bg-yellow p-4 h-fit rounded-xl w-56 justify-between">
    <p class="text-sm font-normal">Coco</p>
    <img src="./assets/remove-icon.svg" alt="cross icon">
  </div>`;
  };

  /**
   * method to display the numbers of recipes shown
   * @param {[object]} recipes - list of all recipes
   * @returns the number of recipes display on the page
   */

  displayNumberOfRecipes = (recipes) => {
    this.numberOfRecipes.textContent = `${recipes.length} recettes`;
  };

  /**
   * method that contains the filter search algorithm
   * @param {{object}} arrayOfFiltersItems - list of all filters items
   * @returns the list of all matching filters values with the filter search input
   */

  searchByItemsFilters = (arrayOfFiltersItems) => {
    const matchingFiltersItems = [];

    // add algorith for filter search

    return matchingFiltersItems;
  };
}
