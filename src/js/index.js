import { elements } from "./view/base";

// Search controler
const controlSearch = () => {};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

// `http://forkify-api.herokuapp.com/api/search?q=${this.query}`
