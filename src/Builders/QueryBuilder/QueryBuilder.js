import Query from "./Query";
import Builder from "../Builder";

export default class QueryBuilder extends Builder {
  constructor({localizationBuilder} = {}) {
    super();

    this.localizationBuilder = localizationBuilder;
  }

  setOptions = (options) => {
    this.options = options;
  };

  clearOptions = () => this.options = null;

  build = (url) => {
    url = this.options && this.options.localization ? this.localize(url) : url;

    return url;
  };

  pass(url, models) {
    Object.keys(models).forEach(model => url = url.replace(`{${model}}`, models[model]));

    return url;
  }

  parseQuery(key, queryObj) {
    return `${key}=${queryObj[key]}`;
  }

  insert = (url, queries) => {
    const isNewQuery = url.indexOf('?') === -1;

    const insertAdditionQuery = (query) => {
      url += this.parseQuery(query, queries)
    };

    if (isNewQuery) {
      url += '?';

      Object.keys(queries).forEach((query, index) => {
        index !== 0 ? url += '&' : url += '';

        insertAdditionQuery(query);
      })
    } else {
      Object.keys(queries).forEach((query, index) => {
        url += '&';

        insertAdditionQuery(query);
      })
    }

    return url;
  }

  localize = (url) => {
    return this.localizationBuilder.localize(url);
  };

  make = ({ url, options }) => {
    this.setOptions(options);

    url = this.build(url);

    this.clearOptions();

    return new Query(url);
  }
}