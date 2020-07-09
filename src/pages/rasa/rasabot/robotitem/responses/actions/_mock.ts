import { Request, Response } from 'express';

const tableData = [
  {
    key: '1',
    type: 'buttons',
    expression: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    type: 'text',
    expression: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    type: 'text',
    expression: 'Sidney No. 1 Lake Park',
  },
];

export default {
  'POST  /api/getactionstatus': (_: Request, res: Response) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/getallactions': (_: Request, res: Response) => {
    res.send({ list: tableData });
  },
};
