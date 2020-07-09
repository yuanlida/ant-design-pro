import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function fakeActionStatus(params: any) {
  return request('/api/getactionstatus', {
    method: 'POST',
    data: params,
  });
}

export async function getAllActions(params: TableListParams) {
  return request('/api/getallactions', {
    method: 'GET',
    data: params,
  });
}
