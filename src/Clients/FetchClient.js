import Client from "./Client";
import FetchRequest from "../Requests/FetchRequest";

export default class FetchClient extends Client {
  constructor({ routes, server_url, tokenModule }) {
    super({ request: FetchRequest, routes, server_url, tokenModule });
  }
}