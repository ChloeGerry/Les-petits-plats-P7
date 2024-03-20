import { FiltersTemplate } from "../templates/FiltersTemplate.js";
import { recipes } from "../../recipes.js";

export class SearchFiltersTags {
  constructor() {
    this.filtersTemplate = new FiltersTemplate();
    this.recipes = recipes;
    this.inputSearchFilterCategory = document.getElementsByClassName("search-input-filter");
    this.filterCategories = document.getElementsByClassName("filter-category");
    this.filteredItems = null;
  }

  /**
   * method that search tags in filters
   * @param {{object}} arrayOfFiltersItems - list of all filters items
   * @returns {[string]} the list of all matching values with the filter search input
   */

  onChangeUpdateFiltersItems = (arrayOfFiltersItems, searchByItemsFilters = () => {}) => {
    for (let i = 0; i < this.inputSearchFilterCategory.length; i++) {
      this.inputSearchFilterCategory[i].addEventListener("input", (event) => {
        event.preventDefault();
        const inputValue = event.target.value;
        const choosenCategory = this.filterCategories[i].innerHTML;
        const filteredItems = arrayOfFiltersItems[choosenCategory]["filtersItems"];

        // console.log("filteredItems", filteredItems);

        const choosenFilter = document.getElementsByClassName(
          `js-filters-items-wrapper--${choosenCategory}`
        )[0];

        if (inputValue) {
          const matchingFiltersItems = [];
          for (let j = 0; j < filteredItems.length; j++) {
            const matchingFiltersValue = filteredItems[j]
              .toLowerCase()
              .match(inputValue.toLowerCase());

            if (matchingFiltersValue && !matchingFiltersItems.includes(filteredItems[j])) {
              matchingFiltersItems.push(filteredItems[j]);
              if (matchingFiltersValue && !matchingFiltersItems.includes(filteredItems[j])) {
                matchingFiltersItems.push(filteredItems[j]);
              }
            }
          }
          this.filteredItems = matchingFiltersItems;
          searchByItemsFilters(matchingFiltersItems, choosenCategory);
          choosenFilter.innerHTML = this.filtersTemplate.getFilteredItems(
            matchingFiltersItems,
            choosenCategory,
            this.filteredItems
          );
        } else {
          this.filteredItems = null;
          const filtersElements = this.filtersTemplate.getFiltersItems(this.recipes);
          choosenFilter.innerHTML = this.filtersTemplate.getFilteredItems(
            filtersElements,
            choosenCategory,
            this.filteredItems
          );
        }
      });
    }
  };
}
