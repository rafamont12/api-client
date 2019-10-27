import StorageModule from 'storage-module'
import TokenModule from "token-module";

import Client from "./src/Clients/Client";
import Request from "./src/Requests/Request";
import AxiosClient from "./src/Clients/AxiosClient";
import FetchClient from "./src/Clients/FetchClient";

export default Client;

export let Request;
export let AxiosClient;
export let FetchClient;

export function createClient({ request, tokenModule, server_url, routes, storageModuleOptions, storageKey = 'user', tokenKey = 'access_token' }) {
  if (!tokenModule) {
    storageModuleOptions = storageModuleOptions ? storageModuleOptions : {
      storageList: [localStorage, sessionStorage], defaultStorage: localStorage
    };

    const storageModule = new StorageModule(storageModuleOptions);

    tokenModule = new TokenModule({
      storageModule,
      storageKey,
      tokenKey
    })
  }

  return new Client({
    request, routes, server_url, tokenModule
  });
}