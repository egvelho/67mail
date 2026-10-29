import { fetchUtils } from "react-admin";

const apiUrl = "http://localhost:3000";

const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("token");
  if (token) {
    options.headers.set("Authorization", `Bearer ${token}`);
  }
  return fetchUtils.fetchJson(url, options);
};

export const dataProvider = {
  getList: async (resource: string, params: any) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const query = {
      _page: page,
      _limit: perPage,
      _sort: field,
      _order: order,
    };

    const url = `${apiUrl}/${resource}?${new URLSearchParams(query)}`;
    const { json, headers } = await httpClient(url);

    const listData = Array.isArray(json) ? json : json.data;
    const total = headers.get("x-total-count")
      ? parseInt(headers.get("x-total-count")!, 10)
      : listData.length;

    return {
      data: listData,
      total: total,
    };
  },

  getOne: async (resource: string, params: any) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`);
    return { data: json };
  },

  create: async (resource: string, params: any) => {
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  update: async (resource: string, params: any) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  delete: async (resource: string, params: any) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    });
    return { data: json };
  },

  getMany: async (resource: string, params: any) => {
    const query = { filter: JSON.stringify({ id: params.ids }) };
    const { json } = await httpClient(
      `${apiUrl}/${resource}?${new URLSearchParams(query)}`,
    );
    return { data: Array.isArray(json) ? json : json.data };
  },

  getManyReference: async (resource: string, params: any) => {
    const { json, headers } = await httpClient(`${apiUrl}/${resource}`);
    const listData = Array.isArray(json) ? json : json.data;
    return {
      data: listData,
      total: headers.get("x-total-count")
        ? parseInt(headers.get("x-total-count")!, 10)
        : listData.length,
    };
  },

  deleteMany: async (resource: string, params: any) => {
    responses: Promise.all(
      params.ids.map((id: any) =>
        httpClient(`${apiUrl}/${resource}/${id}`, { method: "DELETE" }),
      ),
    );
    return { data: params.ids };
  },

  updateMany: async (resource: string, params: any) => {
    return { data: params.ids };
  },
};
