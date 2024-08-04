export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchResultList: document.querySelector(".results__list"),
  searchResultPage: document.querySelector(".results__pages"),
  recipe: document.querySelector(".recipe"),
  shoppingList: document.querySelector(".shopping__list"),
  likesList: document.querySelector(".likes__list"),
};

export const renderLoader = (parent) => {
  const loader = `
         <div class='loader'>
            <svg>
                <use href="img/icons.svg#icon-cw"</use>
            </svg>
         </div>
    `;

  parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(".loader");
  loader && loader.parentElement.removeChild(loader);
};
