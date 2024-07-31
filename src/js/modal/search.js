export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const result = await fetch(
        `http://forkify-api.herokuapp.com/api/search?q=${this.query}`
      );
      const resData = await result.json();
      this.result = resData.recipes;
    } catch (error) {
      alert(error);
    }
  }
}
