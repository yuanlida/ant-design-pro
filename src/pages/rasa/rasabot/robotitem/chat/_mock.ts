import { Request, Response } from "express";
import { parse } from "url";
import { Message } from "./data.d";
import { v4 as uuidv4 } from "uuid";

let tableListDataSource: Message[] = [];

tableListDataSource.push({
  id: uuidv4(),
  message: "",
  type: "Hey guys!"
});

tableListDataSource.push({
  id: uuidv4(),
  message: "",
  type: "Hey! Evan here. react-chat-ui is pretty dooope."
});

function getItem(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== "[object String]") {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = (parse(url, true).query as unknown) as Message;

  let dataSource = tableListDataSource;

  if (params.id) {
    dataSource = dataSource.filter(data => data.id!.indexOf(params.id) > -1);
  }

  const result = {
    list: dataSource
  };

  return res.json(result);
}

function postItem(req: Request, res: Response, u: string, b: Request) {
  let url = u;
  if (!url || Object.toString.call(url) !== "[object String]") {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, id, message, type } = body;
  switch (method) {
    /* eslint no-case-declarations:0 */
    case "delete":
      tableListDataSource = tableListDataSource.filter(
        item => id.indexOf(item.id) === -1
      );
      break;
    case "post":
      tableListDataSource.unshift({
        id: uuidv4(),
        message,
        type
      });
      break;
    case "update":
      let index = tableListDataSource.indexOf(id);
      let temp = tableListDataSource[index];
      temp = { id: id, message: message, type: "" };
      tableListDataSource[index] = temp;
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource
  };

  return res.json(result);
}

export default {
  "GET /api/chat-body": getItem,
  "POST /api/chat-body": postItem
};
