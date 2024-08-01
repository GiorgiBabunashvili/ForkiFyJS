export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      const resData = await res.json();

      this.title = resData.recipe.title;
      this.author = resData.recipe.publisher;
      this.img = resData.recipe.image_url;
      this.url = resData.recipe.source_url;
      this.ingredients = resData.recipe.ingredients;
    } catch (error) {
      alert(error);
    }
  }

  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }
}
