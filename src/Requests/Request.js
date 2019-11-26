import QueryBuilder from "../Builders/QueryBuilder/QueryBuilder";
import LocalizationBuilder from "../Builders/LocalizationBuilder/LocalizationBuilder";
import PaginationBuilder from "../Builders/PaginationBuilder/PaginationBuilder";

export default class Request {
  constructor({ server_url, url, options, tokenModule }) {
    this.server_url   = server_url;
    this.queryBuilder = new QueryBuilder({ localizationBuilder: new LocalizationBuilder() });
    this.response     = null;
    this.headers      = options && options.headers || {};
    this.auth         = options && options.auth;
    this.tokenModule  = tokenModule;
    this.pagination   = new PaginationBuilder();

    this.url = this.formatUrl(url, options);
  }

  handleResponse(response) {
    return response;
  }

  request = ({ method, options, headers}) => { };
  get = (options) => new Promise(resolve => {
    if (options) {
      this.url = this.queryBuilder.pass(this.url, options);

      if (options.min) {
        this.url = this.queryBuilder.insert(this.url, { min: true });
      }
    }

    if (options && options.pagination) {
      this.url = this.pagination.paginate(this.url, options.pagination);
    }

    if (options && options.query) {
      this.url = this.queryBuilder.insert(this.url, options.query);
    }

    if (this.auth) {
      this.headers.Authorization = this.tokenModule.getToken();
    }

    return this.request({method: 'GET', headers: this.headers}).then(response => resolve(this.handleResponse(response)))
  });

  post = ({body, ...options} = {}) => new Promise(resolve => {
    if (options) {
      this.url = this.queryBuilder.pass(this.url, options);
    }

    console.log(body);

    if (this.auth) {
      this.headers.Authorization = this.tokenModule.getToken();
    }

    return this.request({method: 'POST', headers: this.headers, body: body}).then(response => resolve(this.handleResponse(response)))
  });

  formatUrl = (url, options) => this.queryBuilder.make({ url, options }).prefix(`${this.server_url}/`).get();
}