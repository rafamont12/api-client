import Builder from "../Builder";
import QueryBuilder from "../QueryBuilder/QueryBuilder";

export default class PaginationBuilder extends Builder {
  constructor() {
    super();

    this.queryBuilder = new QueryBuilder();
  }

  paginate(url, pagination) {
    return this.queryBuilder.insert(url, pagination);
  }
}