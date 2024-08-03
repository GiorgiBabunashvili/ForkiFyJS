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

      //2. remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      //3. parse ingredients into unit count unit ingredient
      const arrIng = ingredient.split(" ");
      const unitIndex = arrIng.findIndex((value) => units.includes(value));

      let objIng;
      if (unitIndex > -1) {
        const arrCount = arrIng.slice(0, unitIndex);
        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0]);
        } else {
          count = eval(arrCount.json("+"));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).json(" "),
        };
      } else if (parseInt(arrIng[0], 10)) {
        objIng = {
          count: +arrIng[0],
          unit: "",
          ingredient: arrIng.slice(1).join(" "),
        };
      } else if (unitIndex === -1) {
        objIng = {
          count: 1,
          unit: "",
          ingredient,
        };
      }

      return objIng;
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
