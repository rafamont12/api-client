export default class Client {
  constructor({ request, routes, server_url, tokenModule }) {
    this.request     = request;
    this.routes      = routes;
    this.server_url  = server_url;
    this.tokenModule = tokenModule;

    this.init();
  }

  init() {
    this.processRoutes();
  }

  createRequest = (route, data) => {
    const request = new this.request({ server_url: this.server_url, url: route.url, options: route.options, tokenModule: this.tokenModule });

    return request[route.method.toLowerCase()](data)
  };

  getServerUrl() {
    return this.server_url;
  }

  parseRoute = (route) => {
    return function (data) {
      return this.createRequest(route, data);
    }.bind(this);
  };

  processRoutes() {
    const routes = this.routes;

    Object.keys(routes).forEach(route => {
      this[route] = this.parseRoute(routes[route]);
    });
  }
}