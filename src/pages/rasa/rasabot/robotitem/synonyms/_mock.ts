import { Request, Response } from "express";
import { parse } from "url";
import { TableListItem, TableListParams } from "./data.d";

// mock tableListDataSource
let tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 20; i += 1) {
  tableListDataSource.push({
    key: i,
    robotId: 1,
    synonymsName: `synonymsName_${i}`,
    synonymsContent: [
      `regexContent_${i}`,
      `, regexContenta_${i}`,
      `, regexContentb_${i}`,
      `, regexContentc_${i}`,
      `, regexContentd_${i}`,
      `, regexContente_${i}`
    ],
    disabled: false
  });
}

function getSynonyms(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== "[object String]") {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = (parse(url, true).query as unknown) as TableListParams;

  let dataSource = tableListDataSource;

  if (params.synonymsName) {
    dataSource = dataSource.filter(
      data => data.synonymsName!.indexOf(params.synonymsName) > -1
    );
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = parseInt(`${params.pageSize}`, 0);
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(`${params.currentPage}`, 10) || 1
    }
  };

  return res.json(result);
}

function postSynonyms(req: Request, res: Response, u: string, b: Request) {
  let url = u;
  if (!url || Object.toString.call(url) !== "[object String]") {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, key, synonymsName, synonymsContent } = body;
  switch (method) {
    /* eslint no-case-declarations:0 */
    case "delete":
      tableListDataSource = tableListDataSource.filter(
        item => key.indexOf(item.key) === -1
      );
      break;
    case "post":
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        synonymsName,
        synonymsContent,
        disabled: false
      });
      break;
    case "update":
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === key) {
          return { ...item, synonymsName, synonymsContent };
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length
    }
  };

  return res.json(result);
}

export default {
  "GET /api/synonyms": getSynonyms,
  "POST /api/synonyms": postSynonyms
};
