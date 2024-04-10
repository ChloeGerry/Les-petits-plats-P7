import { recipes } from "../../recipes.js";
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

  onChangeUpdateFiltersItems = (arrayOfFiltersItems, searchByItemsFilters = () => {}) => {
    this.inputSearchFiltersCategories.forEach((inputSearchFilterCategory, index) => {
      inputSearchFilterCategory.addEventListener("input", (event) => {
        event.preventDefault();
        const inputValue = event.target.value;
        const choosenCategory = this.filterCategories[index].innerHTML;
        const filteredItems = arrayOfFiltersItems[choosenCategory]["filtersItems"];
        const choosenFilter = document.getElementsByClassName(
          `js-filters-items-wrapper--${choosenCategory}`
        )[0];

        this.filtersTemplate.handleFiltersOpeningAndClosing(event, choosenCategory);

        // if there is a crossed search (main search + tag), display recipes matching
        if (inputValue) {
          const matchingFiltersItems = [];

          filteredItems.find((filteredItem) => {
            const matchingFiltersValue = filteredItem.toLowerCase().match(inputValue.toLowerCase());

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

          this.filtersTemplate.handleFiltersTags(recipes);
        } else {
          // else, search is by tags, display recipes matching selected tags
          this.filteredItems = null;
          const filtersElements = this.filtersTemplate.getFiltersItems(this.recipes);
          choosenFilter.innerHTML = this.filtersTemplate.getFilteredItems(
            filtersElements,
            choosenCategory,
            this.filteredItems
          );
        }
      });
    });
  };
}
