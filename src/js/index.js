import * as searchView from "./view/searchView";
import { elements } from "./view/base";

// Search controler
const controlSearch = () => {
  const query = searchView.getInput();
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
