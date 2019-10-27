import Builder from "../Builder";
import QueryBuilder from "../QueryBuilder/QueryBuilder";

export default class LocalizationBuilder extends Builder {
  constructor() {
    super();

    this.queryBuilder = new QueryBuilder();
  }

  localize(url) {
    const localization = localStorage.getItem('locale');

    return this.queryBuilder.insert(url, { 'locale': localization });
  };
}