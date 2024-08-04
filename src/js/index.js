import * as searchView from "./view/searchView";
import * as recipeView from "./view/recipeView";
import * as listView from "./view/listView";
import { clearLoader, elements, renderLoader } from "./view/base";
import Search from "./modal/search";
import Recipe from "./modal/recipe";
import List from "./modal/list";

const state = {};
window.state = state;

// Search controler
const controlSearch = async () => {
  const query = searchView.getInput();

  if (query) {
    state.search = new Search(query);
    searchView.clearInput();
    searchView.clearResult();
    renderLoader(elements.searchResultList);

    try {
      await state.search.getResults();
      clearLoader();
      searchView.renderResult(state.search.result);
    } catch (error) {
      alert("Error Search");
    }
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchResultPage.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const gotoPage = +btn.dataset.goto;
    searchView.clearResult();
    searchView.renderResult(state.search.result, gotoPage);
  }
});

//Control recipe
const controlRecipe = async () => {
  const id = window.location.hash.replace("#", "");

  if (id) {
    recipeView.clearRecipe();
    renderLoader(elements.recipe);
    state.search && searchView.highlightSelected(id);

    state.recipe = new Recipe(id);

    try {
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      state.recipe.calcTime();
      state.recipe.calcServings();

      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      alert("Error recipe");
    }
  }
};

window.addEventListener("hashchange", controlRecipe);
window.addEventListener("load", controlRecipe);

//SHOPPING LIST Controler
const controllerList = () => {
  state.list = new List();

  state.recipe.ingredients.forEach((ing) => {
    const item = state.list.addItems(ing.count, ing.unit, ing.ingredient);
    listView.renderItem(item);
  });
};

elements.shoppingList.addEventListener("click", (e) => {
  const id = e.target.closest(".shopping__item").dataset.itemid;

  if (e.target.matches(".shopping__delete, .shopping__delete *")) {
    //delete
    state.list.deleteItem(id);
    //delete from ui
    listView.deleteItem(id);
  } else if (
    e.target.matches(".shopping__count-value, .shopping__count-value *")
  ) {
    //update count
    const val = +e.target.value;
    state.list.updateCount(id, val);
  }
});

// LIKE controler
const controllerLike = () => {};

// Heandlig recipe btns click (decrease, increase, like, addShopping)
elements.recipe.addEventListener("click", (e) => {
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-decrease, .btn-increase *")) {
    state.recipe.updateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    controllerLike();
  } else if (e.target.matches(".add-shopping, .add-shopping *")) {
    controllerList();
  }
});
