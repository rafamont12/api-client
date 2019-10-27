import Request from "./Request";

export default class FetchRequest extends Request {
  request = ({ method, headers, body }) => {
    console.log(body);
    return fetch(this.url, {
      method: method,
      headers: headers,
      body: body
    })
  };

  handleResponse = (response) => {
    return response.json();
  }
}