import axios from "axios";

// ----------------------------------------------------------------------------------
export class DataProviderService {
  static instance = null;
  static BASE_URL = "https://be-univer-management.onrender.com/v1/api";

  constructor() {}

  static getInstance() {
    if (!DataProviderService.instance) {
      DataProviderService.instance = new DataProviderService();
    }

    return DataProviderService.instance;
  }

  getRequestUrl(opts) {
    const urlPath = opts?.path ?? "";
    return [opts?.baseUrl ?? DataProviderService.BASE_URL, urlPath].join("/");
  }

  async send(opts) {
    const {
      baseUrl,
      path,
      method = "get",
      params = {},
      body: data,
      headers,
    } = opts;
    const requestUrl = this.getRequestUrl({ baseUrl, path });
    const props = {
      url: requestUrl,
      method,
      params,
      data,
      headers,
    };

    try {
      const response = await axios.request(props);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async get(opts) {
    const { ...rest } = opts;
    return this.send({ ...rest, method: "get" });
  }

  async post(opts) {
    const { ...rest } = opts;
    return this.send({ ...rest, method: "post" });
  }

  async put(opts) {
    const { ...rest } = opts;
    return this.send({ ...rest, method: "put" });
  }

  async patch(opts) {
    const { ...rest } = opts;
    return this.send({ ...rest, method: "patch" });
  }

  async delete(opts) {
    const { ...rest } = opts;
    return this.send({ ...rest, method: "delete" });
  }
}

export const useDataProvider = () => {
  return DataProviderService.getInstance();
};
