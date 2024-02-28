export class FilterTemplateClass {
  constructor() {
    this.filtersSection = document.getElementsByClassName("filters-section")[0];
    this.filtersWrapper = document.getElementsByClassName("filters-wrappers")[0];
  }

  filtersTemplate = (filterName, recipes) => {
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

    let recipesFilterValues = "";

    const filtersElements = {
      Ingrédients: {
        display: displayFiltersValues(ingredients),
      },
      Appareils: {
        display: displayFiltersValues(appliances),
      },
      Ustensiles: {
        display: displayFiltersValues(ustensils),
      },
    };

    // join filters values to the wrapper using the filtersElements array
    recipesFilterValues = `<div class="flex flex-col gap-3">${filtersElements[filterName][
      "display"
    ].join("")}</div>`;

    this.filtersSection.innerHTML += `<div class="filter-wrapper flex z-10 flex-col bg-white p-4 h-fit rounded-xl w-56 overflow-y-hidden">
      <div class="flex justify-between w-48">
        ${filterName}
        <img class="arrow-icon cursor-pointer" src="./assets/arrow.svg" alt="arrow icon">
      </div>
      <div class="filter-search-wrapper flex-col relative hidden">
        <img class="absolute left-3 top-9" src="./assets/line-icon.svg" alt="line icon">
        <input class="border border-style:solid mb-6 mt-4 py-3" type="search">
        <img class="absolute right-3 mr-3 top-9" src="./assets/search-grey-icon.svg" alt="search icon">
        ${recipesFilterValues}
      </div>
    </div>
   `;
  };

  handleFilterValuesDisplay = () => {
    const arrowsIcons = document.getElementsByClassName("arrow-icon");
    let isFilterOpen = false;

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

  filteredRecipes = (recipes) => {
    this.filtersWrapper.innerHTML += `<p class="font-title font-normal text-xl text-right">${recipes.length} recettes</p>`;
  };
}
