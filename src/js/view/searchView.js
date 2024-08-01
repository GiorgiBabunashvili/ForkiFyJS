import { elements } from "./base";

export const getInput = () => elements.searchInput.value;
export const clearInput = () => (elements.searchInput.value = "");
export const clearResult = () => {
  elements.searchResultList.innerHTML = "";
};

const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    return `${newTitle.join(" ")}...`;
  }
  return title;
};

const renderRecipe = (recipe) => {
  const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(
                      recipe.title
                    )}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

const renderButton = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage)

  if(){
    //Only next button
  }else if () {
    //Both buttons
  }else if () {
    //Only brev button
  }
}

export const renderResult = (recipe, page = 1, resPerPage = 5) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipe.slice(start, end).forEach(renderRecipe);

  //render pagiation buttons
  renderButton(page, recipes.length, resPerPage);
};
