export const recipeTemplate = (recipe) => {
  const { name, ingredients, description, image, time } = recipe;
  const picturePath = `./assets/images/${image}`;

  const setRecipeCard = () => {
    const allIngredientsCards = ingredients.map((ingredient) => {
      const ingredientsModel = ingredientsTemplate(ingredient);
      return ingredientsModel.getIngredientsTemplate();
    });

    const article = `<article class="recipe-card-wrapper">
    <img src="${picturePath}" alt="${name}" class="w-image h-image object-cover rounded-t-large">
      <span class="bg-yellow py-1.5 px-4 rounded-2xl text-xs font-normal absolute top-0 right-0 m-6">${time}min</span>
      <div class="pt-8 px-6 w-image">
        <h2 class="font-title font-normal text-lg pb-8">${name}</h2>
        <h3 class="text-xs font-bold text-grey tracking-widest pb-4">RECETTE</h3>
        <p class="pb-8 text-sm font-normal">${description}</p>
        <h3 class="text-xs font-bold text-grey tracking-widest pb-4">INGREDIENTS</h3>
      </div>
      <div class="ingredients-wrapper">
        ${allIngredientsCards.join("")}
      </div>
      </article>
    `;

    return article;
  };
  return { setRecipeCard };
};

const ingredientsTemplate = (ingredients) => {
  const { ingredient, quantity, unit } = ingredients;
  let displayIngredientsQuantity = "";

  const getIngredientsTemplate = () => {
    if (!quantity && !unit) {
      displayIngredientsQuantity = "";
    } else if (quantity && !unit) {
      displayIngredientsQuantity = quantity;
    } else {
      displayIngredientsQuantity = `${quantity} ${unit}`;
    }

    return `<div>
    <p class="text-sm font-medium">${ingredient}</p>
    <p class="text-grey font-normal text-sm">${displayIngredientsQuantity}</p>
    </div>`;
  };
  return { getIngredientsTemplate };
};
