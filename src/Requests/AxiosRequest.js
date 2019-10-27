import Request from "./Request";
import Axios from 'axios'

export default class AxiosRequest extends Request {
  request = ({ method, headers, body }) => {
    return Axios({
      url: this.url,
      method: method.toLowerCase(),
      headers: headers,
      data: body
    })
  };

  handleResponse = (response) => {
    return response.data;
  }
}