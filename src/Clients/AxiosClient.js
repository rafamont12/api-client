import Client from "./Client";
import AxiosRequest from "../Requests/AxiosRequest";

export default class AxiosClient extends Client {
  constructor({ routes, server_url, tokenModule }) {
    super({ request: AxiosRequest, routes, server_url, tokenModule });
  }
}