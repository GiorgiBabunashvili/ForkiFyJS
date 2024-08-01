import * as searchView from "./view/searchView";
import { clearLoader, elements, renderLoader } from "./view/base";
import Search from "./modal/search";

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
const controlRecipe = () => {
  const id = window.location.hash.replace("#", "");
};

window.addEventListener("hashchange", controlRecipe);
// `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
