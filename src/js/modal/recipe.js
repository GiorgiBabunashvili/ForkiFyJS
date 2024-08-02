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

  parseIngredients() {
    const newIngredients = this.ingredients.map((el) => {
      const unitLong = [
        "tablespoons",
        "tablespoon",
        "ounces",
        "ounce",
        "teaspoons",
        "teaspoon",
        "cups",
      ];
      const unitShorts = ["tbsp", "tbsp", "oz", "oz", "tsp", "tsp", "cup"];
      const units = [...unitShorts, "kg", "g", "pound"];

      //1. uniform units
      let ingredient = el.toLowerCase();
      unitLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitShorts[i]);
      });
    });

    this.ingredients = newIngredients;
  }
}

// const unitLong = [
//   "tablespoons",
//   "tablespoon",
//   "ounces",
//   "ounce",
//   "teaspoons",
//   "teaspoon",
//   "cups",
// ];
// const unitShorts = ["tbsp", "tbsp", "oz", "oz", "tsp", "tsp", "cup"];
// const units = [...unitShorts, "kg", "g", "pound"]
