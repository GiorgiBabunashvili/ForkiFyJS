import * as searchView from "./view/searchView";
import { elements } from "./view/base";
import Search from "./modal/search";

const state = {};
window.state = state;

// Search controler
const controlSearch = async () => {
  const query = searchView.getInput();

  if (query) {
    state.search = new Search(query);

    try {
      await state.search.getResults();
    } catch (error) {
      alert("Error Search");
    }
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
