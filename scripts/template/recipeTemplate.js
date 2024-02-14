export const recipeTemplate = (recipe) => {
  const { name, ingredients, description, image, time } = recipe;
  const picturePath = `./assets/images/${image}`;

  const setRecipeCard = () => {
    const article = document.createElement("article");
    article.classList.add("recipe-card-wrapper");
    article.innerHTML = `<img src="${picturePath}" alt="${name}" class="w-image h-image object-cover rounded-t-large">
      <span class="bg-yellow py-1.5 px-4 rounded-2xl text-xs font-normal absolute top-0 right-0 m-6">${time}min</span>
      <div class="pt-8 px-6 w-image">
        <h2 class="font-title font-normal text-lg pb-8">${name}</h2>
        <h3 class="text-xs font-bold text-grey tracking-widest pb-4">RECETTE</h3>
        <p class="pb-8 text-sm font-normal">${description}</p>
        <h3 class="text-xs font-bold text-grey tracking-widest pb-4">INGREDIENTS</h3>
      </div>
    `;

    const ingredientsWrapper = document.createElement("div");
    ingredientsWrapper.classList.add("ingredients-wrapper");
    article.appendChild(ingredientsWrapper);

    ingredients.map((ingredient) => {
      const ingredientsModel = ingredientsTemplate(ingredient);
      const ingredientsCard = ingredientsModel.setIngredientsTemplate();
      ingredientsWrapper.appendChild(ingredientsCard);
    });

    return article;
  };
  return { setRecipeCard };
};

const ingredientsTemplate = (ingredients) => {
  const { ingredient, quantity, unit } = ingredients;
  const ingredientWrapper = document.createElement("div");
  let displayIngredientsQuantity = "";

  const setIngredientsTemplate = () => {
    if (!quantity && !unit) {
      displayIngredientsQuantity = "";
    } else if (quantity && !unit) {
      displayIngredientsQuantity = quantity;
    } else {
      displayIngredientsQuantity = `${quantity} ${unit}`;
    }

    ingredientWrapper.innerHTML = `<p class="text-sm font-medium">${ingredient}</p><p class="text-grey font-normal text-sm">${displayIngredientsQuantity}</p>`;

    return ingredientWrapper;
  };
  return { setIngredientsTemplate };
};
