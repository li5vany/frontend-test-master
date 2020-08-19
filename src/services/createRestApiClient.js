import axios from 'axios';
import {polyfill} from 'es6-promise';
import {API_URL} from "../config/app";

polyfill();

class RestApiClient {
  constructor(config) {
    this.client = axios.create(config);
  }

  request(options) {
    return this.client.request(options);
  }
}

const createRestApiClient = () => ({
  withConfig: config => new RestApiClient(config)
});

export default createRestApiClient;

export const client = createRestApiClient().withConfig({baseURL: API_URL});
