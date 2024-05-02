import { recipes } from "../../recipes.js";
import {
  ingredients,
  appliances,
  ustensils,
  INGREDIENTS,
  APPLIANCES,
  USTENSILS,
} from "../utils/constants.js";
import { FiltersTemplate } from "../templates/FiltersTemplate.js";

export class SearchFiltersTags {
  constructor() {
    this.filtersTemplate = new FiltersTemplate();
    this.recipes = recipes;
    this.inputSearchFiltersCategories = document.querySelectorAll(".search-input-filter");
    this.filterCategories = document.getElementsByClassName("filter-category");
    this.filtersTags = document.querySelectorAll(".filters-elements");
    this.filteredItems = null;
  }

  /**
   * Search tags in filters
   * @param {{object}} arrayOfFiltersItems - All filters items
   * @param {() => {}} searchByItemsFilters - Execute search by filters item
   * @returns {[string]} Matching recipes with filters tags
   */

  updateFiltersValues = (
    filtersValues,
    inputValue,
    matchingFiltersItems,
    searchByItemsFilters = () => {},
    choosenCategory,
    choosenFilter
  ) => {
    filtersValues[0].find((filtersValue) => {
      const matchingFiltersValue = filtersValue.toLowerCase().match(inputValue.toLowerCase());

      if (matchingFiltersValue && !matchingFiltersItems.includes(filtersValue)) {
        matchingFiltersItems.push(filtersValue);
      }
    });

    this.filteredItems = matchingFiltersItems;
    searchByItemsFilters(matchingFiltersItems, choosenCategory);

    choosenFilter.innerHTML = this.filtersTemplate.getFilteredItems(
      matchingFiltersItems,
      choosenCategory,
      this.filteredItems
    );

    this.filtersTemplate.handleFiltersTags(recipes, choosenCategory);
  };

  onChangeUpdateFiltersItems = (arrayOfFiltersItems, searchByItemsFilters = () => {}) => {
    this.inputSearchFiltersCategories.forEach((inputSearchFilterCategory, index) => {
      inputSearchFilterCategory.addEventListener("input", (event) => {
        event.preventDefault();
        const inputValue = event.target.value;
        const choosenCategory = this.filterCategories[index].innerHTML;
        const choosenFilter = document.getElementsByClassName(
          `js-filters-items-wrapper--${choosenCategory}`
        )[0];

        this.filtersTemplate.handleFiltersOpeningAndClosing(event);

        // if the search is by filling the filter input
        if (inputValue) {
          const matchingFiltersItems = [];

          if (ingredients.length > 0 || appliances.length > 0 || ustensils.length > 0) {
            if (choosenCategory === INGREDIENTS) {
              this.updateFiltersValues(
                ingredients,
                inputValue,
                matchingFiltersItems,
                (searchByItemsFilters = () => {}),
                choosenCategory,
                choosenFilter
              );
            } else if (choosenCategory === APPLIANCES) {
              this.updateFiltersValues(
                appliances,
                inputValue,
                matchingFiltersItems,
                (searchByItemsFilters = () => {}),
                choosenCategory,
                choosenFilter
              );
            } else if (choosenCategory === USTENSILS) {
              this.updateFiltersValues(
                ustensils,
                inputValue,
                matchingFiltersItems,
                (searchByItemsFilters = () => {}),
                choosenCategory,
                choosenFilter
              );
            }
          } else {
            const filteredItems = arrayOfFiltersItems[choosenCategory]["filtersItems"];

            filteredItems.find((filteredItem) => {
              const matchingFiltersValue = filteredItem
                .toLowerCase()
                .match(inputValue.toLowerCase());

              if (matchingFiltersValue && !matchingFiltersItems.includes(filteredItem)) {
                matchingFiltersItems.push(filteredItem);
              }
            });

            this.filteredItems = matchingFiltersItems;
            searchByItemsFilters(matchingFiltersItems, choosenCategory);

            choosenFilter.innerHTML = this.filtersTemplate.getFilteredItems(
              matchingFiltersItems,
              choosenCategory,
              this.filteredItems
            );

            this.filtersTemplate.handleFiltersTags(recipes, choosenCategory);
          }
        } else {
          // else, search is by tags without search, display recipes matching selected tags
          this.filteredItems = null;
          const filtersElements = this.filtersTemplate.getFiltersElements();
          choosenFilter.innerHTML = this.filtersTemplate.getFilteredItems(
            filtersElements,
            choosenCategory,
            this.filteredItems
          );

          this.filtersTemplate.handleFiltersTags(recipes, choosenCategory);
        }
      });
    });
  };
}
