import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    this.result = await axios(
      `http://forkify-api.herokuapp.com/api/search?q=${this.query}`
    );
  }
}
