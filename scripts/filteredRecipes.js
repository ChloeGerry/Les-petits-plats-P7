export const filteredRecipes = (recipes) => {
  const filtersWrappers = document.getElementsByClassName("filters-wrappers")[0];
  filtersWrappers.innerHTML = `<p class="font-title font-normal text-xl text-right">${recipes.length} recettes</p>`;
};

export const filtesTemplate = (recipes) => {};
