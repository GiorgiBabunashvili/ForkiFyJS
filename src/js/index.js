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
