import { Request, Response } from 'express';
import { Item } from './data.d';

// mock tableListDataSource
let item: Item = { delayValue: 1 };

function getDelayTime(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  return res.json(item);
}

function postDelayTime(req: Request, res: Response, u: string, b: Request) {
  let url = u;
  if (!url || Object.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, delayValue } = body;
  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      break;
    case 'post':
      break;
    case 'update':
      item = { delayValue };
      break;
    default:
      break;
  }

  return res.json(item);
}

export default {
  'GET /api/delaytime': getDelayTime,
  'POST /api/delaytime': postDelayTime,
};
