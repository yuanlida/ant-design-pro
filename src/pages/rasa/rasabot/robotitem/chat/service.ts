import request from "@/utils/request";
import { Message } from "./data.d";

export async function queryItem(params: Message) {
  return request("/api/chat", {
    params
  });
}

export async function removeItem(params: Message) {
  return request("/api/chat-body", {
    method: "POST",
    data: {
      ...params,
      method: "delete"
    }
  });
}

export async function addItem(params: Message) {
  return request("/api/chat-body", {
    method: "POST",
    data: {
      ...params,
      method: "post"
    }
  });
}

export async function updateItem(params: Message) {
  return request("/api/chat-body", {
    method: "POST",
    data: {
      ...params,
      method: "update"
    }
  });
}
