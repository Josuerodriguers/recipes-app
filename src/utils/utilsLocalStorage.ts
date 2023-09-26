export const getFromLocalStorage = (key: string) => JSON
  .parse(localStorage.getItem(key) as string);

export const isInProgress = (mealOrDrink: string, recipeID: string | undefined) => {
  const { meals, drinks } = getFromLocalStorage('inProgressRecipes')
    || { meals: {}, drinks: {} };
  const recipesInProgress = mealOrDrink === 'meals' ? meals : drinks;
  return recipesInProgress[recipeID as string];
};

export const isFavorite = (recipeID: string | undefined) => {
  const favorites = getFromLocalStorage('favoriteRecipes') || [];
  return favorites.find((recipe: any) => recipe.id === recipeID) !== undefined;
};
