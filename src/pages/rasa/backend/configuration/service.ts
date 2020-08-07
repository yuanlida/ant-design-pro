import request from "@/utils/request";
import { Params } from "./data.d";

export async function queryConfig(params: Params) {
  return request("/api/config", {
    params
  });
}

export async function removeConfig(params: Params) {
  return request("/api/config", {
    method: "POST",
    data: {
      ...params,
      method: "delete"
    }
  });
}

export async function addConfig(params: Params) {
  return request("/api/config", {
    method: "POST",
    data: {
      ...params,
      method: "post"
    }
  });
}

export async function updateConfig(params: Params) {
  return request("/api/config", {
    method: "POST",
    data: {
      ...params,
      method: "update"
    }
  });
}
