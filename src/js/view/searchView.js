import { elements } from "./base";

export const getInput = () => elements.searchInput.value;
export const clearInput = () => (elements.searchInput.value = "");

const renderRecipe = (recipe) => {};

export const renderResult = (recipe) => {
  recipe.forEach(renderRecipe);
};
