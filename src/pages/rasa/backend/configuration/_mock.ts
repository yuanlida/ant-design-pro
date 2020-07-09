import { Request, Response } from 'express';
import { DataItem } from './data.d';

const jsonstr =
  '{"nodes":[{"type":"node","size":"72*72","shape":"flow-circle","color":"#FA8C16","label":"Start","x":158.671875,"y":76,"id":"1b3ea445","index":0},{"type":"node","size":"80*48","shape":"flow-rect","color":"#1890FF","label":"Normal","x":283.671875,"y":71,"id":"c83ee64a","index":1},{"type":"node","size":"80*72","shape":"flow-rhombus","color":"#13C2C2","label":"Decision","x":438.671875,"y":70,"id":"aa0825ce","index":2},{"type":"node","size":"80*48","shape":"flow-capsule","color":"#722ED1","label":"Model","x":586.671875,"y":73,"id":"17c873fd","index":3},{"type":"node","size":"80*48","shape":"start-node","color":"#ffaaf9","label":"New Node","data":{"name":"name","height":"height"},"x":707.7718749999999,"y":69.2,"id":"3d1fa774","index":7}],"edges":[{"source":"1b3ea445","sourceAnchor":1,"target":"c83ee64a","targetAnchor":3,"id":"bbdf8cd2","index":4},{"source":"c83ee64a","sourceAnchor":1,"target":"aa0825ce","targetAnchor":3,"id":"937ab906","index":5},{"source":"aa0825ce","sourceAnchor":1,"target":"17c873fd","targetAnchor":3,"id":"ef9c0d04","index":6},{"source":"17c873fd","sourceAnchor":1,"target":"3d1fa774","targetAnchor":3,"id":"f5a089f0","index":8}]}';

const item: DataItem = { item: jsonstr };
function getConfig(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  return res.json(item);
}

function postConfig(req: Request, res: Response, u: string, b: Request) {
  let url = u;
  if (!url || Object.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method } = body;
  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      break;
    case 'post':
      break;
    case 'update':
      break;
    default:
      break;
  }

  return res.json(item);
}

export default {
  'GET /api/config': getConfig,
  'POST /api/config': postConfig,
};
