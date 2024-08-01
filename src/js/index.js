import * as searchView from "./view/searchView";
import { clearLoader, elements, renderLoader } from "./view/base";
import Search from "./modal/search";
import Recipe from "./modal/recipe";

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
    renderLoader(elements.recipe);
    state.recipe = new Recipe(id);

    try {
      await state.recipe.getRecipe();
      clearLoader();
    } catch (error) {
      alert("Error recipe");
    }
  }
};

window.addEventListener("hashchange", controlRecipe);
