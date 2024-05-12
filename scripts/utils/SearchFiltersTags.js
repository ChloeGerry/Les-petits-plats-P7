import { recipes } from "../../recipes.js";
import {
  ingredients,
  appliances,
  ustensils,
  INGREDIENTS,
  APPLIANCES,
  USTENSILS,
  regex,
} from "../utils/constants.js";
import { FiltersTemplate } from "../templates/FiltersTemplate.js";

export class SearchFiltersTags {
  constructor() {
    this.recipes = recipes;
    this.filtersTemplate = new FiltersTemplate();
    this.inputSearchFiltersCategories = document.querySelectorAll(".search-input-filter");
    this.filterCategories = document.getElementsByClassName("filter-category");
    this.filtersTags = document.querySelectorAll(".filters-elements");
    this.regex = regex;
  }

  /**
   * Display updated filter items
   * @param {[string]} filterItems - All filters items
   * @param {string} inputValue - Input value
   * @param {[string]} filterItemsMatchingInputValue - All filters items matching the input
   * @param {() => {}} searchItemsInFilter - Execute the search in filters items
   * @param {string} filterName - Filter name
   * @param {string} filterItemsWrapperDOMElement - Filter items wrapper DOM element
   */

  displayUptatedFilterItems = (
    filterItems,
    inputValue,
    filterItemsMatchingInputValue,
    searchItemsInFilter = () => {},
    filterName,
    filterItemsWrapperDOMElement
  ) => {
    filterItems[0].find((filterItem) => {
      const filterItemIsEqualInputValue = filterItem.toLowerCase().match(inputValue.toLowerCase());

      if (filterItemIsEqualInputValue && !filterItemsMatchingInputValue.includes(filterItem)) {
        filterItemsMatchingInputValue.push(filterItem);
      }
    });

    if (filterItemsMatchingInputValue.length > 0) {
      searchItemsInFilter(filterItemsMatchingInputValue, filterName);

      filterItemsWrapperDOMElement.innerHTML = this.filtersTemplate.getFilteredItems(
        filterItemsMatchingInputValue,
        filterName
      );

      this.filtersTemplate.handleFiltersTags(this.recipes, filterName);
    }
  };

  /**
   * Update filters items
   * @param {{object}} filtersItemsAndDOMElements - Filter items wrapper DOM element
   * @param {() => {}} searchItemsInFilter - Execute the search in filters items
   */

  onChangeUpdateFiltersItems = (filtersItemsAndDOMElements, searchItemsInFilter = () => {}) => {
    this.inputSearchFiltersCategories.forEach((inputSearchFilterCategory, index) => {
      inputSearchFilterCategory.addEventListener("input", (event) => {
        event.preventDefault();
        const inputValue = event.target.value;
        const filterName = this.filterCategories[index].innerHTML;
        const filterItemsWrapperDOMElement = document.getElementsByClassName(
          `js-filters-items-wrapper--${filterName}`
        )[0];

        this.filtersTemplate.handleFiltersOpeningAndClosing(event);

        // if the search is by filling the filter input
        if (inputValue && this.regex.test(inputValue)) {
          const filterItemsMatchingInputValue = [];

          if (ingredients.length > 0 || appliances.length > 0 || ustensils.length > 0) {
            if (filterName === INGREDIENTS) {
              this.displayUptatedFilterItems(
                ingredients,
                inputValue,
                filterItemsMatchingInputValue,
                (searchItemsInFilter = () => {}),
                filterName,
                filterItemsWrapperDOMElement
              );
            } else if (filterName === APPLIANCES) {
              this.displayUptatedFilterItems(
                appliances,
                inputValue,
                filterItemsMatchingInputValue,
                (searchItemsInFilter = () => {}),
                filterName,
                filterItemsWrapperDOMElement
              );
            } else if (filterName === USTENSILS) {
              this.displayUptatedFilterItems(
                ustensils,
                inputValue,
                filterItemsMatchingInputValue,
                (searchItemsInFilter = () => {}),
                filterName,
                filterItemsWrapperDOMElement
              );
            }
          } else {
            const filterItems = filtersItemsAndDOMElements[filterName]["filtersItems"];

            filterItems.find((filterItem) => {
              const filterItemIsEqualInputValue = filterItem
                .toLowerCase()
                .match(inputValue.toLowerCase());

              if (
                filterItemIsEqualInputValue &&
                !filterItemsMatchingInputValue.includes(filterItem)
              ) {
                filterItemsMatchingInputValue.push(filterItem);
              }
            });

            if (filterItemsMatchingInputValue.length > 0) {
              searchItemsInFilter(filterItemsMatchingInputValue, filterName);

              filterItemsWrapperDOMElement.innerHTML = this.filtersTemplate.getFilteredItems(
                filterItemsMatchingInputValue,
                filterName
              );

              this.filtersTemplate.handleFiltersTags(this.recipes, filterName);
            }
          }
        } else {
          // else, search is by tags without search, display recipes matching selected tags
          this.filtersTemplate.defineFiltersItems(this.recipes);
          const filtersElements = this.filtersTemplate.getFiltersElements();

          filterItemsWrapperDOMElement.innerHTML = this.filtersTemplate.getFilteredItems(
            filtersElements,
            filterName
          );

          this.filtersTemplate.handleFiltersTags(this.recipes, filterName);
        }
      });
    });
  };
}
